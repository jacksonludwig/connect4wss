import { nanoid } from 'nanoid';

type GameType = {
  gameId: string;
  player: string;
};

class Game {
  public gameId: GameType['gameId'];
  public player1: GameType['player'];
  public player2?: GameType['player'];

  constructor() {
    this.gameId = nanoid();
    this.player1 = nanoid();
  }

  public addPlayer() {
    this.player2 = nanoid();

    return this.player2;
  }
}

export default Game;
