<template>
  <div class="body">
    <h1>{{ redir }}</h1>
    <p>Input</p>
    <div id="input-form-container">
      <form @submit.prevent="inputClick">
        <label for="iusername">Username</label>
        <input
          type="text"
          autocomplete="off"
          name="iusername"
          v-model="iusername"
        />
        <label for="iinput">Input</label>
        <input type="text" autocomplete="off" name="iinput" v-model="iinput" />
        <input type="submit" />
      </form>
    </div>
    <p>Output</p>
    <div id="output-form-container">
      <form @submit.prevent="outputClick">
        <label for="ousername">Username</label>
        <input
          type="text"
          autocomplete="off"
          name="ousername"
          v-model="ousername"
        />
        <label for="oinput">Input</label>
        <input type="text" autocomplete="off" name="oinput" v-model="oinput" />
        <input type="submit" />
      </form>
      <button @click="showAll">Show all inputs</button>
      <button @click="result = null">Clear</button>
    </div>
    <div v-if="result">{{ result }}</div>
  </div>
</template>

<script lang="ts">
import { DefineComponent, defineComponent } from "vue";
export default defineComponent({
  name: "FormTest",
  data() {
    return {
      redir: "This page is for testing Forms",
      mockData: [
        { username: "Smith", input: "Smith's input" },
        { username: "Doe", input: "Doe's test input" },
      ],
      iusername: "",
      iinput: "",
      ousername: "",
      oinput: "",
      result: null as string | null,
    };
  },
  methods: {
    inputClick() {
      this.mockData.push({ username: this.iusername, input: this.iinput });
      (this.iusername = ""), (this.iinput = "");
    },
    outputClick() {
      const found = this.mockData.find(
        (data) =>
          (this.ousername && data.username === this.ousername) ||
          (this.oinput && data.input === this.oinput)
      );
      this.result = found ? JSON.stringify(found) : "No match";
    },
    showAll() {
      this.result = JSON.stringify(this.mockData);
    },
  },
});
</script>

<style scoped>
.body {
  background: rgb(255, 255, 255);
  height: 100vh;
}
h1 {
  color: rgb(0, 0, 0);
}

#input-form-container,
#output-form-container {
  padding-left: 20px;
  justify-items: center;
}
form,
label,
input {
  display: block;
}
label {
  margin-bottom: 5px;
}
input {
  margin-bottom: 15px;
}

input[type="submit"] {
  width: 75px;
  height: 30px;
}
p {
  padding-left: 5px;
  font-weight: bold;
  margin: 5px;
}
</style>
