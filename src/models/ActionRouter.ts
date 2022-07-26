import { WebSocket } from 'ws';
import Game from '../models/Game';
import * as Client from '../types/Client';
import * as Server from '../types/Server';
import {
  broadcastMessage,
  getGameFromWS,
  getPlayerFromWS,
  removePlayersFromGame,
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
    ws.send(WSResponseUtil.success(Client.Actions.CreateGame, { gameId: game.gameId }));
  }

  /**
   * Add the player to an existing game
   */
  public static JoinGame(ws: WebSocket, body: Client.JoinData) {
    // Check if player is already in game
    if (getGameFromWS(ws)) {
      ws.send(WSResponseUtil.error(Client.Actions.JoinGame, Server.Error.AlreadyInGame));
      return;
    }

    // Check to see if no game id was given
    if (!body) {
      ws.send(WSResponseUtil.error(Client.Actions.JoinGame, Server.Error.NoGameId));
      return;
    }

    const game = games.get(body.gameId);

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
      game.gameId,
      WSResponseUtil.status<undefined>('success', Server.StatusNotification.PlayerJoined),
      ws,
    );

    ws.send(
      WSResponseUtil.success<Server.JoinResponse>(Client.Actions.JoinGame, {
        gameId: game.gameId,
      }),
    );
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

    // don't place piece if no second player has joined yet
    if (!game.player2) {
      ws.send(WSResponseUtil.error(Client.Actions.PlacePiece, Server.Error.GameNotStarted));
      return;
    }

    const piece = game.player1 === playerId ? 1 : 2;

    // check turn
    if (piece !== game.currentTurn) {
      ws.send(WSResponseUtil.error(Client.Actions.PlacePiece, Server.Error.WrongTurn));
      return;
    }

    try {
      game.placePiece(piece, column);
    } catch (err) {
      ws.send(WSResponseUtil.error(Client.Actions.PlacePiece, Server.Error.FullColumn));
      return;
    }

    // return success status to player who placed the piece
    ws.send(WSResponseUtil.success<Server.PlaceResponse>(Client.Actions.PlacePiece, {}));

    console.log('-- NEW BOARD STATE --');
    console.log(game.board);
    console.log('-- END BOARD STATE --');

    // broadcast new board state to both players
    broadcastMessage(
      gameId,
      WSResponseUtil.status('success', Server.StatusNotification.GameState, {
        board: game.board,
        currentTurn: game.currentTurn,
        winner: game.winner,
      }),
    );

    // broadcast winner
    if (game.winner !== -1) {
      broadcastMessage(
        gameId,
        WSResponseUtil.status('success', Server.StatusNotification.GameOver, {
          winner: game.winner,
        }),
      );

      // delete game
      removePlayersFromGame(game.gameId);
      games.delete(game.gameId);
    }

    // TODO: allow rematch
  }
}

export default ActionRouter;
