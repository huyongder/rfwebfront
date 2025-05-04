<!--
 * @Descripttion: 登录界面
 * @Author: huimeng
 * @Date: 2025-03-13 15:47:35
 * @LastEditors: huimeng
 * @LastEditTime: 2025-04-07 15:55:25
-->
<!-- <template>
  <el-form :model="form" :rules="rules" ref="formRef" class="login-container">
    <h3>系统登录</h3>
    <el-form-item prop="username">
      <el-input v-model="form.username" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-button type="primary" @click="handleSubmit">登录</el-button>
    <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const form = ref({ username: '', password: '' })
const formRef = ref(null)
const errorMsg = ref('')

// 登录逻辑
const handleSubmit = async () => {
  try {
    await authStore.login(form.value) // 调用 store 的登录方法
    router.push('/about/news') // 登录成功跳转
  } catch (error) {
    console.error('登录失败:', error)
    errorMsg.value = '用户名或密码错误'
  }
}
</script>

<style scoped>
.error-msg {
  color: #ff4d4d;
  margin-top: 10px;
}
</style> -->

<template>
  <el-form
    :model="form"
    :rules="rules"
    ref="formRef"
    class="login-container"
    @submit.prevent="handleSubmit"
  >
    <h3 class="title">系统登录</h3>

    <!-- 用户名 -->
    <el-form-item prop="username">
      <el-input
        v-model="form.username"
        placeholder="请输入用户名"
        prefix-icon="el-icon-user"
        :maxlength="20"
      >
        <template #suffix>
          <el-tooltip content="用户名格式：字母+数字，6-20位" placement="top">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
      </el-input>
    </el-form-item>

    <!-- 密码 -->
    <el-form-item prop="password">
      <el-input
        :type="showPwd ? 'text' : 'password'"
        v-model="form.password"
        placeholder="请输入密码"
        prefix-icon="el-icon-lock"
        :maxlength="16"
        show-password
      >
        <template #suffix>
          <el-button
            link
            @click="showPwd = !showPwd"
            :icon="showPwd ? 'el-icon-view' : 'el-icon-lock'"
          ></el-button>
        </template>
      </el-input>
    </el-form-item>

    <!-- 登录按钮 -->
    <el-form-item>
      <el-button type="primary" :loading="loading" :disabled="loading" @click="handleSubmit">
        登录
      </el-button>
    </el-form-item>

    <!-- 错误提示 -->
    <el-alert
      v-if="errorMsg"
      :title="errorMsg"
      type="error"
      show-icon
      :closable="false"
      class="error-alert"
    ></el-alert>
  </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const router = useRouter()
const formRef = ref(null)

// 表单数据（移除验证码字段）
const form = reactive({
  username: '',
  password: '',
})

// 验证规则（移除验证码校验）
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]+$/, message: '只能包含字母和数字', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
  ],
})

// 状态管理
const loading = ref(false)
const errorMsg = ref('')
const showPwd = ref(false)

// 生命周期钩子
onMounted(() => {
  if (authStore.token) {
    router.push('/dashboard')
  }
})

// 提交方法
const handleSubmit = async () => {
  try {
    await formRef.value.validate();
    loading.value = true;
    await authStore.login(form); // 等待登录接口完成
    ElMessage.success('登录成功');
    router.push('/dashboard'); // 确保在登录成功后跳转
  } catch (error) {
    // 错误类型判断
    if (error.response?.status === 400) {
      errorMsg.value = '用户名或密码格式错误'
    } else if (error.response?.status === 401) {
      errorMsg.value = '用户名或密码错误'
    } else {
      errorMsg.value = '登录失败，请稍后重试'
    }
    console.error('登录错误:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  max-width: 450px;
  margin: 100px auto;
  padding: 40px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 30px;
  color: #409eff;
}

.error-alert {
  margin-top: 20px;
  width: 100%;
}
</style>
