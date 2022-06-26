import WebSocket from 'ws';
import Ajv from 'ajv';
import ActionRouter from './ActionRouter';
import * as Client from '../types/Client';

const ajv = new Ajv();

const messageSchema = {
  type: 'object',
  properties: {
    name: {
      enum: [Client.Actions.CreateGame, Client.Actions.JoinGame],
    },
    // body: {},
  },
  required: ['name' /* , 'body' */],
};

const validate = ajv.compile(messageSchema);

function handleMessage(this: WebSocket.WebSocket, data: WebSocket.RawData, isBinary: boolean) {
  const messageData = data.toString();

  console.log(`-- START CLIENT MESSAGE (binary: ${isBinary}) --`);
  console.log(messageData);
  console.log('-- END CLIENT MESSAGE --');

  const action = JSON.parse(messageData) as Client.Message;

  const valid = validate(action);

  // TODO tell client message was busted and other stuff
  if (!valid) {
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
