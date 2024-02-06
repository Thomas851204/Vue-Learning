<template>
  <div class="body">
    <h1>{{ redir }}</h1>
    <div id="main">
      <div class="optwrap">
        <p>Options:</p>
        <div class="inputSlide">
          <label :for="rowSlideId">Rows: {{ rowSlideValue }}</label>
          <input
            :id="rowSlideId"
            type="range"
            min="5"
            max="35"
            class="slider"
            v-model="rowSlideValue"
          />
          <label :for="colSlideId">Columns: {{ colSlideValue }}</label>
          <input
            :id="colSlideId"
            type="range"
            min="5"
            max="35"
            v-model="colSlideValue"
            class="slider"
          />
          <label :for="mineSlideId">Mines(%): {{ mineSlideValue }}</label>
          <input
            :id="mineSlideId"
            type="range"
            min="5"
            max="35"
            v-model="mineSlideValue"
            class="slider"
          />
          <button class="generate" @click="mineGen()">Generate field!</button>
          <button class="clear" @click="generatedGrid = null">
            Clear field
          </button>
        </div>
      </div>
      <div v-if="generatedGrid !== null" class="mineGrid">
        <div class="nav">
          <div>Mines: {{ generatedGrid.mines - generatedGrid.flagged }}</div>
          <div v-if="won">Congrats!</div>
          <div v-if="lost">Try again!</div>
          <div>Time: {{ timeElapsed }}</div>
        </div>
        <div
          class="fieldWrap"
          :style="{ width: fieldWrapWidth, height: fieldWrapHeight }"
        >
          <div
            class="row"
            v-for="(row, rowIndex) in generatedGrid.grid"
            :key="rowIndex"
          >
            <div class="cell" v-for="(cell, cellIndex) in row" :key="cellIndex">
              <button
                class="cell"
                @contextmenu.prevent
                @click.left="cellClick(rowIndex, cellIndex)"
                @click.right="generatedGrid.flag(rowIndex, cellIndex)"
                :disabled="cell.disabled"
                :class="{ 'disabled-style': cell.disabled }"
                :style="{
                  color: cell.revealed ? getNumberColor(cell.value) : '#000000',
                  backgroundColor: cell.flagged
                    ? 'red'
                    : cell.revealed
                    ? getNumberColor(cell.value)
                    : '#979797',
                }"
              >
                {{ cell.revealed ? cell.value : "" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MineGrid } from "@/models/Minefield.class";

export default defineComponent({
  name: "MineSweeper",
  data() {
    return {
      rowSlideValue: 14,
      rowSlideId: "rowSlide",
      colSlideValue: 18,
      colSlideId: "colSlide",
      mineSlideValue: 16,
      mineSlideId: "mineSlide",
      won: false,
      lost: false,
      redir: "Minesweeper game",
      generatedGrid: null as null | MineGrid,
      timer: 0,
      timerInterval: null as any,
    };
  },
  computed: {
    timeElapsed(): string {
      const minutes = Math.floor(this.timer / 60);
      const seconds = this.timer % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    },

    fieldWrapWidth(this: InstanceType<typeof MineGrid>): string {
      return `${this.columns * 20}px`;
    },

    fieldWrapHeight(this: InstanceType<typeof MineGrid>): string {
      return `${this.rows * 20}px`;
    },
  },
  methods: {
    startTimer(): void {
      clearInterval(this.timerInterval);
      this.timerInterval = setInterval(() => {
        this.timer++;
      }, 1000);
    },

    mineGen(): void {
      this.generatedGrid = new MineGrid(
        this.mineSlideValue,
        this.rowSlideValue,
        this.colSlideValue
      );
      this.won = false;
      this.lost = false;
      clearInterval(this.timerInterval);
      this.timer = 0;
    },

    cellClick(r: number, c: number): void {
      if (this.generatedGrid) {
        if (this.generatedGrid.firstClick) {
          this.startTimer();
        }
        this.generatedGrid.reveal(r, c);
        if (this.generatedGrid.allRevealed) {
          this.lost = true;
          clearInterval(this.timerInterval);
        }
        if (this.generatedGrid.allNonMineRevealed) {
          this.won = true;
          clearInterval(this.timerInterval);
        }
      }
    },

    getNumberColor(value: number): string {
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
  height: 90vh;
  margin-left: 10px;
}
#main {
  position: relative;
  display: flex;
  justify-content: center;
}

div.mineGrid {
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: fit-content;
  margin: 0 auto;
}

.nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.inputSlide {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  justify-items: center;
  width: 80%;
}

.inputSlide button {
  display: block;
  width: 30%;
  margin-top: 5%;
}
.fieldWrap {
  border: 2px solid #343434;
  align-items: center;
  justify-content: center;
  margin: 30px;
}
.optwrap {
  position: absolute;
  left: 0;
  width: 25vw;
}
.row {
  display: flex;
  flex-direction: row;
  height: 20px;
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
