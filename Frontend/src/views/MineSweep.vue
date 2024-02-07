<template>
  <div class="body" :class="{ 'mine-sweep-animation': isActive }">
    <div id="main">
      <div class="optwrap">
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
        </div>
        <div class="buttonWrap">
          <button class="generate" @click="mineGen()">Generate field!</button>
          <button class="clear" @click="generatedGrid = null">
            Clear field
          </button>
        </div>
      </div>
      <div v-if="generatedGrid !== null" class="mineGrid">
        <div class="nav">
          <p>Mines: {{ generatedGrid.mines - generatedGrid.flagged }}</p>
          <p v-if="won">Congrats!</p>
          <p v-if="lost">Try again!</p>
          <p>Time: {{ timeElapsed }}</p>
        </div>
        <div class="fieldWrap">
          <div
            class="row"
            v-for="(row, rowIndex) in generatedGrid.grid"
            :key="rowIndex"
          >
            <button
              class="cell"
              v-for="(cell, cellIndex) in row"
              :key="cellIndex"
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
      generatedGrid: null as null | MineGrid,
      timer: 0,
      timerInterval: null as any,
      isActive: true,
    };
  },
  computed: {
    timeElapsed(): string {
      const minutes = Math.floor(this.timer / 60);
      const seconds = this.timer % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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

    getNumberColor(value: number | string): string {
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
        case "x":
          return "black";
        default:
          return "#979797";
      }
    },
  },
  beforeRouteLeave() {
    this.isActive = false;
  },
});
</script>

<style scoped>
.body {
  height: 95dvh;
  background: linear-gradient(-45deg, #692612, #860b3a, #092499, #0f965e);
  background-size: 400% 400%;
}
.mine-sweep-animation {
  animation: gradient 25s ease infinite;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

#main {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0;
  justify-content: center;
  width: 100%;
}

.optwrap {
  display: flex;
  justify-items: center;
  flex-direction: column;
  width: 100%;
  position: unset;
  margin-top: 3vh;
  margin-bottom: 2vh;
}
.inputSlide {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 1.5vw;
}
label {
  margin-left: 2vw;
}
.buttonWrap {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.buttonWrap button {
  width: 20%;
  height: 4vh;
  margin-top: 1vh;
  margin-left: 2vh;
  font-size: 2vh;
}
div.mineGrid {
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
  justify-content: space-evenly;
  width: 100%;
}
.nav * {
  font-size: 2vh;
  font-weight: 800;
  margin: auto 2vw;
}

.fieldWrap {
  border: 2px solid #343434;
  align-items: center;
  justify-content: center;
  margin: 1dvw;
}
.row {
  display: flex;
  flex-direction: row;
  height: 2vh;
  min-height: 12px;
}

button.cell {
  height: 2vh;
  width: 2vh;
  min-width: 12px;
  min-height: 12px;
}
button.cell {
  border-radius: 0;
  border: 1px solid #343434;
  background-color: #979797;
}
button.cell:active {
  background-color: #4b4b4b !important;
}

button.cell:disabled {
  padding: 0;
  pointer-events: none;
  cursor: not-allowed;
  color: black;
  border: 1px solid #5a5a5a;
  background-color: rgb(187, 187, 187) !important;
}
</style>
