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
  public winner: PlayerToken | -1;
  public turnCount: number;
  public gameStarted: boolean;

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
    this.winner = 0;
    this.turnCount = 1;
    this.gameStarted = false;

    // generate ROWxCOL empty board
    this.board = Array(this.ROWS)
      .fill(0)
      .map(() => Array(this.COLS).fill(0));
  }

  /**
   * Add a second player to the game.
   */
  public addPlayer() {
    this.player2 = nanoid();
    this.gameStarted = true;
  }

  /**
   * Check if there was a winner, or return 0 if there is a tie.
   */
  private getWinner(lastPieceData: { column: number; row: number }): PlayerToken | -1 {
    const board = this.board;
    const player = this.currentTurn;
    const { column, row } = lastPieceData;

    let count = 0;

    // vertical: check downward from last index
    for (let r = 0; r < 4; r++) {
      if (row + r >= this.ROWS) break;
      if (board[row + r][column] !== player) break;
      count++;
    }

    console.log(`VERT COUNT: ${count}`);

    if (count >= 4) return player;

    count = 0;

    // horizontal: check 3 left, 3 right
    for (let c = 0; c < 4; c++) {
      if (column + c >= this.COLS) break;
      if (board[row][column + c] !== player) break;
      count++;
    }

    // don't double count center piece
    count--;

    for (let c = 0; c < 4; c++) {
      if (column - c < 0) break;
      if (board[row][column - c] !== player) break;
      count++;
    }

    console.log(`HORIZ COUNT: ${count}`);

    if (count >= 4) return player;

    count = 0;
    let rowCount = 0;

    // diagonal: check 3 left, 3 right, but iterate row each check
    for (let c = 0; c < 4; c++) {
      if (row - rowCount < 0) break;
      if (column + c >= this.COLS) break;
      if (board[row - rowCount][column + c] !== player) break;
      count++;
      rowCount++;
    }

    rowCount = 0;
    count--;

    for (let c = 0; c < 4; c++) {
      if (row + rowCount >= this.ROWS) break;
      if (column - c < 0) break;
      if (board[row + rowCount][column - c] !== player) break;
      count++;
      rowCount++;
    }

    console.log(`DIAG COUNT: ${count}`);

    if (count >= 4) return player;

    if (this.turnCount >= this.ROWS * this.COLS) return 0;

    return -1;
  }

  /**
   * Switch the turn to the other player
   */
  private switchTurn() {
    this.currentTurn = this.currentTurn === 1 ? 2 : 1;
    this.turnCount++;
  }

  /**
   * Drop a piece into a column and check if there was a winner as a result.
   *
   * @throws if the column is already full.
   */
  public placePiece(player: Omit<PlayerToken, 0>, column: number) {
    const col = this.board.map((row) => row[column]) as number[];

    // Sum up column to see if it is full
    if (
      (col.map((player) => player && 1) as number[]).reduce((acc, current) => acc + current) >=
      this.ROWS
    ) {
      throw Error(`column ${column} is already full`);
    }

    // reverse the column to place at the "bottom", then find the first open cell
    const openIndex = this.ROWS - col.reverse().findIndex((cell) => cell === 0) - 1;

    this.board[openIndex][column] = player as PlayerToken;

    const winner = this.getWinner({
      column: column,
      row: openIndex,
    });

    console.log(`WINNER: ${winner}`);

    this.switchTurn();

    this.winner = winner;
  }
}

export default Game;
