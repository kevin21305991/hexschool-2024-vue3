<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const site = 'https://todolist-api.hexschool.io';

const isRegister = ref(false);
const isLogin = ref(true);

// 註冊
const emailSignUp = ref('');
const passwordSignUp = ref('');
const nickname = ref('');
const signUpError = ref([]);

const signUp = async () => {
  try {
    const response = await axios.post(`${site}/users/sign_up`, {
      email: emailSignUp.value,
      password: passwordSignUp.value,
      nickname: nickname.value
    });
    if (response.data.status) {
      toLogin();
    }
  } catch (error) {
    signUpError.value = error.response.data.message;
  }
};

// 登入
const nicknameSignIn = ref('');
const emailSignIn = ref('');
const passwordSignIn = ref('');
const token = ref('');
const loginError = ref('');

const signIn = async () => {
  try {
    const signInRes = await axios.post(`${site}/users/sign_in`, {
      email: emailSignIn.value,
      password: passwordSignIn.value
    });
    const checkoutRes = await axios.get(`${site}/users/checkout`, {
      headers: {
        Authorization: signInRes.data.token
      }
    });
    nicknameSignIn.value = checkoutRes.data.nickname;
    token.value = signInRes.data.token;
    // 存 Cookie
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.cookie = `hexschoolTodo=${token.value}; expires=${tomorrow.toUTCString()}`;
    getTodos();
  } catch (error) {
    loginError.value = error.response.data.message;
  }
};

// 登出
const signOut = async () => {
  try {
    const response = await axios.post(
      `${site}/users/sign_out`,
      {},
      {
        headers: {
          Authorization: token.value
        }
      }
    );
    console.log(response.data);
    token.value = '';
    document.cookie = 'hexschoolTodo=;max-age=0;';
  } catch (error) {
    console.log(error);
  }
};

// Todo list
const todos = ref([]);
const newTodo = ref('');
const todoEdit = ref({});

const getTodos = async () => {
  const response = await axios.get(`${site}/todos`, {
    headers: {
      Authorization: token.value
    }
  });
  todos.value = response.data.data;
};

const addTodo = async () => {
  if (!newTodo.value) return;
  const todo = {
    content: newTodo.value
  };
  await axios.post(`${site}/todos`, todo, {
    headers: {
      Authorization: token.value
    }
  });
  newTodo.value = '';
  getTodos();
};

const deleteTodo = async (id) => {
  await axios.delete(`${site}/todos/${id}`, {
    headers: {
      Authorization: token.value
    }
  });
  getTodos();
};

const updateTodo = async (id) => {
  const todo = todos.value.find((todo) => todo.id === id);
  todo.content = todoEdit.value[id];
  await axios.put(`${site}/todos/${id}`, todo, {
    headers: {
      Authorization: token.value
    }
  });
  getTodos();
  todoEdit.value = {
    ...todoEdit.value,
    [id]: ''
  };
};

const toggleStatus = async (id) => {
  await axios.patch(
    `${site}/todos/${id}/toggle`,
    {},
    {
      headers: {
        Authorization: token.value
      }
    }
  );
  getTodos();
};

const updateTodoEdit = (event, id) => {
  todoEdit.value = {
    ...todoEdit.value,
    [id]: event.target.value
  };
};

const TodoToken = document.cookie
  .split('; ')
  .find((row) => row.startsWith('hexschoolTodo='))
  ?.split('=')[1];

const toRegister = () => {
  isRegister.value = true;
  isLogin.value = false;
};

const toLogin = () => {
  isRegister.value = false;
  isLogin.value = true;
};

onMounted(async () => {
  if (TodoToken) {
    token.value = TodoToken;
    const checkout = await axios.get(`${site}/users/checkout`, {
      headers: {
        Authorization: TodoToken
      }
    });
    nicknameSignIn.value = checkout.data.nickname;
    getTodos();
  }
});
</script>

