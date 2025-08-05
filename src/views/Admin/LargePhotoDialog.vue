<!--
 * @Descripttion: 首页大图修改界面
 * @Author: huimeng
 * @Date: 2025-07-12 09:42:35
 * @LastEditors: huimeng
 * @LastEditTime: 2025-07-29 09:53:34
-->
<template>
  <div class="photo-manager">
    <h2>首页大图管理</h2>

    <!-- 上传区域 -->
    <div class="upload-section">
      <input
        type="file"
        ref="fileInput"
        @change="handleFileChange"
        accept="image/jpeg, image/png, image/gif"
        style="display: none"
      />
      <button @click="triggerFileInput" class="upload-button">
        <span>上传新图片</span>
      </button>
      <div v-if="uploading" class="upload-status">上传中...</div>
      <div v-if="uploadSuccess" class="success-message">{{ uploadSuccess }}</div>
      <div v-if="uploadError" class="error-message">{{ uploadError }}</div>
    </div>

    <!-- 图片列表 -->
    <div class="photo-list">
      <div v-for="(photo, index) in photos" :key="photo.filename" class="photo-item">
        <div class="photo-container">
          <img :src="photo.url" :alt="photo.filename" class="photo-image" />
          <div class="photo-info">
            <div>文件名: {{ photo.filename }}</div>
            <div>大小: {{ formatFileSize(photo.size) }}</div>
          </div>
          <button @click="deletePhoto(photo.filename, index)" class="delete-button">删除</button>
        </div>
      </div>

      <div v-if="deleteSuccess" class="success-message">{{ deleteSuccess }}</div>
      <div v-if="deleteError" class="error-message">{{ deleteError }}</div>

      <div v-if="loading" class="loading-indicator">加载中...</div>
      <div v-if="photos.length === 0 && !loading" class="empty-message">暂无图片，请上传</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const PHOTO_TYPE = 'largePhoto' // 对应后端的大图类型
const API_BASE_URL = '/api/upload' // 使用代理的API路径

// 状态管理
const photos = ref([])
const loading = ref(false)
const uploading = ref(false)
const uploadSuccess = ref('')
const uploadError = ref('')
const deleteSuccess = ref('')
const deleteError = ref('')
const fileInput = ref(null)

// 获取图片列表
const fetchPhotos = async () => {
  try {
    loading.value = true
    const response = await axios.get(API_BASE_URL, {
      params: { type: PHOTO_TYPE },
    })
    photos.value = response.data
    console.log('获取图片列表成功:', photos.value)
  } catch (error) {
    console.error('获取图片列表失败:', error)
    uploadError.value = '获取图片列表失败，请检查网络或服务器状态'
    setTimeout(() => { uploadError.value = '' }, 3000)
  } finally {
    loading.value = false
  }
}

// 上传图片
const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // 验证文件类型
  const validTypes = ['image/jpeg', 'image/png', 'image/gif']
  if (!validTypes.includes(file.type)) {
    uploadError.value = '只支持 JPG, PNG, GIF 格式的图片'
    setTimeout(() => { uploadError.value = '' }, 3000)
    return
  }

  // 验证文件大小 (例如限制5MB)
  if (file.size > 5 * 1024 * 1024) {
    uploadError.value = '图片大小不能超过5MB'
    setTimeout(() => { uploadError.value = '' }, 3000)
    return
  }

  try {
    uploading.value = true
    uploadError.value = ''
    uploadSuccess.value = ''

    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', PHOTO_TYPE)

    const response = await axios.post(API_BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
         authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })

    // 添加到列表顶部
    photos.value.unshift(response.data)
    uploadSuccess.value = '上传成功'
    setTimeout(() => { uploadSuccess.value = '' }, 3000)

    // 重置文件输入
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  } catch (error) {
    console.error('上传失败:', error)
    uploadError.value = '上传失败: ' + (error.response?.data?.message || error.message)
    setTimeout(() => { uploadError.value = '' }, 3000)
  } finally {
    uploading.value = false
  }
}

// 删除图片
const deletePhoto = async (filename, index) => {
  if (!confirm('确定要删除这张图片吗？')) return

  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_BASE_URL}/${filename}`, {
      params: { type: PHOTO_TYPE },
      headers: { Authorization: `Bearer ${token}` }
    })
    photos.value.splice(index, 1)
    deleteSuccess.value = '删除成功'
    setTimeout(() => { deleteSuccess.value = '' }, 3000)
  } catch (error) {
    console.error('删除失败:', error)
    deleteError.value = '删除失败: ' + (error.response?.data?.message || error.message)
    setTimeout(() => { deleteError.value = '' }, 3000)
  }
}

// 辅助方法
const triggerFileInput = () => {
  fileInput.value?.click()
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 初始化加载
onMounted(() => {
  fetchPhotos()
})
</script>

<style scoped>
.photo-manager {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.upload-section {
  margin-bottom: 30px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.upload-button:hover {
  background-color: #45a049;
}

.upload-status {
  margin-top: 10px;
  color: #666;
}

.success-message {
  margin-top: 10px;
  color: #4caf50;
  font-size: 14px;
}

.error-message {
  margin-top: 10px;
  color: #d32f2f;
  font-size: 14px;
}

.photo-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.photo-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.photo-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.photo-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.photo-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.photo-info {
  padding: 10px;
  background-color: #f9f9f9;
  flex-grow: 1;
}

.photo-info div {
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
}

.delete-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 0;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #d32f2f;
}

.loading-indicator,
.empty-message {
  text-align: center;
  padding: 20px;
  color: #666;
  grid-column: 1 / -1;
}
</style>