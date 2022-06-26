import { nanoid } from 'nanoid';

type GameType = {
  gameId: string;
  player: string;
};

class Game {
  public gameId: GameType['gameId'];
  public player1: GameType['player'];
  public player2: GameType['player'];

  /**
   * Matrix representing game board. Each cell contains 0, 1, or 2:
   *
   * 0 => open cell
   * 1 => player1's piece
   * 2 => player2's piece
   */
  private board: number[][];

  private readonly ROWS = 6;
  private readonly COLS = 7;

  constructor() {
    this.gameId = nanoid();
    this.player1 = nanoid();
    this.player2 = '';

    // generate 6x7 empty board
    this.board = Array.from(Array(this.ROWS)).fill(Array.from(Array(this.COLS)).fill(0));
  }

  /**
   * Add a second player to the game.
   */
  public addPlayer(): string {
    this.player2 = nanoid();

    return this.player2;
  }

  /**
   * Drop a piece into a column
   */
  public placePiece(player: 'player1' | 'player2', column: number) {
    return;
  }
}

export default Game;
