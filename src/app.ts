import http from 'http';
import { WebSocketServer } from 'ws';
import { checkLiveness, cleanUpGames } from './controllers/close';
import handleConnection from './controllers/connection';

const httpServer = http.createServer();
export const wsServer = new WebSocketServer({ server: httpServer });

wsServer.on('connection', handleConnection);

const boundCleanup = cleanUpGames.bind(wsServer);

// delete disconnected clients and empty games every set interval
export const pingInterval = setInterval(function ping() {
  console.log('-- CHECKING FOR ORPHANED GAMES --');
  boundCleanup();

  console.log('-- CHECKING FOR DISCONNECTED CLIENTS --');
  wsServer.clients.forEach(checkLiveness);
}, 30000);

export default httpServer;
