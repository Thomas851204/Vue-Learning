<template>
  <div class="nav">
    <RouterLink to="/" class="navIcon">Home</RouterLink>
    <RouterLink to="/mine" class="navIcon">Minesweeper</RouterLink>
  </div>

  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
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
.fade-enter-active,
.fade-leave-active {
  transition: 1500ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
