<script setup lang="ts">
import router from '@/router'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
function redirect() {
  router.go()
}
</script>

<template>
  <button @click="redirect">Go to form page</button>
</template>

<style></style>
