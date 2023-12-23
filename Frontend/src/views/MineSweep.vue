<template>
  <div class="body">
    <h1>{{ redir }}</h1>
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
      <button
        class="generate"
        @click="
          mineGrid.updateBasics(mineSlideValue, rowSlideValue, colSlideValue)
        "
      >
        Generate field!
      </button>
    </div>
    <div class="mineGrid">
      <div class="fieldWrap">
        <div class="row" v-for="row in mineGrid.grid">
          <div class="cell" v-for="cell in row">
            <button class="cell">{{ cell.value }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MineGrid } from "@/models/Minefield.class";
import { Cell } from "@/models/Cell.class";

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
      generated: false,
      firstClick: true,
      won: false,
      lost: false,
      redir: "Minesweeper game",
      mineGrid: new MineGrid(),

      timer: 0,
      timerInterval: null as any,
    };
  },
  computed: {
    minesCount() {},
    winCond(): boolean {
      let nonMineRevealedCount = 0;
      return true;
    },
    lossCond(): boolean {
      return false;
    },
    timeElapsed(): string {
      const minutes = Math.floor(this.timer / 60);
      const seconds = this.timer % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    },
  },
  methods: {
    startTimer() {
      clearInterval(this.timerInterval);
      this.timerInterval = setInterval(() => {
        this.timer++;
      }, 1000);
    },
    mineGen() {
      this.won = false;
      this.lost = false;

      this.firstClick = true;
      clearInterval(this.timerInterval);
      this.timer = 0;
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
button {
  display: block;
}
div.mineGrid {
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 400px;
  flex-direction: column;
  margin: 0 auto;
}

.nav {
  display: flex;
  justify-content: space-between;
  max-width: 360px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.inputSlide {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
input {
  margin-bottom: 10px;
}

.fieldWrap {
  width: 360px;
  border: 2px solid #343434;
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
