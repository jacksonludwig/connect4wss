import { Actions } from './Client';

export enum Error {
  GameNotFound = 'GameNotFound',
  GameFull = 'GameFull',
  NotInGame = 'NotInGame',
  FullColumn = 'FullColumn',
}

export enum StatusNotification {
  PlayerJoined = 'PlayerJoined',
}

export type JoinResponse = Record<string, never>;

export type CreateResponse = {
  gameId: string;
};

export type StatusMessage = {
  type: 'status';
  message: StatusNotification;
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
