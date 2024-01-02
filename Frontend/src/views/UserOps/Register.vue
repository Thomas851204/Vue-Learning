<template>
  <div class="body">
    <div class="cardWrap">
      <form class="formWrap" @submit.prevent="regFormPost">
        <label for="username">Username</label>
        <input
          type="text"
          autocomplete="off"
          name="username"
          v-model="state.username"
        />
        <span v-if="v$.username.$error">{{
          v$.username.$errors[0].$message
        }}</span>
        <label for="email">Email</label>
        <input
          type="email"
          autocomplete="off"
          name="email"
          v-model="state.email"
        />
        <span v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
        <label for="password">Password</label>
        <input
          type="password"
          autocomplete="off"
          name="password"
          v-model="state.password"
        />
        <span v-if="v$.password.$error">{{
          v$.password.$errors[0].$message
        }}</span>
        <input type="submit" value="Register" />
      </form>
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
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

export default defineComponent({
  name: "Register",
  setup() {
    const state = reactive({
      username: "",
      email: "",
      password: "",
    });
    //TODO: if pattern does not match, create appropriate error message
    function pwPattern(value: string): boolean {
      const pat =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return pat.test(value);
    }
    const rules = {
      username: { required },
      email: { required, email },
      password: { required, minLength: minLength(8), pwPattern },
    };

    const v$ = useVuelidate(rules, state);

    return { state, v$ };
  },
  data() {
    return {};
  },
  methods: {
    regFormPost() {
      this.v$.$validate();
      if (this.v$.$invalid) {
        alert("FAIL");
      } else {
        alert("success");
      }
    },
  },
});
</script>

<style scoped>
.body {
  height: 100vh;
  margin-left: 10px;
}
/* TOFIX: cardWrap not centered, not wide enough, input fields wider than cardwrap */
.cardWrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 15%;
  width: 25%;
  height: 50%;
  border: solid 1px black;
}
.formWrap {
  display: flex;
  flex-direction: column;
  text-decoration: none;
}
input {
  width: fit-content;
}
</style>
