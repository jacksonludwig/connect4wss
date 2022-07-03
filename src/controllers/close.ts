import WebSocket from 'ws';
import { games } from '../models/ActionRouter';
import { getGameFromWS } from '../utils/websocket';

/**
 * Delete all games that have no clients connected
 */
export function cleanUpGames(this: WebSocket.Server<WebSocket.WebSocket>) {
  [...games.values()].forEach((game) => {
    if (![...this.clients.values()].find((client) => getGameFromWS(client) === game.gameId)) {
      console.log(`deleting empty game with id: ${game.gameId}`);
      games.delete(game.gameId);
    }
  });
}

/**
 * Terminate the socket if the connection is not alive. Ping to check if it is alive.
 */
export function checkLiveness(ws: WebSocket.WebSocket) {
  const wsCasted = ws as any;
  if (wsCasted.isAlive === false) {
    return ws.terminate();
  }

  wsCasted.isAlive = false;
  ws.ping();
}
