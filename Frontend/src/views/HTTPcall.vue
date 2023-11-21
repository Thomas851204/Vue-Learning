<template>
  <div class="body">
    <h1>{{ redir }}</h1>
    <div class="get">
      <p>Get</p>
      <button type="submit" @click="getClick">Get all users</button>
      <div class="getList" v-if="usersList">
        <div class="column">
          <p v-for="user in usersList" :key="user.id">{{ user.username }}</p>
        </div>
        <div class="column">
          <p v-for="user in usersList" :key="user.id">{{ user.email }}</p>
        </div>
      </div>
      <button class="clear" @click="usersList = []">Clear</button>
    </div>
    <div class="post">
      <p>Post</p>
      <form class="postForm" @submit.prevent="postClick">
        <label for="username">Username</label>
        <input
          type="text"
          autocomplete="off"
          name="username"
          v-model="username"
        />
        <label for="email">Email</label>
        <input type="email" autocomplete="off" name="email" v-model="email" />
        <input type="submit" value="Post Data" />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { UserInterface } from "../models/User.interface";
import { FEenv } from "../../env";
export default defineComponent({
  name: "HTTPcall",
  data() {
    return {
      redir: "HTTP call testing",
      usersList: [] as UserInterface[],
      username: "",
      email: "",
      devurl: new FEenv(),
    };
  },
  methods: {
    async getClick() {
      this.usersList = (
        await axios.get(this.devurl.devbaseurl + "users/getAll")
      ).data;
    },
    async postClick() {},
  },
});
</script>

<style scoped>
.body {
  height: 100vh;
  margin-left: 10px;
}
.getList {
  display: flex;
}

.column {
  flex: 1;
  max-width: 100px;
}
form,
label,
input {
  display: block;
}
</style>
