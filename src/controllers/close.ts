import http from 'http';
import WebSocket from 'ws';
import { pingInterval } from '../app';
import { games } from '../models/ActionRouter';
import { getGameFromWS } from '../utils/websocket';

function handleClose(
  this: WebSocket.Server<WebSocket.WebSocket>,
  socket: WebSocket.WebSocket,
  request: http.IncomingMessage,
) {
  console.log('-- CLIENT CLOSING CONNECTION --');

  clearInterval(pingInterval);

  const gameId = getGameFromWS(socket);

  const game = games.get(gameId || '');

  if (!game) return;

  // TODO: don't delete game if only one player disconnects

  console.log(`deleting game with id: ${gameId}`);
  games.delete(gameId || '');
}

export default handleClose;