<template>
  <!-- 註冊 -->
  <h2>Week2 Homework</h2>
  <template v-if="isRegister">
    <div class="auth-contain">
      <div class="inner">
        <h3>REGISTER</h3>
        <div class="form-group">
          <label for="register-email">Email</label>
          <input id="register-email" v-model="emailSignUp" placeholder="請輸入電子信箱" />
        </div>
        <div class="form-group">
          <label for="register-password">Password</label>
          <input
            id="register-password"
            v-model="passwordSignUp"
            placeholder="請設定最少六位數的密碼"
            type="password"
          />
        </div>
        <div class="form-group">
          <label for="register-nickname">Nickname</label>
          <input id="register-nickname" v-model="nickname" placeholder="請設定暱稱" type="text" />
        </div>
        <ul v-if="signUpError.length > 0" class="error-msg">
          <li v-for="item in signUpError" :key="item">{{ item }}</li>
        </ul>
        <button class="submit-btn" @click="signUp">註冊</button>
        <p class="tips">
          已經有帳號了嗎？ <a href="javascript:;" @click.prevent="toLogin">登入</a>
        </p>
      </div>
    </div>
  </template>

  <!-- 登入 -->
  <template v-if="isLogin && !token">
    <div class="auth-contain">
      <div class="inner">
        <h3>LOGIN</h3>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="emailSignIn" placeholder="請輸入電子信箱" type="email" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" v-model="passwordSignIn" placeholder="請輸入密碼" type="password" />
        </div>
        <ul v-if="typeof loginError === 'string' && loginError" class="error-msg">
          <li>{{ loginError }}</li>
        </ul>
        <ul v-else-if="typeof loginError !== 'string' && loginError" class="error-msg">
          <li v-for="item in loginError" :key="item">{{ item }}</li>
        </ul>
        <button class="submit-btn" @click="signIn">登入</button>
        <p class="tips">
          尚未擁有帳號? <a href="javascript:;" @click.prevent="toRegister">註冊</a>
        </p>
      </div>
    </div>
  </template>

  <template v-if="token">
    <div class="todo-list">
      <div class="inner">
        <div class="header">
          <h3>【 {{ nicknameSignIn }} 】的待辦事項</h3>
          <button type="button" class="logout-btn" @click="signOut">登出</button>
        </div>
        <div class="add-new">
          <input v-model="newTodo" placeholder="New Todo" />
          <button type="button" @click="addTodo">新增</button>
        </div>
        <ul>
          <li v-for="(todo, index) in todos" :key="index">
            <input type="checkbox" :checked="todo.status" @change="toggleStatus(todo.id)" />
            <p :class="['todo', { complete: todo.status }]">{{ todo.content }}</p>
            <input type="text" placeholder="更新值" @change="updateTodoEdit($event, todo.id)" />
            <button type="button" @click="deleteTodo(todo.id)">刪除</button>
            <button type="button" @click="updateTodo(todo.id)">更新</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
</template>

<style lang="scss" scoped>
h2 {
  color: #666;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
}
.auth-contain {
  width: min(90%, 400px);
  margin: 0 auto;
  .inner {
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    background-color: rgba(202, 202, 202, 0.5);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  h3 {
    font-size: 30px;
    margin-bottom: 30px;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    &:not(:first-child) {
      margin-top: 10px;
    }
    label {
      text-align: left;
      margin-bottom: 5px;
    }
    input {
      border: none;
      padding: 6px 8px;
      border-radius: 6px;
      color: #fff;
      font-size: 16px;
      background-color: rgba(#7f7f9b, 0.7);
      &::placeholder {
        color: #ccc;
      }
    }
  }
  .error-msg {
    color: red;
    text-align: right;
    margin-top: 10px;
    > li {
      &:not(:first-child) {
        margin-top: 10px;
      }
    }
  }
  .submit-btn {
    font-size: 18px;
    margin-top: 15px;
  }
  .tips {
    color: #838383;
    padding-top: 15px;
    margin-top: 15px;
    border-top: 1px solid rgba(0, 0, 0, 0.5);
  }
}
.todo-list {
  width: min(90%, 600px);
  margin: 0 auto;
  .inner {
    padding: 20px;
    border-radius: 10px;
    background-color: rgba(202, 202, 202, 0.5);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    ul {
      > li {
        display: flex;
        align-items: center;
        gap: 5px;
        .todo {
          flex: 1;
          &.complete {
            text-decoration: line-through;
          }
        }
        input[type='text'] {
          width: 150px;
        }
      }
    }
    input {
      height: 30px;
      font-size: 16px;
      border-radius: 6px;
      border: 2px solid #7f7f9b;
    }
    button {
      display: flex;
      align-items: center;
      &:not(.logout-btn) {
        height: 30px;
      }
    }
  }
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    h3 {
      font-size: 30px;
    }
    .logout-btn {
      font-size: 18px;
      margin-left: auto;
    }
  }
  .add-new {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    padding-bottom: 10px;
    margin-bottom: 10px;
    input {
      flex: 1;
    }
  }
}
</style>
