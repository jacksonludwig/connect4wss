import { nanoid } from 'nanoid';

type GameType = {
  gameId: string;
  player: string;
};

/**
 * 0 represents an empty cell/no player
 */
export type PlayerToken = 0 | 1 | 2;

class Game {
  public gameId: GameType['gameId'];
  public player1: GameType['player'];
  public player2: GameType['player'];
  public currentTurn: PlayerToken;

  /**
   * Matrix representing game board. Each cell contains 0, 1, or 2:
   *
   * 0 => open cell
   * 1 => player1's piece
   * 2 => player2's piece
   */
  public board: PlayerToken[][];

  private readonly ROWS = 6;
  private readonly COLS = 7;

  constructor() {
    this.gameId = nanoid();
    this.player1 = nanoid();
    this.player2 = '';
    this.currentTurn = 1;
    this.board = [];

    // generate 6x7 empty board
    this.board = Array(this.ROWS)
      .fill(0)
      .map(() => Array(this.COLS).fill(0));
  }

  /**
   * Add a second player to the game.
   */
  public addPlayer(): string {
    this.player2 = nanoid();

    return this.player2;
  }

  /**
   * TODO: use algorithm that only checks around the last piece that was placed.
   *
   * Check if there was a winner.
   */
  private getWinner(): PlayerToken {
    return 0;
  }

  /**
   * Switch the turn to the other player
   */
  private switchTurn() {
    this.currentTurn = this.currentTurn === 1 ? 2 : 1;
  }

  /**
   * Drop a piece into a column and check if there was a winner as a result.
   *
   * @throws if the column is already full.
   */
  public placePiece(player: Omit<PlayerToken, 0>, column: number): PlayerToken {
    const col = this.board.map((row) => row[column]) as number[];

    // Sum up column to see if it is full
    if (col.reduce((acc, current) => acc + current) >= this.COLS) {
      throw Error(`column ${column} is already full`);
    }

    // reverse the column to place at the "bottom", then find the first open cell
    const openIndex = this.ROWS - col.reverse().findIndex((cell) => cell === 0) - 1;

    this.board[openIndex][column] = player as PlayerToken;

    const winner = this.getWinner();

    this.switchTurn();

    return winner;
  }
}

export default Game;
