<template>
  <div class="manage-page">
    <h1>工地管理</h1>

    <div class="add-form">
      <h2>添加新工地</h2>
      <div>
        <label>标题:</label>
        <input v-model="newBuild.title" type="text">
      </div>

      <div>
        <label>封面图片:</label>
        <input type="file" @change="handleImageUpload" accept="image/*">
        <button @click="uploadImage" :disabled="!imageFile">上传图片</button>
        <span v-if="imageUrl">上传成功: {{ imageUrl }}</span>
      </div>

      <div>
        <label>视频文件:</label>
        <input type="file" @change="handleVideoUpload" accept="video/*">
        <button @click="uploadVideo" :disabled="!videoFile">上传视频</button>
        <span v-if="videoUrl">上传成功: {{ videoUrl }}</span>
      </div>

      <button @click="addBuild" :disabled="!newBuild.title || !newBuild.coverImage || !newBuild.videoPath">添加</button>
    </div>

    <div class="build-list">
      <h2>工地列表</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>标题</th>
            <th>封面图片</th>
            <th>视频路径</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in builds" :key="item.id">
            <td>{{ item.id }}</td>
            <td>
              <input v-if="item.id === editingId" v-model="editingBuild.title" type="text">
              <span v-else>{{ item.title }}</span>
            </td>
            <td>
              <img v-if="!item.id === editingId" :src="item.coverImage" alt="封面" style="width: 50px; height: 50px;">
              <div v-else>
                <input type="file" @change="handleEditImageUpload">
                <button @click="uploadEditImage">更新图片</button>
              </div>
            </td>
            <td>
              <span v-if="item.id !== editingId">{{ item.videoPath }}</span>
              <div v-else>
                <input type="file" @change="handleEditVideoUpload">
                <button @click="uploadEditVideo">更新视频</button>
              </div>
            </td>
            <td>
              <button v-if="item.id !== editingId" @click="startEdit(item)">编辑</button>
              <button v-else @click="saveEdit">保存</button>
              <button v-if="item.id !== editingId" @click="deleteBuild(item.id)">删除</button>
              <button v-else @click="cancelEdit">取消</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const builds = ref([]);
    const newBuild = ref({
      title: '',
      coverImage: '',
      videoPath: ''
    });
    const imageFile = ref(null);
    const videoFile = ref(null);
    const imageUrl = ref('');
    const videoUrl = ref('');
    const editingId = ref(null);
    const editingBuild = ref({});
    const editImageFile = ref(null);
    const editVideoFile = ref(null);

    const fetchBuilds = async () => {
      try {
        const response = await axios.get('/api/build/list', {
          params: {
            pageNum: 1,
            pageSize: 1000
          }
        });
        builds.value = response.data.records;
      } catch (error) {
        console.error('获取工地列表失败:', error);
      }
    };

    const handleImageUpload = (event) => {
      imageFile.value = event.target.files[0];
    };

    const handleVideoUpload = (event) => {
      videoFile.value = event.target.files[0];
    };

    const uploadImage = async () => {
      const formData = new FormData();
      formData.append('file', imageFile.value);
      formData.append('type', 'buildPhoto');

      try {
        const response = await axios.post('/api/upload', formData);
        imageUrl.value = response.data.url;
        newBuild.value.coverImage = response.data.url;
      } catch (error) {
        console.error('图片上传失败:', error);
      }
    };

    const uploadVideo = async () => {
      const formData = new FormData();
      formData.append('file', videoFile.value);
      formData.append('type', 'buildVideo');

      try {
        const response = await axios.post('/api/upload', formData);
        videoUrl.value = response.data.url;
        newBuild.value.videoPath = response.data.url;
      } catch (error) {
        console.error('视频上传失败:', error);
      }
    };

    const addBuild = async () => {
      try {
        await axios.post('/api/build/add', newBuild.value);
        fetchBuilds();
        resetForm();
      } catch (error) {
        console.error('添加工地失败:', error);
      }
    };

    const resetForm = () => {
      newBuild.value = {
        title: '',
        coverImage: '',
        videoPath: ''
      };
      imageFile.value = null;
      videoFile.value = null;
      imageUrl.value = '';
      videoUrl.value = '';
    };

    const startEdit = (item) => {
      editingId.value = item.id;
      editingBuild.value = { ...item };
    };

    const handleEditImageUpload = (event) => {
      editImageFile.value = event.target.files[0];
    };

    const handleEditVideoUpload = (event) => {
      editVideoFile.value = event.target.files[0];
    };

    const uploadEditImage = async () => {
      const formData = new FormData();
      formData.append('file', editImageFile.value);
      formData.append('type', 'buildPhoto');

      try {
        const response = await axios.post('/api/upload', formData);
        editingBuild.value.coverImage = response.data.url;
      } catch (error) {
        console.error('图片上传失败:', error);
      }
    };

    const uploadEditVideo = async () => {
      const formData = new FormData();
      formData.append('file', editVideoFile.value);
      formData.append('type', 'buildVideo');

      try {
        const response = await axios.post('/api/upload', formData);
        editingBuild.value.videoPath = response.data.url;
      } catch (error) {
        console.error('视频上传失败:', error);
      }
    };

    const saveEdit = async () => {
      try {
        await axios.post('/api/build/update', editingBuild.value);
        fetchBuilds();
        cancelEdit();
      } catch (error) {
        console.error('更新工地失败:', error);
      }
    };

    const cancelEdit = () => {
      editingId.value = null;
      editingBuild.value = {};
      editImageFile.value = null;
      editVideoFile.value = null;
    };

    const deleteBuild = async (id) => {
      try {
        await axios.delete(`/api/build/delete/${id}`);
        fetchBuilds();
      } catch (error) {
        console.error('删除工地失败:', error);
      }
    };

    onMounted(() => {
      fetchBuilds();
    });

    return {
      builds,
      newBuild,
      imageFile,
      videoFile,
      imageUrl,
      videoUrl,
      editingId,
      editingBuild,
      handleImageUpload,
      handleVideoUpload,
      uploadImage,
      uploadVideo,
      addBuild,
      startEdit,
      handleEditImageUpload,
      handleEditVideoUpload,
      uploadEditImage,
      uploadEditVideo,
      saveEdit,
      cancelEdit,
      deleteBuild
    };
  }
};
</script>

<style scoped>
.manage-page {
  padding: 20px;
}

.add-form {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.add-form div {
  margin-bottom: 15px;
}

.add-form label {
  display: inline-block;
  width: 100px;
}

.build-list table {
  width: 100%;
  border-collapse: collapse;
}

.build-list th, .build-list td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.build-list th {
  background-color: #f2f2f2;
}

.build-list tr:nth-child(even) {
  background-color: #f9f9f9;
}

button {
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
}
</style>