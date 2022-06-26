export enum Actions {
  CreateGame = 'CreateGame',
  JoinGame = 'JoinGame',
}

export type JoinData = {
  gameId: string;
};

export type CreateData = null;

export type Message = {
  name: Actions;
  body: CreateData | JoinData;
};
