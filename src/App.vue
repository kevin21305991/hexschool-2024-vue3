<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <nav>
    <RouterLink to="/">Week1</RouterLink>
    <RouterLink to="/week2">Week2</RouterLink>
  </nav>

  <RouterView />
</template>

<style lang="scss" scoped></style>
