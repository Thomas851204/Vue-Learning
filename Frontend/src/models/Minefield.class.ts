import { Cell } from "./Cell.class";

export class MineGrid {
  mines: number;
  rows: number;
  columns: number;
  grid: Cell[][];
  constructor(mines: number, rows: number, columns: number) {
    this.mines = mines;
    this.rows = rows;
    this.columns = columns;
    this.grid = this.initGrid();
  }
  private initGrid(): Cell[][] {
    return Array.from({ length: this.rows }, () =>
      Array.from({ length: this.columns }, () => new Cell())
    );
  }
}
