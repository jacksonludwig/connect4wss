import WebSocket from 'ws';
import { wsServer } from '../app';
import { games } from '../models/ActionRouter';
import { getGameFromWS } from '../utils/websocket';

/**
 * Delete all games that have no clients connected
 */
export function cleanUpGames() {
  [...games.values()].forEach((game) => {
    if (![...wsServer.clients.values()].find((client) => getGameFromWS(client) === game.gameId)) {
      console.log(`deleting empty game with id: ${game.gameId}`);
      games.delete(game.gameId);
    }
  });
}

/**
 * Terminate the socket if the connection is not alive.
 */
function checkLiveness(ws: WebSocket.WebSocket) {
  const wsCasted = ws as any;
  if (wsCasted.isAlive === false) {
    return ws.terminate();
  }

  wsCasted.isAlive = false;
  ws.ping();
}

/**
 * Ping to check if clients are alive.
 */
export function pingClients() {
  wsServer.clients.forEach(checkLiveness);
}
