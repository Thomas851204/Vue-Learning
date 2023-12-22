export class Cell {
  revealed: boolean;
  value: any;
  flagged: boolean;
  disabled: boolean;

  constructor() {
    this.revealed = false;
    this.value = "";
    this.flagged = false;
    this.disabled = false;
  }
}
