<script setup>
import { ref } from 'vue';

const thead = ref(['品項', '描述', '價格', '庫存']);
const tbody = ref([
  {
    id: 1,
    name: '珍珠奶茶',
    description: '香濃奶茶搭配QQ珍珠',
    price: 50,
    stock: 20,
    isEdit: false
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    description: '清新冬瓜配上新鮮檸檬',
    price: 45,
    stock: 18,
    isEdit: false
  },
  {
    id: 3,
    name: '翡翠檸檬',
    description: '綠茶與檸檬的完美結合',
    price: 55,
    stock: 34,
    isEdit: false
  },
  {
    id: 4,
    name: '四季春茶',
    description: '香醇四季春茶，回甘無比',
    price: 45,
    stock: 10,
    isEdit: false
  },
  {
    id: 5,
    name: '阿薩姆奶茶',
    description: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50,
    stock: 25,
    isEdit: false
  },
  {
    id: 6,
    name: '檸檬冰茶',
    description: '檸檬與冰茶的清新組合',
    price: 45,
    stock: 20,
    isEdit: false
  },
  {
    id: 7,
    name: '芒果綠茶',
    description: '芒果與綠茶的獨特風味',
    price: 55,
    stock: 18,
    isEdit: false
  },
  {
    id: 8,
    name: '抹茶拿鐵',
    description: '抹茶與鮮奶的絕配',
    price: 60,
    stock: 20,
    isEdit: false
  }
]);
const editTemp = ref({
  id: null,
  name: '',
  description: '',
  price: '',
  stock: ''
});

const addHandler = () => {
  editTemp.value.stock++;
};
const minusHandler = () => {
  if (editTemp.value.stock >= 1) {
    editTemp.value.stock--;
  }
};
const editHandler = (item) => {
  if (!item.isEdit) {
    tbody.value.forEach((item) => {
      item.isEdit = false;
    });
    editTemp.value = { ...item };
    item.isEdit = true;
  } else {
    Object.keys(editTemp.value).forEach((key) => {
      item[key] = editTemp.value[key];
    });
    editTemp.value = {
      id: null,
      name: '',
      description: '',
      price: '',
      stock: '',
      isEdit: false
    };
  }
};
const cancelHandler = (item) => {
  item.isEdit = false;
};
</script>

<template>
  <h1>Week1</h1>
  <table>
    <thead>
      <tr>
        <th scope="col" v-for="item in thead" :key="item">{{ item }}</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in tbody" :key="item.id">
        <template v-if="!item.isEdit">
          <td>{{ item.name }}</td>
          <td>
            <small>{{ item.description }}</small>
          </td>
          <td>{{ item.price }}</td>
          <td>
            <button type="button" disabled>-</button>{{ item.stock
            }}<button type="button" disabled>+</button>
          </td>
          <td>
            <button type="button" @click="editHandler(item)">編輯</button>
            <button type="button" disabled>取消</button>
          </td>
        </template>
        <template v-else>
          <td><input type="text" v-model="editTemp.name" /></td>
          <td>
            <small><input type="text" v-model="editTemp.description" /></small>
          </td>
          <td><input type="text" v-model="editTemp.price" /></td>
          <td>
            <button type="button" @click="minusHandler(item)">-</button>{{ editTemp.stock
            }}<button type="button" @click="addHandler(item)">+</button>
          </td>
          <td>
            <button type="button" @click="editHandler(item)">儲存</button>
            <button type="button" @click="cancelHandler(item)">取消</button>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped></style>
