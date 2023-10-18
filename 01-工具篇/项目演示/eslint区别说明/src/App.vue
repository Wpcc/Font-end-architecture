<script setup>
import { ref } from "vue";
const msg = ref("hello world")

msg = 'changed'
</script>

<template>
  <div>{{ msg }}</div>
</template>

<style scoped></style>
