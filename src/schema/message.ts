import * as Client from '../types/Client';

export default {
  type: 'object',
  properties: {
    name: { enum: [Client.Actions.CreateGame, Client.Actions.JoinGame] },
  },
  if: {
    properties: {
      name: { enum: [Client.Actions.JoinGame] },
    },
  },
  then: {
    properties: {
      body: {
        type: 'object',
        properties: { gameId: { type: 'string' } },
        required: ['gameId'],
      },
    },
  },
  required: [],
};
