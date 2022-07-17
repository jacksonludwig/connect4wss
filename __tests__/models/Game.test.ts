import Game, { PlayerToken } from '../../src/models/Game';

describe('Game unit tests', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
    game['player1'] = 'p1id';
    game['player2'] = 'p2id';
    game['gameStarted'] = true;
  });

  describe('getWinner unit tests', () => {
    it('should return p1 victory in reverse diagnonal ending at bottom right', async () => {
      const board: PlayerToken[][] = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 1],
      ];

      game['board'] = board;

      expect(game['getWinner']({ column: 6, row: 5 })).toEqual(1);
    });

    it('should return p1 victory in reverse diagnonal ending at top left', async () => {
      const board: PlayerToken[][] = [
        [1, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];

      game['board'] = board;

      expect(game['getWinner']({ column: 0, row: 0 })).toEqual(1);
    });

    it('should return p1 victory in reverse diagnonal ending at center', async () => {
      const board: PlayerToken[][] = [
        [1, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];

      game['board'] = board;

      expect(game['getWinner']({ column: 3, row: 3 })).toEqual(1);
    });

    it('should return p1 victory in vertical ending at bottom center', async () => {
      const board: PlayerToken[][] = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
      ];

      game['board'] = board;

      expect(game['getWinner']({ column: 3, row: 2 })).toEqual(1);
    });

    it('should return p1 victory in horizontal ending at top right', async () => {
      const board: PlayerToken[][] = [
        [0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];

      game['board'] = board;

      expect(game['getWinner']({ column: 6, row: 0 })).toEqual(1);
    });
  });
});
