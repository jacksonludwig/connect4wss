import { Actions } from './Client';

export enum Error {
  GameNotFound = 'GameNotFound',
  GameFull = 'GameFull',
  NotInGame = 'NotInGame',
  FullColumn = 'FullColumn',
  WrongTurn = 'WrongTurn',
}

export enum StatusNotification {
  PlayerJoined = 'PlayerJoined',
  GameCreated = 'GameCreated',
}

export type JoinResponse = Record<string, never>;

export type CreateResponse = {
  gameId: string;
};

export type StatusMessage = {
  status: 'success' | 'fail' | 'info';
  message: StatusNotification;

  // The subject of the message, e.g. who joined.
  // This way the client can tell if this is a "response"
  // to a previous action or really a status notification.
  player?: string;
};

export type RejectedResponseMessage = {
  name: Actions;
  type: 'response';
  status: 'rejected';
  reason: Error;
};

export type AcceptedResponseMessage = {
  name: Actions;
  type: 'response';
  status: 'accepted';
  body: JoinResponse | CreateResponse;
};
