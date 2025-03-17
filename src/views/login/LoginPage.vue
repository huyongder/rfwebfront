<!--
 * @Descripttion: 登录界面
 * @Author: huimeng
 * @Date: 2025-03-13 15:47:35
 * @LastEditors: huimeng
 * @LastEditTime: 2025-03-13 16:21:48
-->
<template>
  <el-form :model="loginForm" :rules="rules" ref="loginForm" class="login-container">
    <h3>系统登录</h3>
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
  </el-form>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      loginForm: { username: '', password: '' },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post('/api/login', this.loginForm)
            .then((res) => {
              localStorage.setItem('token', res.data.token) // 存储JWT[1](@ref)
              this.$router.push('/home') // 跳转到主页[3](@ref)
            })
            .catch(() => this.$message.error('登录失败'))
        }
      })
    },
  },
}
</script>
