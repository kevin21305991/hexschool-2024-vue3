<script setup>
import { ref, computed } from 'vue';
import ProductItem from '@/components/ProductItem.vue';
import OrderedProduct from '@/components/OrderedProduct.vue';

const products = ref([
  {
    id: 1,
    name: '珍珠奶茶',
    description: '香濃奶茶搭配QQ珍珠',
    price: 50
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    description: '清新冬瓜配上新鮮檸檬',
    price: 45
  },
  {
    id: 3,
    name: '翡翠檸檬',
    description: '綠茶與檸檬的完美結合',
    price: 55
  },
  {
    id: 4,
    name: '四季春茶',
    description: '香醇四季春茶，回甘無比',
    price: 45
  },
  {
    id: 5,
    name: '阿薩姆奶茶',
    description: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50
  },
  {
    id: 6,
    name: '檸檬冰茶',
    description: '檸檬與冰茶的清新組合',
    price: 45
  },
  {
    id: 7,
    name: '芒果綠茶',
    description: '芒果與綠茶的獨特風味',
    price: 55
  },
  {
    id: 8,
    name: '抹茶拿鐵',
    description: '抹茶與鮮奶的絕配',
    price: 60
  }
]);
const cart = ref([]);
const remark = ref('');
const order = ref({});

const addCart = (product) => {
  order.value = {};
  cart.value.push({
    ...product,
    count: 1
  });
};

const removeCart = (product) => {
  cart.value = cart.value.filter((item) => item !== product);
};

const total = computed(() => {
  return cart.value.reduce((prev, item) => prev + item.price * item.count, 0);
});

const submitHandler = () => {
  order.value = {
    id: new Date().getTime(),
    cart: cart.value,
    remark: remark.value,
    total: total.value
  };
  cart.value = [];
  remark.value = '';
};

const cartIsEmpty = computed(() => {
  return cart.value.length <= 0;
});
</script>

<template>
  <div id="root">
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-4">
          <div class="list-group">
            <ProductItem
              v-for="item in products"
              :key="item.id"
              :data="item"
              :addCart="
                () => {
                  addCart(item);
                }
              "
            />
          </div>
        </div>
        <div class="col-md-8">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" width="50">操作</th>
                <th scope="col">品項</th>
                <th scope="col">描述</th>
                <th scope="col" width="90">數量</th>
                <th scope="col">單價</th>
                <th scope="col">小計</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="!cartIsEmpty">
                <OrderedProduct
                  v-for="item in cart"
                  :key="item.id"
                  :data="item"
                  :removeCart="
                    () => {
                      removeCart(item);
                    }
                  "
                  v-model="item.count"
                />
              </template>
            </tbody>
          </table>
          <div v-if="cartIsEmpty" class="alert alert-primary text-center" role="alert">
            請選擇商品
          </div>
          <div v-if="!cartIsEmpty" class="text-end mb-3">
            <h5>
              總計: <span>${{ total }}</span>
            </h5>
          </div>
          <textarea
            v-if="!cartIsEmpty"
            class="form-control mb-3"
            rows="3"
            placeholder="備註"
            v-model="remark"
          ></textarea>
          <div v-if="!cartIsEmpty" class="text-end">
            <button class="btn btn-primary" @click="submitHandler">送出</button>
          </div>
        </div>
      </div>
      <hr />
      <div class="row justify-content-center">
        <div class="col-8">
          <div v-if="!order.id" class="alert alert-secondary text-center" role="alert">
            尚未建立訂單
          </div>
          <div v-else class="card">
            <div class="card-body">
              <div class="card-title">
                <h5>訂單</h5>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">品項</th>
                      <th scope="col">數量</th>
                      <th scope="col">小計</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in order.cart" :key="item.id">
                      <td>{{ item.name }}</td>
                      <td>{{ item.count }}</td>
                      <td>{{ item.price * item.count }}</td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="order.remark" class="text-end">
                  備註: <span>{{ order.remark }}</span>
                </div>
                <div class="text-end">
                  <h5>
                    總計: <span>${{ order.total }}</span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
