<script setup>
import { computed } from 'vue';
const model = defineModel();
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  removeCart: {
    type: Function,
    default: () => {}
  }
});
const { name, description, price } = props.data;
const total = computed(() => {
  return price * model.value;
});
</script>

<template>
  <tr>
    <td><button type="button" class="btn btn-sm" @click="props.removeCart">x</button></td>
    <td>{{ name }}</td>
    <td>
      <small>{{ description }}</small>
    </td>
    <td>
      <select class="form-select" v-model="model">
        <option v-for="item in 10" :value="item" :key="item">{{ item }}</option>
      </select>
    </td>
    <td>{{ price }}</td>
    <td>{{ total }}</td>
  </tr>
</template>

<style lang="scss" scoped></style>
