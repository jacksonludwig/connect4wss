import WebSocket from 'ws';
import { games } from '../models/ActionRouter';
import { getGameFromWS } from '../utils/websocket';

export function cleanUpGames(this: WebSocket.Server<WebSocket.WebSocket>) {
  console.log('-- CHECKING FOR ORPHAN GAMES --');

  // TODO: don't delete game if only one player disconnects
  [...games.values()].forEach((game) => {
    if (![...this.clients.values()].find((client) => getGameFromWS(client) === game.gameId)) {
      console.log(`deleting empty game with id: ${game.gameId}`);
      games.delete(game.gameId);
    }
  });
}
