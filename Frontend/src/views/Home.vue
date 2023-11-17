<template>
  <div class="body">
    <h1>{{ title }}</h1>
    <input type="text" ref="name" />
    <button @click="handleClick">Click me</button>

    <Test v-if="testVisible" />
  </div>
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
    return {
      title: "My First Vue App :)",
      testVisible: false,
    };
  },
  methods: {
    handleClick() {
      const nameRef = this.$refs.name as HTMLElement;
      nameRef.classList.add("active");
      nameRef.focus();
      this.testVisible = !this.testVisible;
    },
  },
});
</script>
<style scoped>
h1 {
  color: red;
}
</style>
