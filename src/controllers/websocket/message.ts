import WebSocket from 'ws';

function handleMessage(this: WebSocket.WebSocket, data: WebSocket.RawData, isBinary: boolean) {
  console.log('-- START CLIENT MESSAGE --');
  console.log(data.toString());
  console.log('-- END CLIENT MESSAGE --');
}

export default handleMessage;
