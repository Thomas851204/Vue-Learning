<template>
  <div class="body">
    <h1>{{ redir }}</h1>
    <button class="generate" @click.="mineGen">Generate field!</button>
    <div class="mineGrid" v-if="mineGrid">
      <div>Mines:{{ minesCount }}</div>
      <div class="row" v-for="(row, rowIndex) in mineGrid" :key="rowIndex">
        <div class="cell" v-for="(cell, cellIndex) in row" :key="cellIndex">
          <button
            class="cell"
            @contextmenu.prevent
            @click.left="reveal(rowIndex, cellIndex)"
            @click.right="flag(rowIndex, cellIndex)"
            :disabled="cell.disabled"
            :style="{
              color: cell.revealed ? getNumberColor(cell.value) : '#000000',
              backgroundColor: cell.flagged
                ? 'red'
                : cell.revealed
                ? getNumberColor(cell.value)
                : '#979797',
            }"
            :class="{ 'disabled-style': cell.disabled }"
          >
            {{ cell.revealed ? cell.value : "" }}
          </button>
        </div>
      </div>
    </div>
    <button class="clear" @click="mineGrid = []">Clear field</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MineSweeper",
  data() {
    return {
      redir: "Minesweeper game",
      mineGrid: Array<
        Array<{
          revealed: boolean;
          value: any;
          flagged: boolean;
          disabled: boolean;
        }>
      >([]),
    };
  },
  computed: {
    minesCount() {
      if (!this.mineGrid.length) {
        return 40;
      }

      let flaggedCount = 0;
      for (let row = 0; row < this.mineGrid.length; row++) {
        for (let col = 0; col < this.mineGrid[row].length; col++) {
          if (this.mineGrid[row][col].flagged) {
            flaggedCount++;
          }
        }
      }

      return 40 - flaggedCount;
    },
  },
  methods: {
    mineGen() {
      this.mineGrid = Array.from({ length: 14 }, () =>
        Array.from({ length: 18 }, () => ({
          revealed: false,
          value: "",
          flagged: false,
          disabled: false,
        }))
      );
      let minesPlaced = 0;
      while (minesPlaced < 40) {
        const randRow = Math.floor(Math.random() * 14);
        const randCol = Math.floor(Math.random() * 18);
        if (this.mineGrid[randRow][randCol].value !== "x") {
          this.mineGrid[randRow][randCol].value = "x";
          minesPlaced++;
        }
      }
      const calcAdj = (r: number, c: number) => {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = r + i;
            const newCol = c + j;

            if (
              newRow >= 0 &&
              newRow < 14 &&
              newCol >= 0 &&
              newCol < 18 &&
              this.mineGrid[newRow][newCol].value === "x"
            ) {
              count++;
            }
          }
        }
        return count;
      };
      for (let row = 0; row < this.mineGrid.length; row++) {
        for (let column = 0; column < this.mineGrid[row].length; column++) {
          if (
            this.mineGrid[row][column].value !== "x" &&
            calcAdj(row, column) !== 0
          ) {
            this.mineGrid[row][column].value = calcAdj(row, column);
          }
        }
      }
      return this.mineGrid;
    },
    reveal(r: number, c: number) {
      const cell = this.mineGrid[r][c];

      if (!cell.flagged) {
        if (cell.value === "x") {
          this.mineGrid.forEach((row) =>
            row.forEach((cell) => {
              (cell.revealed = true), (cell.disabled = true);
            })
          );
        } else if (cell.value === "") {
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const newRow = r + i;
              const newCol = c + j;
              if (
                newRow >= 0 &&
                newRow < this.mineGrid.length &&
                newCol >= 0 &&
                newCol < this.mineGrid[0].length
              ) {
                this.mineGrid[newRow][newCol].revealed = true;
                this.mineGrid[newRow][newCol].disabled = true;
              }
            }
          }
        } else {
          cell.revealed = true;
          cell.disabled = true;
        }
      }
    },
    flag(r: number, c: number) {
      this.mineGrid[r][c].flagged = !this.mineGrid[r][c].flagged;
    },
    getNumberColor(value: number) {
      switch (value) {
        case 1:
          return "blue";
        case 2:
          return "green";
        case 3:
          return "red";
        case 4:
          return "darkblue";
        case 5:
          return "brown";
        case 6:
          return "aqua";
        case 7:
          return "purple";
        case 8:
          return "darkgrey";
        default:
          return "#979797";
      }
    },
  },
});
</script>

<style scoped>
.body {
  height: 100vh;
  margin-left: 10px;
}
.row {
  display: flex;
  flex-direction: row;
  height: 20px;
}
.cell {
  display: inline-block;
}
button.cell {
  height: 20px;
  width: 20px;
  border-radius: 0;
  border: 1px solid #343434;
  background-color: #979797;
}
button:active {
  background-color: #4b4b4b !important;
}
button.cell:disabled {
  pointer-events: none;
  cursor: not-allowed;
  color: black;
  border: 1px solid #5a5a5a;
  background-color: rgb(187, 187, 187) !important;
}
</style>
