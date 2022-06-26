export enum Actions {
  CreateGame = 'CreateGame',
  JoinGame = 'JoinGame',
  PlacePiece = 'PlacePiece',
}

export type JoinData =
  | {
      gameId: string;
    }
  | undefined;

export type CreateData = null;

export type PlacePieceData = {
  column: number;
};

export type Message = {
  name: Actions;
  body: CreateData | JoinData | PlacePieceData;
};
