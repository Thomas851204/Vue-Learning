<template>
  <div class="nav">
    <router-link to="/" class="navIcon">Home</router-link>
    <router-link to="/redir" class="navIcon">Redirected</router-link>
    <router-link to="/http" class="navIcon">HTTP test</router-link>
    <router-link to="/form" class="navIcon">Form</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
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
  color: white;
  text-decoration: none;
  padding-left: 20px;
}
</style>
