import http from 'http';
import { WebSocketServer } from 'ws';
import { cleanUpGames, pingClients } from './controllers/close';
import handleConnection from './controllers/connection';

const httpServer = http.createServer();
export const wsServer = new WebSocketServer({ server: httpServer });

wsServer.on('connection', handleConnection);

// delete disconnected clients and empty games every set interval
export const pingInterval = setInterval(function ping() {
  console.log('-- CHECKING FOR ORPHANED GAMES --');
  cleanUpGames();

  console.log('-- CHECKING FOR DISCONNECTED CLIENTS --');
  pingClients();
}, 30000);

export default httpServer;
