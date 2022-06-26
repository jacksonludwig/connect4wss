import http from 'http';
import { WebSocketServer } from 'ws';
import handleConnection from './controllers/websocket/connection';

const httpServer = http.createServer();
const wsServer = new WebSocketServer({ server: httpServer });

wsServer.on('connection', handleConnection);

export default httpServer;
