import { WebSocket } from 'ws';
import Game from '../models/Game';
import * as Client from '../types/Client';
import * as Server from '../types/Server';
import {
  broadcastMessage,
  getGameFromWS,
  getPlayerFromWS,
  saveGameToWS,
  savePlayerToWS,
} from '../utils/websocket';
import WSResponseUtil from '../utils/WSResponseUtil';

/**
 * Global map of games using their id as keys
 */
export const games = new Map<string, Game>();

class ActionRouter {
  /**
   * Add a new game to the global game map using the game id
   */
  public static CreateGame(ws: WebSocket): void {
    const game = new Game();

    games.set(game.gameId, game);

    // put game id and player id on websocket
    saveGameToWS(ws, game.gameId);
    savePlayerToWS(ws, game.player1);

    // send back game id and player id
    ws.send(
      WSResponseUtil.success(Client.Actions.CreateGame, {
        gameId: game.gameId,
        playerId: game.player1,
      }),
    );
  }

  /**
   * Add the player to an existing game
   */
  public static JoinGame(ws: WebSocket, body: Client.JoinData) {
    let game: Game | undefined;

    // if no gameId is given, join the first available game we can find.
    if (!body) {
      const openGames = [...games.values()].filter((game) => game.player2 === '');

      game = openGames.length ? openGames[0] : undefined;
    } else {
      game = games.get(body.gameId);
    }

    // Check to see if game with id is in progress
    if (!game) {
      ws.send(WSResponseUtil.error(Client.Actions.JoinGame, Server.Error.GameNotFound));
      return;
    }

    // Check if the game is full
    if (game.player2 !== '') {
      ws.send(WSResponseUtil.error(Client.Actions.JoinGame, Server.Error.GameFull));
      return;
    }

    game.addPlayer();

    // put game id and player id on websocket
    saveGameToWS(ws, game.gameId);
    savePlayerToWS(ws, game.player2);

    // broadcast join to other player
    broadcastMessage(
      ws,
      game.gameId,
      WSResponseUtil.status(Server.StatusNotification.PlayerJoined),
    );

    // send back player id
    ws.send(WSResponseUtil.success(Client.Actions.JoinGame, { playerId: game.player2 }));
  }

  /**
   * Drop a piece in a column
   */
  public static PlacePiece(ws: WebSocket, { column }: Client.PlacePieceData) {
    const gameId = getGameFromWS(ws);
    const playerId = getPlayerFromWS(ws);

    if (!gameId || !playerId) {
      ws.send(WSResponseUtil.error(Client.Actions.PlacePiece, Server.Error.NotInGame));
      return;
    }

    const game = games.get(gameId);

    if (!game) {
      ws.send(WSResponseUtil.error(Client.Actions.PlacePiece, Server.Error.GameNotFound));
      return;
    }

    // TODO check turn

    try {
      game.placePiece(game.player1 === playerId ? 1 : 2, column);
    } catch (err) {
      ws.send(WSResponseUtil.error(Client.Actions.PlacePiece, Server.Error.FullColumn));
      return;
    }

    // TODO broadcast placement to both players

    // TODO switch turn
  }
}

export default ActionRouter;
