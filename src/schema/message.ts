import * as Client from '../types/Client';

export default {
  type: 'object',
  properties: {
    name: { enum: [Client.Actions.CreateGame, Client.Actions.JoinGame, Client.Actions.PlacePiece] },
  },
  allOf: [
    {
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
    },
    {
      if: {
        properties: {
          name: { enum: [Client.Actions.PlacePiece] },
        },
      },
      then: {
        properties: {
          body: {
            type: 'object',
            properties: { column: { type: 'number' } },
            required: ['column'],
          },
        },
        required: ['body'],
      },
    },
  ],
  required: [],
};
