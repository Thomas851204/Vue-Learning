<template>
  <div class="body">
    <h1>{{ redir }}</h1>
  </div>
</template>
<script lang="ts">
import { DefineComponent, defineComponent } from "vue";
export default defineComponent({
  name: "Page2",
  data() {
    return {
      redir: "Page 2",
    };
  },
});
</script>
<style scoped>
.body {
  background: rgb(6, 22, 113);
  height: 100vh;
}
h1 {
  color: white;
}
</style>
