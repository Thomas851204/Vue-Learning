<template>
  <div class="nav">
    <router-link to="/" class="navIcon">Home</router-link>
    <router-link to="/mine" class="navIcon">Minesweeper</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  data() {
    return {};
  },
  methods: {},
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
  width: 100vw;
  height: 5vh;
  background-color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
.navIcon {
  border: none;
  background-color: black;
  color: white;
  text-decoration: none;
  padding-left: 20px;
  margin-bottom: 10px;
  font-size: 30px;
}
</style>
