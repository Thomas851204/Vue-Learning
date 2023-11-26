<template>
  <div class="body">
    <h1>{{ redir }}</h1>
    <div class="get">
      <HTTPGet />
    </div>
    <div class="post">
      <HTTPPost />
    </div>
    <div class="patch">
      <HTTPPatch />
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import HTTPGet from "@/views/HTTPcall/child/HTTPGet.vue";
import HTTPPost from "@/views/HTTPcall/child/HTTPPost.vue";
import HTTPPatch from "@/views/HTTPcall/child/HTTPPatch.vue";

export default defineComponent({
  name: "HTTPcall",
  data() {
    return {
      redir: "HTTP call testing",
    };
  },
  components: { HTTPGet, HTTPPost, HTTPPatch },
});
</script>

<style scoped>
.body {
  height: 100vh;
  margin-left: 10px;
}
</style>
