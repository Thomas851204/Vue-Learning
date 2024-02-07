<template>
  <div class="body"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Test from "../components/Test.vue";
export default defineComponent({
  name: "Home",
  components: {
    Test,
  },
  data() {
    return {};
  },
  methods: {},
});
</script>

<style scoped>
.body {
  width: 100vw;
  height: 95vh;
  background-color: #071983;
  background-image: linear-gradient(
    303deg,
    #0c24a8 0%,
    #150e75 46%,
    #070735 100%
  );
}
</style>
