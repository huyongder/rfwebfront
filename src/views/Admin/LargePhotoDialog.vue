<!--
 * @Descripttion: 首页大图修改界面
 * @Author: huimeng
 * @Date: 2025-07-12 09:42:35
 * @LastEditors: huimeng
 * @LastEditTime: 2025-08-14 10:39:42
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
          <a :href="photo.link || 'javascript:void(0);'" target="_blank">
            <img :src="photo.url" :alt="photo.filename" class="photo-image" />
          </a>
          <div class="photo-info">
            <div>文件名: {{ photo.filename }}</div>
            <div>大小: {{ formatFileSize(photo.size) }}</div>
            <div class="link-info">
              <template v-if="!photo.isEditing">
                <span>跳转链接: {{ photo.link || '未设置' }}</span>
                <button @click="startEditing(photo)" class="edit-link-button">
                  {{ photo.link ? '编辑' : '添加' }}链接
                </button>
              </template>
              <template v-else>
                <input
                  v-model="photo.editLink"
                  type="text"
                  placeholder="输入跳转链接 (http:// 或 https://)"
                  class="inline-edit-input"
                  @keyup.enter="saveLink(photo)"
                  @blur="saveLink(photo)"
                  ref="linkInput"
                />
                <button @click="cancelEditing(photo)" class="cancel-button">
                  取消
                </button>
              </template>
            </div>
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
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'

const PHOTO_TYPE = 'largePhoto'
const API_BASE_URL = '/api/upload'
const LINK_API_URL = '/api/photo-links'

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
    // 获取图片列表
    const photosResponse = await axios.get(API_BASE_URL, {
      params: { type: PHOTO_TYPE },
    })

    // 获取链接信息
    const linksResponse = await axios.get(LINK_API_URL)
    const linksMap = linksResponse.data

    // 合并数据
    photos.value = photosResponse.data.map(photo => ({
      ...photo,
      link: linksMap[photo.filename] || null,
      isEditing: false,
      editLink: ''
    }))
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
    photos.value.unshift({
      ...response.data,
      link: null,
      isEditing: false,
      editLink: ''
    })
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

// 开始编辑链接
const startEditing = (photo) => {
  photo.isEditing = true
  photo.editLink = photo.link || ''
  nextTick(() => {
    document.querySelector('.inline-edit-input')?.focus()
  })
}

// 保存链接
const saveLink = async (photo) => {
  if (!photo.isEditing) return

  // 验证链接格式
  if (photo.editLink && !/^https?:\/\//.test(photo.editLink)) {
    alert('链接必须以http://或https://开头')
    return
  }

  // 检查链接是否实际发生变化
  if (photo.editLink === photo.link) {
    photo.isEditing = false
    return
  }

  try {
    const token = localStorage.getItem('token')
    const params = new URLSearchParams()
    params.append('filename', photo.filename)
    if (photo.editLink) params.append('link', photo.editLink)

    // 根据是否已有链接决定调用新增还是更新接口
    const apiUrl = photo.link ? `${LINK_API_URL}/update` : `${LINK_API_URL}/add`
    const response = await axios.post(apiUrl, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        authorization: `Bearer ${token}`
      }
    })

    if (response.data.success) {
      photo.link = photo.editLink || null
      photo.isEditing = false
      uploadSuccess.value = '链接保存成功'
      setTimeout(() => { uploadSuccess.value = '' }, 3000)
    } else {
      throw new Error(response.data.message || '操作失败')
    }
  } catch (error) {
    console.error('保存链接失败:', error)
    uploadError.value = error.response?.data?.message || error.message
    setTimeout(() => { uploadError.value = '' }, 3000)

    // 保存失败时保持编辑状态
    photo.isEditing = true
    nextTick(() => {
      document.querySelector('.inline-edit-input')?.focus()
    })
  }
}

// 取消编辑
const cancelEditing = (photo) => {
  photo.isEditing = false
  photo.editLink = ''
}

// 删除图片
const deletePhoto = async (filename, index) => {
  if (!confirm('确定要删除这张图片吗？')) return

  try {
    const token = localStorage.getItem('token')

    // 1. 删除图片
    await axios.delete(`${API_BASE_URL}/${filename}`, {
      params: { type: PHOTO_TYPE },
      headers: { Authorization: `Bearer ${token}` }
    })

    // 2. 删除链接（如果有）
    await axios.delete(`${LINK_API_URL}/${filename}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    // 从列表中移除
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

.link-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed #ddd;
}

.inline-edit-input {
  flex: 1;
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.edit-link-button {
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  white-space: nowrap;
}

.edit-link-button:hover {
  background-color: #f57c00;
}

.cancel-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  white-space: nowrap;
}

.cancel-button:hover {
  background-color: #d32f2f;
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