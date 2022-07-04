import { PlayerToken } from '../models/Game';
import { Actions } from './Client';

export enum Error {
  GameNotFound = 'GameNotFound',
  GameFull = 'GameFull',
  NotInGame = 'NotInGame',
  FullColumn = 'FullColumn',
  WrongTurn = 'WrongTurn',
  AlreadyInGame = 'AlreadyInGame',
}

export enum StatusNotification {
  PlayerJoined = 'PlayerJoined',
  GameCreated = 'GameCreated',
  GameState = 'GameState',
  GameOver = 'GameOver',
}

export type JoinResponse = Record<string, never>;

export type CreateResponse = {
  gameId: string;
};

export type GameStateBody = {
  board: PlayerToken[][];
  currentTurn: PlayerToken;
};

export type GameOverBody = {
  winner: PlayerToken | -1;
};

export type StatusMessage = {
  status: 'success' | 'fail' | 'info';
  message: StatusNotification;

  body?: GameStateBody;
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
