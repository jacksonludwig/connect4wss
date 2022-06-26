import WebSocket from 'ws';
import Ajv from 'ajv';
import ActionRouter from '../models/ActionRouter';
import * as Client from '../types/Client';
import messageSchema from '../schema/message';

const ajv = new Ajv();

const validate = ajv.compile(messageSchema);

function handleMessage(this: WebSocket.WebSocket, data: WebSocket.RawData, isBinary: boolean) {
  const messageData = data.toString();

  console.log(`-- START CLIENT MESSAGE (binary: ${isBinary}) --`);
  console.log(messageData);
  console.log('-- END CLIENT MESSAGE --');

  let action: Client.Message;

  try {
    action = JSON.parse(messageData) as Client.Message;
  } catch (error) {
    console.log('could not parse message into json');
    return;
  }

  // TODO tell client message was busted and other stuff
  if (!validate(action)) {
    console.log(validate.errors);
    return;
  }

  // TODO handle missing action
  if (typeof ActionRouter[action.name] !== 'function') {
    console.log('missing request action');
    return;
  }

  // Action Router should handle modifying the global map of games
  ActionRouter[action.name](this, action.body as any);
}

export default handleMessage;
