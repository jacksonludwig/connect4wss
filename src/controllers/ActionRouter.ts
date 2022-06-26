import { WebSocket } from 'ws';
import Game from '../models/Game';
import * as Client from '../types/Client';
import * as Server from '../types/Server';
import { saveGameToWS, savePlayerToWS } from '../utils/Websocket';
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
    ws.send(WSResponseUtil.success({ gameId: game.gameId, playerId: game.player1 }));
  }

  /**
   * Add the player to an existing game
   */
  public static JoinGame(ws: WebSocket, { gameId }: Client.JoinData) {
    // if no gameId is given, join the first available game we can find.
    if (!gameId) {
      // TODO
    }

    const game = games.get(gameId);

    // Check to see if game with id is in progress
    if (!game) {
      ws.send(WSResponseUtil.error(Server.Reason.GameNotFound));
      return;
    }

    // Check if the game is full
    if (game.player1 !== '' && game.player2 !== '') {
      ws.send(WSResponseUtil.error(Server.Reason.GameFull));
      return;
    }

    game.addPlayer();

    // put game id and player id on websocket
    saveGameToWS(ws, game.gameId);
    savePlayerToWS(ws, game.player1);

    // send back player id
    ws.send(WSResponseUtil.success({ playerId: game.player2 }));
  }
}

export default ActionRouter;
