<!--
 * @Descripttion:
 * @Author: huimeng
 * @Date: 2025-03-08 08:23:55
 * @LastEditors: huimeng
 * @LastEditTime: 2025-03-08 08:29:14
-->
<template>
  <div>
    <input type="file" @change="handleFileChange" accept="image/*" />
    <button @click="uploadImage" :disabled="!file">上传图片</button>
    <p v-if="loading">上传中...</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      file: null, // 存储用户选择的文件
      loading: false, // 上传状态
      error: null, // 错误信息
    };
  },
  methods: {
    // 处理文件选择
    handleFileChange(event) {
      this.file = event.target.files[0]; // 获取用户选择的文件
    },
    // 上传图片
    async uploadImage() {
      if (!this.file) {
        this.error = '请先选择一张图片';
        return;
      }

      this.loading = true;
      this.error = null;

      const formData = new FormData();
      formData.append('file', this.file); // 将文件添加到FormData中，键名为'file'

      try {
        const response = await axios.post('http://localhost:8080/api/upload/newsimage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // 设置请求头为multipart/form-data
          },
        });
        console.log('上传成功，返回值:', response.data); // 在控制台输出返回值
      } catch (error) {
        this.error = '上传失败: ' + (error.response?.data?.message || error.message);
        console.error('上传失败:', error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

input[type="file"] {
  margin-top: 10px;
}
</style>
