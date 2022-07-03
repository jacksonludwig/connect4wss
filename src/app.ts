import http from 'http';
import { WebSocketServer } from 'ws';
import handleClose from './controllers/close';
import handleConnection from './controllers/connection';

const httpServer = http.createServer();
export const wsServer = new WebSocketServer({ server: httpServer });

wsServer.on('connection', handleConnection);
wsServer.on('close', handleClose);

export default httpServer;
