<template>
  <div class="body">
    <section>
      <div class="intro">
        <p>Welcome to my project!</p>
        <p>This site shows a small experimentation with VueJS.</p>
        <p>
          To see how some aspects work,<br />
          I recreated the minesweeper game using OOP.
        </p>
        <p>Click on the Minesweeper navigation button to play a game or two!</p>
        <p>You can find the codebase on GitHub:</p>
        <div class="linkContainer">
          <img src="../assets/github-high-vis.svg" />
          <a href="https://github.com/Thomas851204/Vue-Nest-Learning.git"
            >https://github.com/Thomas851204/Vue-Nest-Learning.git</a
          >
        </div>
      </div>
      <img src="../assets/vue-logo.png" />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Home",

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
section {
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
p {
  font-size: 2vh;
  color: white;
  margin: 0;
  margin-top: 2vh;
}
img {
  width: 23.08vh;
  height: 20vh;
}
.linkContainer {
  height: 7vh;
  display: flex;
  align-items: center;
}
.linkContainer img {
  width: 5vh;
  height: 5vh;
  margin-right: 1vw;
}
.linkContainer a {
  text-decoration: none;
  font-size: 2vh;
  color: rgb(15, 172, 125);
}
</style>
