<!--
 * @Descripttion:投诉与建议
 * @Author: huimeng
 * @Date: 2025-02-26 08:23:28
 * @LastEditors: huimeng
 * @LastEditTime: 2025-08-07 16:03:12
-->

<template>
  <HeaderBanner />
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
              accept="image/*"
              capture="camera"
            >
              <i class="el-icon-plus"></i>
              <template #tip>
                <div class="el-upload__tip">
                  最多上传3张图片，每张不超过5MB
                </div>
              </template>
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
  <FooterComp />
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import axios from 'axios'
import { onBeforeUnmount, onMounted } from 'vue'
import SuggestionsNav from '@/components/NavComp/SuggestionsNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue'
import FooterComp from '@/components/FooterComp.vue'

export default {
  components: {
    SuggestionsNav,
    HeaderBanner,
    FooterComp,
  },
  setup() {
    const formRef = ref(null)
    // 表单数据
    const form = ref({
      name: '',
      phone: '',
      address: '',
      type: '业主投诉',
      images: [], // 存储上传的图片文件
      description: '',
    })
    const isFormDirty = ref(false) // 标记表单是否被修改过

    // 手机号验证规则
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('手机号不能为空'))
      } else if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }

    // 表单验证规则
    const rules = {
      name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
      phone: [
        { required: true, message: '手机号不能为空', trigger: 'blur' },
        { validator: validatePhone, trigger: 'blur' },
      ],
      address: [{ required: true, message: '小区信息不能为空', trigger: 'blur' }],
      description: [{ required: true, message: '问题描述不能为空', trigger: 'blur' }],
    }

    // 处理文件变化
    const handleFileChange = (file, fileList) => {
      // 检查文件类型
      const isImage = file.raw && file.raw.type.startsWith('image/')
      if (!isImage) {
        ElMessage.error('只能上传图片文件')
        return false
      }

      // 检查文件大小 (限制5MB)
      const isLt5M = file.raw.size / 1024 / 1024 < 5
      if (!isLt5M) {
        ElMessage.error('图片大小不能超过5MB')
        return false
      }

      form.value.images = fileList.slice(-3) // 限制最多3个文件
      isFormDirty.value = fileList.length > 0
      return true
    }

    // 提交表单
    const submitForm = async () => {
      try {
        // 先进行表单验证
        await formRef.value.validate()

        // 创建FormData对象用于文件上传
        const formData = new FormData()

        // 构造投诉DTO对象
        const complaintDTO = {
          name: form.value.name,
          phone: form.value.phone,
          address: form.value.address,
          type: form.value.type,
          description: form.value.description,
        }

        // 将DTO对象转为JSON Blob并添加到FormData
        formData.append(
          'complaintDTO',
          new Blob([JSON.stringify(complaintDTO)], {
            type: 'application/json',
          }),
        )

        // 添加上传的文件
        if (form.value.images && form.value.images.length > 0) {
          form.value.images.forEach((file) => {
            formData.append('files', file.raw)
          })
        }

        // 发送请求到后端
        const response = await axios.post('/api/complaints', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        // 处理成功响应
        if (response.status === 200 || response.data.success == true) {
          ElMessage.success('提交成功！我们将尽快联系您')
          formRef.value.resetFields()
          form.value.images = []
          isFormDirty.value = false
        }
      } catch (error) {
        console.error('提交失败：', error)
        ElMessage.error(error.response?.data?.message || '提交失败，请检查表单')
      }
    }

    // 页面加载时添加beforeunload事件监听
    onMounted(() => {
      window.addEventListener('beforeunload', handleBeforeUnload)
    })

    // 处理页面关闭前的检查
    const handleBeforeUnload = (event) => {
      if (isFormDirty.value) {
        event.preventDefault()
        event.returnValue = ''
      }
    }

    // 页面卸载前移除事件监听
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
/* 默认的布局（大屏幕 - PC端） */
.suggestions-page {
  display: flex;
  min-height: 80vh;
  margin: 0;
  padding: 0;
  flex-direction: row;
}

.suggestions-page-left {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.suggestions-page-left-content {
  width: 100%;
  max-width: 678px;
  padding: 20px;
}

.suggestions-page-left-content p {
  margin-bottom: 15px;
  line-height: 1.6;
  font-size: 16px;
}

.suggestions-page-left-content img {
  width: 100%;
  max-width: 678px;
  height: auto;
  display: block;
  margin-top: 20px;
}

.suggestions-page-right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.complaint-form {
  width: 100%;
  max-width: 678px;
  background-color: #fff;
  padding: 30px;
  border-radius: 4px;
}

.el-form-item {
  margin-bottom: 22px;
}

.el-form-item:last-child {
  margin-bottom: 0;
}

.el-upload__tip {
  font-size: 12px;
  color: #999;
  margin-top: 8px;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .suggestions-page {
    flex-direction: column;
    width: 100vw;
    overflow-x: hidden;
    padding: 0;
    margin: 0;
  }

  .suggestions-page-left,
  .suggestions-page-right {
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .suggestions-page-left-content {
    padding: 15px;
    box-sizing: border-box;
  }

  .suggestions-page-left-content p {
    font-size: 14px;
    margin-bottom: 12px;
  }

  .complaint-form {
    padding: 15px;
    width: 100%;
    max-width: 100%;
    border-radius: 0;
  }

  /* 表单元素重置 */
  :deep(.el-form) {
    width: 100%;
  }

  :deep(.el-form-item) {
    display: block;
    margin-bottom: 18px;
  }

  :deep(.el-form-item__label) {
    width: 100% !important;
    text-align: left !important;
    float: none !important;
    display: block;
    margin-bottom: 6px;
    padding: 0 !important;
    line-height: 1.5;
    font-size: 14px !important;
  }

  :deep(.el-form-item__content) {
    margin-left: 0 !important;
    width: 100% !important;
  }

  :deep(.el-input),
  :deep(.el-textarea),
  :deep(.el-radio-group),
  :deep(.el-upload) {
    width: 100% !important;
  }

  :deep(.el-input__inner),
  :deep(.el-textarea__inner) {
    width: 100% !important;
    max-width: 100% !important;
    font-size: 14px !important;
  }

  /* 上传组件调整 */
  :deep(.el-upload-list--picture-card) {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -5px;
  }

  :deep(.el-upload-list--picture-card .el-upload-list__item) {
    width: calc(33.33% - 10px) !important;
    height: calc(33.33vw - 10px) !important;
    margin: 5px;
  }

  :deep(.el-upload--picture-card) {
    width: calc(33.33% - 10px) !important;
    height: calc(33.33vw - 10px) !important;
    line-height: calc(33.33vw - 10px) !important;
    margin: 5px;
  }

  :deep(.el-upload-list--picture-card .el-upload-list__item-thumbnail) {
    object-fit: cover;
  }

  /* 单选按钮组调整 */
  :deep(.el-radio-group) {
    display: flex;
    flex-direction: column;
  }

  :deep(.el-radio) {
    margin-bottom: 8px;
    margin-right: 0 !important;
  }

  :deep(.el-radio:last-child) {
    margin-bottom: 0;
  }

  :deep(.el-radio__label) {
    font-size: 14px !important;
  }

  /* 解决iOS设备点击问题 */
  :deep(.el-upload) {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  :deep(.el-upload--picture-card) {
    -webkit-touch-callout: none;
  }

  /* 全局宽度限制 */
  * {
    max-width: 100%;
    box-sizing: border-box;
  }
}
</style>