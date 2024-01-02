<template>
  <div class="body">
    <div class="cardWrap">
      <div class="formWrap" @submit.prevent="regFormPost">
        <label for="username">Username</label>
        <input
          type="text"
          autocomplete="off"
          name="username"
          v-model="username"
          required
          maxlength="10"
        />
        <label for="email">Email</label>
        <input
          type="email"
          autocomplete="off"
          name="email"
          v-model="email"
          required
        />
      </div>
      <router-link to="/login"
        >Already have an account? Sign in here!</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { FEenv } from "@/env";
export default defineComponent({
  name: "Register",
  data() {
    return {
      username: "",
      email: "",
    };
  },
  methods: {
    regFormPost() {},
  },
});
</script>

<style scoped>
.body {
  height: 100vh;
  margin-left: 10px;
}
.cardWrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 15%;
}
.formWrap {
  display: flex;
  flex-direction: column;
  text-decoration: none;
}
</style>
