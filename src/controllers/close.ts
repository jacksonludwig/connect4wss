import WebSocket from 'ws';
import { wsServer } from '../app';
import { games } from '../models/ActionRouter';
import { broadcastMessage, getGameFromWS, getPlayerFromWS } from '../utils/websocket';
import * as Server from '../types/Server';
import WSResponseUtil from '../utils/WSResponseUtil';

/**
 * Delete all games that have no clients connected
 */
export function cleanUpGames() {
  const clients = [...wsServer.clients.values()];

  [...games.values()].forEach((game) => {
    // delete game if it has started and is missing one player
    if (game.gameStarted) {
      const playerMissing =
        !clients.find((c) => getPlayerFromWS(c) === game.player1) ||
        !clients.find((c) => getPlayerFromWS(c) === game.player2);

      // send message to player if opposing player disconnected, and delete the game.
      if (playerMissing) {
        broadcastMessage(
          game.gameId,
          WSResponseUtil.status('fail', Server.StatusNotification.PlayerLeft),
        );

        console.log(`deleting game with missing player, game id: ${game.gameId}`);
        games.delete(game.gameId);
        return;
      }
    }

    // delete game if it has nobody connected
    if (!clients.find((client) => getGameFromWS(client) === game.gameId)) {
      console.log(`deleting game with no players, game id: ${game.gameId}`);
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
    const game = games.get(getGameFromWS(wsCasted) || '');

    // check if the player was previously in a game, and notify the other player of the disconnect
    // if they were
    if (game) {
      broadcastMessage(
        game.gameId,
        WSResponseUtil.status('fail', Server.StatusNotification.PlayerLeft, {
          winner: game.winner,
        }),
      );
    }

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
