import {
  createBoard,
  markedTilesCount,
  markTile,
  revealTile,
  checkWin,
  checkLose,
} from "./minesweeper";

describe("minesweeper tests", () => {
  describe("#createBoard", () => {
    test("It return a new board", () => {
      const boardSize = 2;
      const mines = [{ x: 1, y: 0 }];
      expect(createBoard(boardSize, mines)).toEqual([
        [
          { x: 0, y: 0, mine: false, status: "hidden" },
          { x: 0, y: 1, mine: false, status: "hidden" },
        ],
        [
          { x: 1, y: 0, mine: true, status: "hidden" },
          { x: 1, y: 1, mine: false, status: "hidden" },
        ],
      ]);
    });
  });

  describe("#markTile", () => {
    test("It marks tile with a status number", () => {
      const board = [
        [
          { x: 0, y: 0, mine: false, status: "hidden" },
          { x: 0, y: 1, mine: false, status: "number" },
        ],
        [
          { x: 1, y: 0, mine: true, status: "hidden" },
          { x: 1, y: 1, mine: false, status: "hidden" },
        ],
      ];
      expect(markTile(board, { x: 0, y: 1 })).toBe(board);
    });
    test("It marks tile with a status marked", () => {
      const board = [
        [
          { x: 0, y: 0, mine: false, status: "hidden" },
          { x: 0, y: 1, mine: false, status: "marked" },
        ],
        [
          { x: 1, y: 0, mine: true, status: "hidden" },
          { x: 1, y: 1, mine: false, status: "hidden" },
        ],
      ];
      expect(markTile(board, { x: 0, y: 1 })).toEqual([
        [
          { x: 0, y: 0, mine: false, status: "hidden" },
          { x: 0, y: 1, mine: false, status: "hidden" },
        ],
        [
          { x: 1, y: 0, mine: true, status: "hidden" },
          { x: 1, y: 1, mine: false, status: "hidden" },
        ],
      ]);
    });
    test("It marks tile with a status hidden", () => {
      const board = [
        [
          { x: 0, y: 0, mine: false, status: "hidden" },
          { x: 0, y: 1, mine: false, status: "hidden" },
        ],
        [
          { x: 1, y: 0, mine: true, status: "hidden" },
          { x: 1, y: 1, mine: false, status: "hidden" },
        ],
      ];
      expect(markTile(board, { x: 0, y: 1 })).toEqual([
        [
          { x: 0, y: 0, mine: false, status: "hidden" },
          { x: 0, y: 1, mine: false, status: "marked" },
        ],
        [
          { x: 1, y: 0, mine: true, status: "hidden" },
          { x: 1, y: 1, mine: false, status: "hidden" },
        ],
      ]);
    });
  });

  describe("#markedTilesCount", () => {
    test("It return number of marked tiles", () => {
      const board = [
        [
          { x: 0, y: 0, mine: false, status: "marked" },
          { x: 0, y: 1, mine: false, status: "hidden" },
        ],
        [
          { x: 1, y: 0, mine: true, status: "marked" },
          { x: 1, y: 1, mine: false, status: "hidden" },
        ],
      ];
      expect(markedTilesCount(board)).toBe(2);
    });
  });

  describe("#revealTile", () => {
    const board = [
      [
        { x: 0, y: 0, mine: false, status: "number" },
        { x: 0, y: 1, mine: false, status: "hidden" },
      ],
      [
        { x: 1, y: 0, mine: true, status: "hidden" },
        { x: 1, y: 1, mine: false, status: "hidden" },
      ],
    ];
    test("It returns board if the tile status is not hidden", () => {
      expect(revealTile(board, { x: 0, y: 0 })).toBe(board);
    });
    test("It changes status if tile is a mine", () => {
      expect(revealTile(board, { x: 1, y: 0 })).toEqual([
        [
          { x: 0, y: 0, mine: false, status: "number" },
          { x: 0, y: 1, mine: false, status: "hidden" },
        ],
        [
          { x: 1, y: 0, mine: true, status: "mine" },
          { x: 1, y: 1, mine: false, status: "hidden" },
        ],
      ]);
    });
    test("If tile status is hidden", () => {
      const board = [
        [
          { x: 0, y: 0, mine: false, status: "hidden" },
          { x: 0, y: 1, mine: false, status: "hidden" },
        ],
        [
          { x: 1, y: 0, mine: true, status: "hidden" },
          { x: 1, y: 1, mine: false, status: "hidden" },
        ],
      ];
      expect(revealTile(board, { x: 0, y: 1 })).toEqual([
        [
          { x: 0, y: 0, mine: false, status: "hidden" },
          { x: 0, y: 1, mine: false, status: "number", adjacentMinesCount: 1 },
        ],
        [
          { x: 1, y: 0, mine: true, status: "hidden" },
          { x: 1, y: 1, mine: false, status: "hidden" },
        ],
      ]);
    });
    test("If mines length is 0", () => {
      const board = [
        [
          { x: 0, y: 0, mine: true, status: "mine" },
          { x: 0, y: 1, mine: false, status: "hidden" },
          { x: 0, y: 2, mine: false, status: "hidden" },
        ],
        [
          { x: 1, y: 0, mine: false, status: "hidden" },
          { x: 1, y: 1, mine: false, status: "hidden" },
          { x: 1, y: 2, mine: false, status: "hidden" },
        ],
        [
          { x: 2, y: 0, mine: false, status: "hidden" },
          { x: 2, y: 1, mine: false, status: "hidden" },
          { x: 2, y: 2, mine: false, status: "hidden" },
        ],
      ];

      expect(revealTile(board, { x: 2, y: 1 })).toEqual([
        [
          { x: 0, y: 0, mine: true, status: "mine" },
          { x: 0, y: 1, mine: false, status: "number", adjacentMinesCount: 1 },
          { x: 0, y: 2, mine: false, status: "number", adjacentMinesCount: 0 },
        ],
        [
          { x: 1, y: 0, mine: false, status: "number", adjacentMinesCount: 1 },
          { x: 1, y: 1, mine: false, status: "number", adjacentMinesCount: 1 },
          { x: 1, y: 2, mine: false, status: "number", adjacentMinesCount: 0 },
        ],
        [
          { x: 2, y: 0, mine: false, status: "number", adjacentMinesCount: 0 },
          { x: 2, y: 1, mine: false, status: "number", adjacentMinesCount: 0 },
          { x: 2, y: 2, mine: false, status: "number", adjacentMinesCount: 0 },
        ],
      ]);
    });
  });

  describe("#checkWin", () => {
    test("It returns true if player wins and mine is hidden", () => {
      const board = [
        [
          { x: 0, y: 0, mine: false, status: "number", adjacentMinesCount: 1 },
          { x: 0, y: 1, mine: false, status: "number", adjacentMinesCount: 1 },
        ],
        [
          { x: 1, y: 0, mine: true, status: "hidden" },
          { x: 1, y: 1, mine: false, status: "number", adjacentMinesCount: 1 },
        ],
      ];
      expect(checkWin(board)).toBe(true);
    });

    test("It returns true if player wins and mine is marked", () => {
      const board = [
        [
          { x: 0, y: 0, mine: false, status: "number", adjacentMinesCount: 1 },
          { x: 0, y: 1, mine: false, status: "number", adjacentMinesCount: 1 },
        ],
        [
          { x: 1, y: 0, mine: true, status: "marked" },
          { x: 1, y: 1, mine: false, status: "number", adjacentMinesCount: 1 },
        ],
      ];
      expect(checkWin(board)).toBe(true);
    });

    test("It returns false if player clicked on mine", () => {
      const board = [
        [
          { x: 0, y: 0, mine: false, status: "number", adjacentMinesCount: 1 },
          { x: 0, y: 1, mine: false, status: "number", adjacentMinesCount: 1 },
        ],
        [
          { x: 1, y: 0, mine: true, status: "mine" },
          { x: 1, y: 1, mine: false, status: "number", adjacentMinesCount: 1 },
        ],
      ];
      expect(checkWin(board)).toBe(false);
    });
  });

  describe("#checkLose", () => {
    test("It returns true if player clicks on mine", () => {
      const board = [
        [
          { x: 0, y: 0, mine: false, status: "number", adjacentMinesCount: 1 },
          { x: 0, y: 1, mine: false, status: "number", adjacentMinesCount: 1 },
        ],
        [
          { x: 1, y: 0, mine: true, status: "mine" },
          { x: 1, y: 1, mine: false, status: "hidden" },
        ],
      ];
      expect(checkLose(board)).toBe(true);
    });
    test("It returns false if player did not click on mine", () => {
      const board = [
        [
          { x: 0, y: 0, mine: false, status: "number", adjacentMinesCount: 1 },
          { x: 0, y: 1, mine: false, status: "number", adjacentMinesCount: 1 },
        ],
        [
          { x: 1, y: 0, mine: true, status: "hidden" },
          { x: 1, y: 1, mine: false, status: "hidden" },
        ],
      ];
      expect(checkLose(board)).toBe(false);
    });
  });
});
