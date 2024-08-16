<script setup>
import { computed } from 'vue';
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});
const { id, cart, remark, total } = props.data;
const createTime = computed(() => {
  const date = new Date(id);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
});
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="card-title">
        <h5>
          訂單編號: {{ id }}<span>created time: {{ createTime }}</span>
        </h5>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">品項</th>
              <th scope="col">數量</th>
              <th scope="col">小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.count }}</td>
              <td>{{ item.price * item.count }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="remark" class="text-end">
          備註: <span>{{ remark }}</span>
        </div>
        <div class="text-end">
          <h5>
            總計: <span>${{ total }}</span>
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-title {
  h5 {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    span {
      color: #666;
      font-size: 16px;
    }
  }
}
</style>
