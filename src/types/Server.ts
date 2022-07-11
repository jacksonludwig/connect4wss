import { PlayerToken } from '../models/Game';
import { Actions } from './Client';

export enum Error {
  GameNotFound = 'GameNotFound',
  GameFull = 'GameFull',
  NotInGame = 'NotInGame',
  FullColumn = 'FullColumn',
  WrongTurn = 'WrongTurn',
  AlreadyInGame = 'AlreadyInGame',
  GameNotStarted = 'GameNotStarted',
  NoGameId = 'NoGameId',
}

export enum StatusNotification {
  PlayerJoined = 'PlayerJoined',
  GameCreated = 'GameCreated',
  GameState = 'GameState',
  GameOver = 'GameOver',
}

export type JoinResponse = {
  gameId: string;
};

export type CreateResponse = {
  gameId: string;
};

export type PlaceResponse = Record<string, never>;

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

export type ResponseMessage<AcceptedBody = undefined> = {
  name: Actions;
  type: 'response';
  status: 'accepted' | 'rejected';
  reason: Error;
  body: AcceptedBody;
};
