<!--
 * @Descripttion: 登录界面
 * @Author: huimeng
 * @Date: 2025-03-13 15:47:35
 * @LastEditors: huimeng
 * @LastEditTime: 2025-08-02 15:03:23
-->


<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">荣锋装饰后台管理系统</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <input
            v-model="form.username"
            type="text"
            required
            placeholder="用户名"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <input
            v-model="form.password"
            type="password"
            required
            placeholder="密码"
            class="form-input"
          />
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="login-button"
        >
          {{ loading ? '登录中...' : '登 录' }}
        </button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const form = ref({
  username: '',
  password: ''
})

const loading = ref(false)
const errorMessage = ref('')

const authStore = useAuthStore()

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await axios.post('/api/auth/login', {
      username: form.value.username,
      password: form.value.password
    }, {headers: { 'Content-Type': 'application/json'}})

    if (response.data.code === 200) {
      authStore.loginSuccess({
        token: response.data.data.token,
        username: response.data.data.username,
        role: response.data.data.role
      })
    } else {
      errorMessage.value = response.data.msg
    }
  } catch (error) {
    if (error.response && error.response.data.code === 500) {
      errorMessage.value = error.response.data.msg
    } else {
      errorMessage.value = '登录失败，请检查网络连接'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

.login-card {
  width: 100%;
  max-width: 480px;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.login-title {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 1.8rem;
  font-weight: 500;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-input {
  padding: 16px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1.1rem;
  transition: all 0.3s;
  height: 56px;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.login-button {
  padding: 16px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  height: 56px;
  letter-spacing: 1px;
}

.login-button:hover {
  background-color: #66b1ff;
  transform: translateY(-2px);
}

.login-button:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
  transform: none;
}

.error-message {
  color: #f56c6c;
  text-align: center;
  margin-top: 10px;
  font-size: 0.95rem;
}

@media (max-width: 480px) {
  .login-card {
    padding: 2rem 1.5rem;
    max-width: 90%;
  }

  .login-title {
    font-size: 1.5rem;
    margin-bottom: 1.8rem;
  }

  .form-input, .login-button {
    height: 52px;
    font-size: 1rem;
  }
}
</style>