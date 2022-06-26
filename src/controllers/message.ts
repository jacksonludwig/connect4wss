import WebSocket from 'ws';
import Ajv from 'ajv';
import Game from '../models/Game';
import ActionRouter from './ActionRouter';

const ajv = new Ajv();

const messageSchema = {
  type: 'object',
  properties: {
    name: {
      enum: [ClientActions.CreateGame, ClientActions.JoinGame],
    },
    gameId: {
      type: 'string',
    },
  },
  required: ['name', 'gameId'],
};

const validate = ajv.compile(messageSchema);

function handleMessage(this: WebSocket.WebSocket, data: WebSocket.RawData, isBinary: boolean) {
  const messageData = data.toString();

  console.log(`-- START CLIENT MESSAGE (binary: ${isBinary}) --`);
  console.log(messageData);
  console.log('-- END CLIENT MESSAGE --');

  const action = JSON.parse(messageData) as ClientMessage.Message;

  const valid = validate(action);

  // TODO tell client message was busted and other stuff
  if (!valid) {
    console.log(validate.errors);
    return;
  }

  // Action Router should handle modifying the global map of games
  const doAction = ActionRouter[action.name as keyof typeof ActionRouter];

  // TODO handle missing action
  if (typeof doAction !== 'function') {
    console.log('missing request action');
  }

  doAction();
}

export default handleMessage;
