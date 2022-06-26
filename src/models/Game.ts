import { nanoid } from 'nanoid';

type GameType = {
  gameId: string;
  player: string;
};

class Game {
  public gameId: GameType['gameId'];
  public player1: GameType['player'];
  public player2: GameType['player'];

  constructor() {
    this.gameId = nanoid();
    this.player1 = nanoid();
  }

  /**
   * Add a new game to the game map.
   * Return the game's id and first player's id.
   */
  public static createGame(): { gameId: string; player1: string } {
    const game = new Game();

    return { gameId: game.gameId, player1: game.player1 };
  }

  public addPlayer() {
    return;
  }
}

export default Game;
