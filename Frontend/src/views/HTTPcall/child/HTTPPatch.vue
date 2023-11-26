<template>
  <p>Patch</p>
  <div class="getList" v-if="usersList">
    <div class="column">
      <button @click="expand(user)" v-for="user in usersList" :key="user.id">
        {{ user.username }}
      </button>
    </div>
  </div>
  <form v-if="selectedUser" @submit.prevent="submitForm">
    <label for="username">Username</label>
    <input v-model="selectedUser.username" />
    <label for="email">Email</label>
    <input v-model="selectedUser.email" />
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { FEenv } from "@/env";
import { UserInterface } from "@/models/User.interface";

export default defineComponent({
  name: "HTTPPatch",
  data() {
    return {
      usersList: [] as UserInterface[],
      devurl: new FEenv(),
      selectedUser: null as UserInterface | null,
    };
  },
  methods: {
    async getList() {
      this.usersList = (
        await axios.get(this.devurl.devbaseurl + "users/getAll")
      ).data;
    },
    expand(user: UserInterface) {
      this.selectedUser = { ...user };
    },
    async submitForm() {
      if (this.selectedUser) {
        const userId = this.selectedUser.id;
        const response = await axios.patch(
          this.devurl.devbaseurl + "users/patch",
          this.selectedUser
        );
        this.selectedUser = null;
        this.getList();
      }
    },
  },
  mounted() {
    this.getList();
  },
});
</script>

<style scoped>
.getList {
  display: flex;
}
.column {
  flex: 1;
  max-width: 100px;
}
button {
  margin-bottom: 10px;
}
</style>
