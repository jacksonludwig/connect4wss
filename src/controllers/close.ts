import WebSocket from 'ws';
import {
  broadcastMessage,
  getGameFromWS,
  getPlayerFromWS,
  removePlayersFromGame,
  saveGameToWS,
  savePlayerToWS,
} from '../utils/websocket';
import http from 'http';
import { games } from '../models/ActionRouter';

function handleClose(
  this: WebSocket.Server<WebSocket.WebSocket>,
  socket: WebSocket.WebSocket,
  request: http.IncomingMessage,
) {
  console.log('-- CLIENT CLOSING CONNECTION --');

  const gameId = getGameFromWS(socket);

  const game = games.get(gameId || '');

  if (!game)
    return;

  // TODO: don't delete game if only one player disconnects
  games.delete(gameId || '');
}

export default handleClose;
