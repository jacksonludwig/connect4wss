export enum Reason {
  GameNotFound = 'GameNotFound',
  GameFull = 'GameFull',
}

export type JoinResponse = {
  playerId: string;
};

export type CreateResponse = {
  playerId: string;
  gameId: string;
};

export type Message = {
  status: 'rejected' | 'accepted';
  reason?: Reason;
  body?: JoinResponse;
};
