<template>
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
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { UserInterface } from "@/models/User.interface";
import { FEenv } from "@/env";

export default defineComponent({
  name: "HTTPGET",

  data() {
    return {
      usersList: [] as UserInterface[],
      devurl: new FEenv(),
    };
  },

  methods: {
    async getClick() {
      this.usersList = (
        await axios.get(this.devurl.devbaseurl + "users/getAll")
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
.getList {
  display: flex;
}

.column {
  flex: 1;
  max-width: 100px;
}
</style>
@/env
