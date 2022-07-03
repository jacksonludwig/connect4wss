import http from 'http';
import { WebSocketServer } from 'ws';
import handleClose from './controllers/close';
import handleConnection from './controllers/connection';

const httpServer = http.createServer();
export const wsServer = new WebSocketServer({ server: httpServer });

wsServer.on('connection', handleConnection);

export const pingInterval = setInterval(function ping() {
  wsServer.clients.forEach(function each(ws) {
    const wsCasted = ws as any;
    if (wsCasted.isAlive === false) return ws.close();

    wsCasted.isAlive = false;
    ws.ping();
  });
}, 30000);

wsServer.on('close', handleClose);

export default httpServer;
