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
  console.log(editTemp.value.stock);
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
      stock: ''
    };
  }
};
const cancelHandler = (item) => {
  item.isEdit = false;
};
</script>

<template>
  <div class="container">
    <h2>Week1 Homework</h2>
    <table>
      <thead>
        <tr>
          <th scope="col" v-for="(item, index) in thead" :key="item">
            {{ item }}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tbody" :key="item.id">
          <td v-if="!item.isEdit">{{ item.name }}</td>
          <td v-else><input type="text" v-model="editTemp.name" /></td>

          <td v-if="!item.isEdit">
            <small>{{ item.description }}</small>
          </td>
          <td v-else>
            <small><input type="text" v-model="editTemp.description" /></small>
          </td>

          <td v-if="!item.isEdit">{{ item.price }}</td>
          <td v-else><input type="text" v-model="editTemp.price" /></td>

          <td>
            <button type="button" @click="minusHandler" :disabled="!item.isEdit">-</button>
            <span class="stock">{{ item.isEdit ? editTemp.stock : item.stock }}</span>
            <button type="button" @click="addHandler" :disabled="!item.isEdit">+</button>
          </td>
          <td>
            <div class="button-group">
              <button type="button" @click="editHandler(item)">
                {{ !item.isEdit ? '編輯' : '儲存' }}
              </button>
              <button type="button" @click="cancelHandler(item)" :disabled="!item.isEdit">
                取消
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: min(100%, 800px);
  margin: 0 auto;
}
h2 {
  color: #666;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
}
table {
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  table-layout: fixed;
  thead {
    color: #fff;
    background-color: #7f7f9b;
    border-bottom: 1px solid #000;
  }
  tbody {
    tr {
      &:nth-of-type(odd) {
        background-color: #fff;
      }
      &:nth-of-type(even) {
        background-color: #eee;
      }
      &:last-child {
        td {
          &:first-child {
            border-bottom-left-radius: 10px;
          }
          &:last-child {
            border-bottom-right-radius: 10px;
          }
        }
      }
      td {
        height: 62px;
        vertical-align: middle;
      }
    }
  }
  th,
  td {
    padding: 15px;
    &:not(:nth-child(-n + 2)) {
      text-align: center;
      input {
        text-align: center;
      }
    }
    &:nth-child(-n + 2) {
      text-align: left;
    }
    &:nth-child(1) {
      width: 160px;
    }
    &:nth-child(3) {
      width: 80px;
    }
    &:nth-child(4) {
      width: 120px;
    }
    &:nth-child(5) {
      width: 140px;
    }
  }
  th {
    font-size: 18px;
    font-weight: bold;
    &:first-child {
      border-top-left-radius: 10px;
    }
    &:last-child {
      border-top-right-radius: 10px;
    }
  }
  input {
    width: 100%;
    height: 30px;
    font-size: 16px;
    border-radius: 6px;
    border: 2px solid #7f7f9b;
  }
  .button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  .stock {
    padding: 0 5px;
  }
}
</style>
