<template>
  <div class="body">
    <h1>{{ redir }}</h1>
  </div>
</template>
<script lang="ts">
import { DefineComponent, defineComponent } from "vue";
export default defineComponent({
  name: "FormTest",
  data() {
    return {
      redir: "This page is for testing Forms",
    };
  },
});
</script>
<style scoped>
.body {
  background: rgb(255, 255, 255);
  height: 100vh;
}
h1 {
  color: rgb(0, 0, 0);
}
</style>
