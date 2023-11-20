<template>
  <div class="body">
    <h1>{{ redir }}</h1>
    <div class="get">
      <p>Get</p>
      <button type="submit" @click="getClick">Get all users</button>
      <div v-if="getCalled">
        <p>{{ usersList }}</p>
      </div>
    </div>
    <button class="clear" @click="(getCalled = false), (usersList = [])">
      Clear
    </button>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { DefineComponent, defineComponent } from "vue";
export default defineComponent({
  name: "HTTPcall",
  data() {
    return {
      redir: "HTTP call testing",
      getCalled: false,
      usersList: [],
    };
  },
  methods: {
    async getClick() {
      this.getCalled = true;
      this.usersList = (
        await axios.get("http://localhost:3000/users/getAll")
      ).data;
    },
  },
});
</script>

<style scoped>
.body {
  height: 100vh;
  margin-left: 10px;
}
</style>
