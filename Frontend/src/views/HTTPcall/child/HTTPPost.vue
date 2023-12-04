<template>
  <p>Post</p>
  <form class="postForm" @submit.prevent="postClick">
    <label for="username">Username</label>
    <input
      type="text"
      autocomplete="off"
      name="username"
      v-model="username"
      required
      maxlength="10"
    />
    <!-- <span v-if="!isValidUsername"
            >Username is required and must be at most 10 characters</span
          > -->
    <label for="email">Email</label>
    <input
      type="email"
      autocomplete="off"
      name="email"
      v-model="email"
      required
    />
    <!-- <span v-if="!isValidEmail">Enter a valid email address</span> -->
    <input type="submit" value="Post Data" />
    <div v-if="postResp.message !== ''">{{ postResp.message }}</div>
  </form>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { FEenv } from "@/env";

export default defineComponent({
  name: "HTTPPost",
  data() {
    return {
      username: "",
      email: "",
      devurl: new FEenv(),
      postResp: { message: "" } as { message: string },
    };
  },
  // TOFIX
  // computed: {
  //   isValidUsername() {
  //     return this.username.trim().length > 0 && this.username.length <= 10;
  //   },
  //   isValidEmail() {
  //     const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  //     return emailPattern.test(this.email);
  //   },
  //   isValidForm() {
  //     return this.isValidUsername && this.isValidEmail;
  //   },
  // },
  methods: {
    async postClick() {
      this.postResp = (
        await axios.post(this.devurl.devbaseurl + "users/postUser", {
          username: this.username,
          email: this.email,
        })
      ).data;
      this.email = "";
      this.username = "";
      setTimeout(() => {
        this.postResp = { message: "" };
      }, 5000);
    },
  },
});
</script>

<style scoped>
form,
label,
input {
  display: block;
}
</style>
