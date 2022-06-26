import WebSocket from 'ws';
import Game from '../models/Game';

/**
 * Global map of games using their id as keys
 */
export const games = new Map<string, Game>();

class ActionRouter {
  /**
   * Add a new game to the global game map using the game id
   */
  public static CreateGame(ws: WebSocket): void {
    const newGame = new Game();

    games.set(newGame.gameId, newGame);

    // TODO put player id on websocket
    // TODO send back game id and player id
  }

  /**
   * Add the player to an existing game
   */
  public static JoinGame(ws: WebSocket, gameId?: string) {
    // if no gameId is given, join the first available game we can find.
    if (!gameId) {
      // TODO
    }

    // TODO put player id on websocket
    // TODO send back player id
  }
}

export default ActionRouter;
