import http from 'http';
import { WebSocketServer } from 'ws';
import { cleanUpGames } from './controllers/close';
import handleConnection from './controllers/connection';

const httpServer = http.createServer();
export const wsServer = new WebSocketServer({ server: httpServer });

wsServer.on('connection', handleConnection);

const boundCleanup = cleanUpGames.bind(wsServer);

// delete disconnected clients and empty games every set interval
export const pingInterval = setInterval(function ping() {
  boundCleanup();
  wsServer.clients.forEach(function each(ws) {
    const wsCasted = ws as any;
    if (wsCasted.isAlive === false) {
      return ws.terminate();
    }

    wsCasted.isAlive = false;
    ws.ping();
  });
}, 3000);

export default httpServer;
