import { Cell } from "./Cell.class";

export class MineGrid {
  firstClick: boolean = true;
  mines: number;
  rows: number;
  columns: number;
  allRevealed: boolean = false;
  grid: Cell[][];

  constructor(mines: number = 40, rows: number = 14, columns: number = 18) {
    this.mines = mines;
    this.rows = rows;
    this.columns = columns;
    this.grid = this.initGrid();
  }
  initGrid() {
    return (this.grid = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.columns }, () => new Cell())
    ));
  }
  updateBasics(m: number, r: number, c: number) {
    this.mines = Math.ceil((r * c * m) / 100);
    this.rows = r;
    this.columns = c;
    this.initGrid();
  }
  placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < this.mines) {
      const randRow = Math.floor(Math.random() * 14);
      const randCol = Math.floor(Math.random() * 18);
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
    }
    if (!cell.flagged) {
      if (cell.value === "x") {
        this.revealAllMines();
      } else if (cell.value === "") {
        this.revealAdjacent(r, c);
      } else {
        cell.revealed = true;
        cell.disabled = true;
      }
    }
  }
  revealAllMines() {
    this.grid.forEach((row) => {
      row.forEach((cell: Cell) => {
        cell.revealed, cell.disabled;
      });
    });
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
    this.grid[r][c].flagged = !this.grid[r][c].flagged;
  }
}
