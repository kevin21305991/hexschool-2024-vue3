<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  addCart: {
    type: Function,
    default: () => {}
  }
});

const { name, description, price } = props.data;
</script>

<template>
  <a href="#" class="list-group-item list-group-item-action" @click="props.addCart(1)">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{{ name }}</h5>
      <small>${{ price }}</small>
    </div>
    <p class="mb-1">{{ description }}</p>
  </a>
</template>

<style lang="scss" scoped></style>
