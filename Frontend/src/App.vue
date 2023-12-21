<template>
  <div class="nav">
    <router-link to="/" class="navIcon">Home</router-link>
    <div class="dropdown" @mouseleave="resetDropdown">
      <div class="navIcon" @mouseenter="showDropdown">Tests</div>
      <div class="contentWrap" v-if="selectedTest">
        <router-link to="/redir" class="dd" @click="resetDropdown"
          >Redirected</router-link
        >
        <router-link to="/http" class="dd" @click="resetDropdown"
          >HTTP calls</router-link
        >
        <router-link to="/form" class="dd" @click="resetDropdown"
          >Form tests</router-link
        >
      </div>
    </div>
    <router-link to="/mine" class="navIcon">Minesweeper</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  data() {
    return {
      selectedTest: false,
    };
  },
  methods: {
    showDropdown() {
      this.selectedTest = true;
    },
    resetDropdown() {
      this.selectedTest = false;
    },
  },
});
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.nav {
  width: 100%;
  height: 50px;
  background-color: black;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.navIcon {
  border: none;
  background-color: black;
  color: white;
  text-decoration: none;
  padding-left: 20px;
  margin-bottom: 10px;
}
.contentWrap {
  position: absolute;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  width: 80px;
  align-items: center;
}
.dd {
  font-size: smaller;
  background-color: black;
  color: white;
  margin-bottom: 10px;
}
</style>
