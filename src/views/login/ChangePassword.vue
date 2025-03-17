<!--
 * @Descripttion:
 * @Author: huimeng
 * @Date: 2025-03-13 16:25:30
 * @LastEditors: huimeng
 * @LastEditTime: 2025-03-13 16:25:46
-->
<template>
  <el-dialog title="修改密码" v-model:visible="dialogVisible">
    <el-form :model="pwdForm" :rules="pwdRules" ref="pwdForm">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input type="password" v-model="pwdForm.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="pwdForm.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="pwdForm.confirmPassword"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="changePassword">提交</el-button>
  </el-dialog>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    const validateConfirm = (rule, value, callback) => {
      if (value !== this.pwdForm.newPassword) {
        callback(new Error('两次输入密码不一致'))
      } else callback()
    }
    return {
      dialogVisible: false,
      pwdForm: { oldPassword: '', newPassword: '', confirmPassword: '' },
      pwdRules: {
        oldPassword: [{ required: true, message: '必填项', trigger: 'blur' }],
        newPassword: [
          { required: true, message: '长度6-20位', min: 6, max: 20 },
          { pattern: /^(?=.*[A-Za-z])(?=.*\d).+$/, message: '需包含字母和数字' },
        ],
        confirmPassword: [{ validator: validateConfirm, trigger: 'blur' }],
      },
    }
  },
  methods: {
    changePassword() {
      this.$refs.pwdForm.validate((valid) => {
        if (valid) {
          axios
            .put('/api/user/password', this.pwdForm, {
              headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
            })
            .then(() => {
              this.$message.success('修改成功')
              this.dialogVisible = false
              this.$router.push('/login') // 跳转登录页[7](@ref)
            })
        }
      })
    },
  },
}
</script>
