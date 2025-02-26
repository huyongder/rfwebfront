<!--
 * @Descripttion:投诉与建议
 * @Author: huimeng
 * @Date: 2025-02-26 08:23:28
 * @LastEditors: huimeng
 * @LastEditTime: 2025-02-26 09:53:40
-->

<template>
  <SuggestionsNav />
  <div class="suggestions-page">
    <!-- 左侧部分，包含图片 -->
    <div class="suggestions-page-left">
      <div class="suggestions-page-left-content">
        <p>请认真填写下面相关信息，我们收到信息会第一时间通过手机号与您取得联系！</p>
        <p style="color: red">[我们承诺保密每一位客户隐私信息!]</p>
        <p>1、业主投诉：工地质量问题、进度问题、工作人员不作为等装修工地问题反馈。</p>
        <p>2、 廉洁监督投诉：索要回扣、吃拿卡要、贪污受贿、严重违规等不正之风投诉。</p>
        <img src="/src/public/suggestion.jpg" alt="" />
      </div>
    </div>

    <!-- 右侧部分，包含投诉表单 -->
    <div class="suggestions-page-right">
      <div class="complaint-form">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
          <!-- 姓名 -->
          <el-form-item label="您的姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>

          <!-- 手机号 -->
          <el-form-item label="您的手机号" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>

          <!-- 小区信息 -->
          <el-form-item label="小区名及户号" prop="address">
            <el-input v-model="form.address" placeholder="例如: 阳光小区A栋1002"></el-input>
          </el-form-item>

          <!-- 投诉类型 -->
          <el-form-item label="投诉类型" prop="type">
            <el-radio-group v-model="form.type">
              <el-radio label="业主投诉">业主投诉</el-radio>
              <el-radio label="廉洁监督投诉">廉洁监督投诉</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 图片上传 -->
          <el-form-item label="上传相关图">
            <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :on-change="handleFileChange"
              :file-list="form.images"
              multiple
              :limit="3"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>

          <!-- 问题描述 -->
          <el-form-item label="问题描述" prop="description">
            <el-input
              type="textarea"
              v-model="form.description"
              :rows="4"
              placeholder="请详细描述问题"
            ></el-input>
          </el-form-item>

          <!-- 提交按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import axios from 'axios'
import { onBeforeUnmount, onMounted } from 'vue'
import SuggestionsNav from '@/components/NavComp/SuggestionsNav.vue'

export default {
  components: {
    SuggestionsNav,
  },
  setup() {
    const formRef = ref(null)
    const form = ref({
      name: '',
      phone: '',
      address: '',
      type: '业主投诉',
      images: [],
      description: '',
    })
    const isFormDirty = ref(false)  // 用来检查表单是否被修改

    // 手机号验证规则
    const validatePhone = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }

    const rules = {
      name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
      phone: [
        { required: true, message: '手机号不能为空', trigger: 'blur' },
        { validator: validatePhone, trigger: 'blur' },
      ],
      address: [{ required: true, message: '小区信息不能为空', trigger: 'blur' }],
      description: [{ required: true, message: '问题描述不能为空', trigger: 'blur' }],
    }

    const handleFileChange = (file, fileList) => {
      form.value.images = fileList.slice(-3) // 限制最多3个文件
      isFormDirty.value = true
    }

    const submitForm = async () => {
      try {
        await formRef.value.validate()
        const formData = new FormData()
        formData.append('name', form.value.name)
        formData.append('phone', form.value.phone)
        formData.append('address', form.value.address)
        formData.append('type', form.value.type)
        formData.append('description', form.value.description)
        form.value.images.forEach((file) => {
          formData.append('files', file.raw)
        })

        const response = await axios.post('/api/complaints', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })

        if (response.data.success) {
          ElMessage.success('提交成功！我们将尽快联系您')
          formRef.value.resetFields()
          isFormDirty.value = false  // 表单已提交，设置为未修改状态
        }
      } catch (error) {
        console.error('提交失败：', error)
        ElMessage.error('提交失败，请检查表单')
      }
    }

    // 在页面卸载时，检查表单是否已被修改，若未提交，提醒用户
    onMounted(() => {
      window.addEventListener('beforeunload', handleBeforeUnload)
    })

    const handleBeforeUnload = (event) => {
      if (isFormDirty.value) {
        event.preventDefault()
        event.returnValue = ''  // 在某些浏览器中需要这个
      }
    }

    onBeforeUnmount(() => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    })

    return {
      formRef,
      form,
      rules,
      handleFileChange,
      submitForm,
    }
  },
}
</script>

<style scoped>
/* 默认的布局（大屏幕） */
.suggestions-page {
  display: flex;
  min-height: 80vh;
  margin: 0;
  padding: 0;
  flex-direction: row; /* 默认横向布局 */
}

/* 当屏幕宽度小于 768px 时，改为上下布局 */
@media screen and (max-width: 768px) {
  .suggestions-page {
    flex-direction: column; /* 垂直排列 */
  }
  .suggestions-page-left,
  .suggestions-page-right {
    flex: none;
    width: 100%; /* 左右部分宽度占满屏幕 */
    padding: 10px; /* 调整内边距 */
  }
}

.suggestions-page-left {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px; /* 可以为左侧添加一些内边距 */
}

.suggestions-page-left-content img {
  max-width: 100%; /* 确保图片不会超过容器宽度 */
}

.suggestions-page-right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.complaint-form {
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px; /* 适当增加表单的内边距 */
}

.el-form-item {
  margin-bottom: 20px;
}
</style>
