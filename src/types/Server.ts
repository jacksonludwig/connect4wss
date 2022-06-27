import { Player } from '../models/Game';
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
  GameState = 'GameStateUpdate',
}

export type JoinResponse = Record<string, never>;

export type CreateResponse = {
  gameId: string;
};

export type GameStatusBody = {
  board: Player[][];
  currentTurn: Player;
};

export type StatusMessage = {
  status: 'success' | 'fail' | 'info';
  message: StatusNotification;

  body?: GameStatusBody;
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
