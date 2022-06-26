import WebSocket from 'ws';
import http from 'http';
import handleMessage from './message';

function handleConnection(
  this: WebSocket.Server<WebSocket.WebSocket>,
  socket: WebSocket.WebSocket,
  request: http.IncomingMessage,
) {
  console.log('-- CLIENT CONNECTED --');
  console.log(request.headers);

  socket.on('message', handleMessage);
}

export default handleConnection;