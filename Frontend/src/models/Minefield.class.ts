import { Cell } from "./Cell.class";

export class MineGrid {
  firstClick: boolean = true;
  mines: number;
  rows: number;
  columns: number;
  allRevealed: boolean = false;
  allNonMineRevealed: boolean = false;
  grid: Cell[][];
  flagged: number = 0;

  constructor(mines: number = 41, rows: number = 14, columns: number = 18) {
    this.mines = Math.ceil((rows * columns * mines) / 100);
    this.rows = rows;
    this.columns = columns;
    this.grid = this.initGrid();
  }
  initGrid() {
    return (this.grid = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.columns }, () => new Cell())
    ));
  }

  placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < this.mines) {
      const randRow = Math.floor(Math.random() * this.rows);
      const randCol = Math.floor(Math.random() * this.columns);
      if (this.grid[randRow][randCol].value !== "x") {
        this.grid[randRow][randCol].value = "x";
        minesPlaced++;
      }
    }
  }
  calcAdj(r: number, c: number): number {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = r + i;
        const newCol = c + j;

        if (
          newRow >= 0 &&
          newRow < this.rows &&
          newCol >= 0 &&
          newCol < this.columns &&
          this.grid[newRow][newCol].value === "x"
        ) {
          count++;
        }
      }
    }
    return count;
  }
  reveal(r: number, c: number) {
    let cell: Cell = this.grid[r][c];
    if (this.firstClick) {
      this.firstClick = false;
      this.placeMines();
      for (let rows = 0; rows < this.rows; rows++) {
        for (let columns = 0; columns < this.columns; columns++) {
          if (
            this.grid[rows][columns].value !== "x" &&
            this.calcAdj(rows, columns) !== 0
          ) {
            this.grid[rows][columns].value = this.calcAdj(rows, columns);
          }
        }
      }
      //TODO: first click cannot be a mine. If it would be, place the mine somewhere else and recalc values.
    }
    if (!cell.flagged) {
      if (cell.value === "x") {
        this.revealAllMines();
      } else {
        this.revealAdjacent(r, c);
      }
    }
    let revealCount = 0;
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        if (
          this.grid[row][col].value !== "x" &&
          this.grid[row][col].revealed === true
        ) {
          revealCount++;
        }
      }
    }
    if (
      revealCount === this.rows * this.columns - this.mines &&
      this.allRevealed === false
    ) {
      this.allNonMineRevealed = true;
    }
  }
  revealAllMines() {
    this.grid.forEach((row) => {
      row.forEach((cell: Cell) => {
        (cell.revealed = true), (cell.disabled = true);
      });
    });
    this.allRevealed = true;
  }
  revealAdjacent(r: number, c: number) {
    let cell = this.grid[r][c];
    if (!cell.revealed) {
      if (cell.value === "") {
        cell.revealed = true;
        cell.disabled = true;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = r + i;
            const newCol = c + j;
            if (
              newRow >= 0 &&
              newRow < this.grid.length &&
              newCol >= 0 &&
              newCol < this.grid[0].length
            ) {
              this.revealAdjacent(newRow, newCol);
            }
          }
        }
      } else {
        cell.revealed = true;
        cell.disabled = true;
      }
    }
  }
  flag(r: number, c: number) {
    if (this.grid[r][c].flagged) {
      this.grid[r][c].flagged = false;
      this.flagged--;
    } else {
      this.grid[r][c].flagged = true;
      this.flagged++;
    }
  }
}
