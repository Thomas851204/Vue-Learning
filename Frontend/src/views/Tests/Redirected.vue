<template>
  <div class="body">
    <h1>{{ redir }}</h1>
  </div>
</template>

<script lang="ts">
import { DefineComponent, defineComponent } from "vue";
export default defineComponent({
  name: "Redirected",
  data() {
    return {
      redir: "This is a redirected page",
    };
  },
});
</script>

<style scoped>
.body {
  background: black;
  height: 100vh;
}
h1 {
  color: rgb(173, 80, 80);
}
</style>
