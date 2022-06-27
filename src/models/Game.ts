import { nanoid } from 'nanoid';

type GameType = {
  gameId: string;
  player: string;
};

/**
 * 0 represents an empty cell/no player
 */
type Player = 0 | 1 | 2;

class Game {
  public gameId: GameType['gameId'];
  public player1: GameType['player'];
  public player2: GameType['player'];
  public currentTurn: Player;

  /**
   * Matrix representing game board. Each cell contains 0, 1, or 2:
   *
   * 0 => open cell
   * 1 => player1's piece
   * 2 => player2's piece
   */
  private board: Player[][];

  private readonly ROWS = 6;
  private readonly COLS = 7;

  constructor() {
    this.gameId = nanoid();
    this.player1 = nanoid();
    this.player2 = '';
    this.currentTurn = 1;

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
   * TODO: use another algorithm that only checks around the last piece that was placed.
   *
   * Check if there was a winner.
   *
   * Adapted from https://codereview.stackexchange.com/a/127105 (Castle Kerr)
   */
  private getWinner(): Player {
    const EMPTY_SLOT = 0;

    for (let row = 0; row < this.COLS; row++) {
      for (let col = 0; col < this.ROWS; col++) {
        const player = this.board[row][col];

        // don't check empty slots
        if (player == EMPTY_SLOT) continue;

        // look right
        if (
          col + 3 < this.ROWS &&
          player == this.board[row][col + 1] &&
          player == this.board[row][col + 2] &&
          player == this.board[row][col + 3]
        )
          return player;

        // look up
        if (row + 3 < this.COLS) {
          if (
            player == this.board[row + 1][col] &&
            player == this.board[row + 2][col] &&
            player == this.board[row + 3][col]
          )
            return player;

          // look up & right
          if (
            col + 3 < this.ROWS &&
            player == this.board[row + 1][col + 1] &&
            player == this.board[row + 2][col + 2] &&
            player == this.board[row + 3][col + 3]
          )
            return player;

          // look up & left
          if (
            col - 3 >= 0 &&
            player == this.board[row + 1][col - 1] &&
            player == this.board[row + 2][col - 2] &&
            player == this.board[row + 3][col - 3]
          )
            return player;
        }
      }
    }
    return EMPTY_SLOT; // no winner found
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
  public placePiece(player: Omit<Player, 0>, column: number): boolean {
    const col = this.board.map((row) => row[column]) as number[];

    // Sum up column to see if it is full
    if (col.reduce((acc, current) => acc + current) >= this.COLS) {
      throw Error(`column ${column} is already full`);
    }

    // reverse the column to place at the "bottom", then find the first open cell
    const openIndex = col.reverse().findIndex((cell) => cell === 0);

    this.board[column][openIndex] = player as Player;

    this.switchTurn();

    return this.getWinner() > 0;
  }
}

export default Game;
