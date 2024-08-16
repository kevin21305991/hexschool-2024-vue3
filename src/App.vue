<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Week1</RouterLink>
      <RouterLink to="/week2">Week2</RouterLink>
      <RouterLink to="/week3">Week3</RouterLink>
    </nav>
    <h1>六角學院 2024 Vue 前端新手營HW<span>By Kevin Wei</span></h1>
  </header>

  <div class="content-wrap">
    <RouterView />
  </div>
</template>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}
body {
  padding: 10px;
  font-family: 'Noto Sans TC', sans-serif;
}
button,
input {
  font-family: 'Noto Sans TC', sans-serif;
}
button {
  background-color: #7f7f9b;
  border: none;
  color: #fff;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  &:disabled {
    background-color: #adadad;
  }
}
header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #7f7f9b;
  border-radius: 10px;
  padding: 0 25px 0 15px;
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    > a {
      padding: 15px 10px;
      color: #d5d5d5;
      text-decoration: none;
      &.router-link-active {
        color: #fff;
      }
    }
  }
  h1 {
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-left: auto;
    span {
      color: #ccc;
      font-size: 18px;
      margin-left: 10px;
    }
  }
}
.content-wrap {
  margin-top: 30px;
}
</style>
