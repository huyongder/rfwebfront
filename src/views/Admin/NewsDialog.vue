<!--
 * @Descripttion:
 * @Author: huimeng
 * @Date: 2025-07-11 10:11:10
 * @LastEditors: huimeng
 * @LastEditTime: 2025-07-29 09:58:05
-->
<template>
  <div class="news-management-container">
    <div class="news-management">
      <h1>新闻管理</h1>

      <!-- 新闻列表 -->
      <div class="news-list-container">
        <div class="news-actions">
          <button @click="deleteSelected" class="delete-button">删除选中</button>
          <button @click="openEditDialog(null)" class="add-button">新增新闻</button>
        </div>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th class="checkbox-col"><input type="checkbox" v-model="selectAll" @change="toggleSelectAll"></th>
                <th class="id-col">序号</th>
                <th class="title-col">标题</th>
                <th class="time-col">创建时间</th>
                <th class="action-col">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(news, index) in newsList" :key="news.id">
                <td><input type="checkbox" v-model="selectedNews" :value="news.id"></td>
                <td>{{ index + 1 }}</td>
                <td>{{ news.title }}</td>
                <td>{{ formatDate(news.createTime) }}</td>
                <td>
                  <button @click="openEditDialog(news)" class="edit-button">编辑</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 编辑对话框 -->
      <div v-if="showEditDialog" class="edit-dialog-overlay">
        <div class="edit-dialog">
          <div class="dialog-header">
            <h2>{{ editingNews.id ? '编辑新闻' : '新增新闻' }}</h2>
            <button class="close-button" @click="closeEditDialog">×</button>
          </div>

          <div class="dialog-body">
            <div class="form-container">
              <div class="form-left">
                <div class="form-group">
                  <label>标题</label>
                  <input v-model="editingNews.title" type="text">
                </div>

                <div class="form-group">
                  <label>摘要</label>
                  <textarea v-model="editingNews.summary" rows="3"></textarea>
                </div>

                <div class="form-group">
                  <label>封面图片</label>
                  <div class="image-upload">
                    <input type="file" @change="handleCoverImageChange" accept="image/*" id="cover-upload">
                    <label for="cover-upload" class="upload-button">选择图片</label>
                    <span class="file-name" v-if="!editingNews.coverImage">未选择文件</span>
                    <span class="file-name" v-else>已选择: {{ editingNews.coverImage.split('/').pop() }}</span>
                  </div>
                  <img v-if="editingNews.coverImage" :src="editingNews.coverImage" class="cover-preview">
                </div>

                <div class="form-group">
                  <label>排序</label>
                  <input v-model="editingNews.sort" type="number" min="0">
                </div>
              </div>

              <div class="form-right">
                <div class="form-group">
                  <label>内容</label>
                  <div class="quill-editor-container">
                    <quill-editor
                      v-model:content="editingNews.content"
                      contentType="html"
                      :options="editorOptions"
                      @ready="onEditorReady"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="dialog-footer">
            <button @click="saveNews" class="save-button">保存</button>
            <button @click="closeEditDialog" class="cancel-button">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
  components: {
    QuillEditor
  },
  setup() {
    const newsList = ref([])
    const selectedNews = ref([])
    const selectAll = ref(false)
    const showEditDialog = ref(false)
    const editingNews = ref({
      id: null,
      title: '',
      summary: '',
      coverImage: '',
      content: '',
      sort: 0
    })

    // Quill 编辑器配置
    const editorOptions = {
      modules: {
        toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ],
          handlers: {
            image: imageHandler
          }
        }
      },
      placeholder: '请输入新闻内容...',
      theme: 'snow'
    }

    let quillInstance = null

    // 图片上传处理
    function imageHandler() {
      const token  = localStorage.getItem('token')
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.click()

      input.onchange = async () => {
        const file = input.files[0]
        if (!file) return

        try {
          const formData = new FormData()
          formData.append('file', file)

          const response = await fetch('/api/upload?type=newsPhoto', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formData
          })

          if (!response.ok) {
            throw new Error('上传失败')
          }

          const data = await response.json()
          const imageUrl = data.url

          const range = quillInstance.getSelection()
          quillInstance.insertEmbed(range.index, 'image', imageUrl)
          quillInstance.setSelection(range.index + 1)
        } catch (error) {
          console.error('图片上传失败:', error)
          alert('图片上传失败')
        }
      }
    }

    function onEditorReady(editor) {
      quillInstance = editor
    }

    async function loadNewsList() {
      try {
        const response = await fetch('/api/news/public/list')
        const data = await response.json()
        if (data.code === 200) {
          newsList.value = data.data.records
        } else {
          console.error('获取新闻列表失败:', data.msg)
        }
      } catch (error) {
        console.error('获取新闻列表出错:', error)
      }
    }

    async function deleteSelected() {
      if (selectedNews.value.length === 0) {
        alert('请至少选择一条新闻')
        return
      }

      if (!confirm(`确定要删除选中的 ${selectedNews.value.length} 条新闻吗？`)) {
        return
      }

      try {
        for (const id of selectedNews.value) {
          const response = await fetch(`/api/news/${id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`
            },
            method: 'DELETE'
          })
          const data = await response.json()
          if (data.code !== 200) {
            throw new Error(`删除新闻 ${id} 失败`)
          }
        }

        alert('删除成功')
        loadNewsList()
        selectedNews.value = []
      } catch (error) {
        console.error('删除新闻出错:', error)
        alert('删除新闻失败')
      }
    }

    function toggleSelectAll() {
      if (selectAll.value) {
        selectedNews.value = newsList.value.map(news => news.id)
      } else {
        selectedNews.value = []
      }
    }

    function formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleString()
    }

    function openEditDialog(news = null) {
      if (news) {
        editingNews.value = { ...news }
      } else {
        editingNews.value = {
          id: null,
          title: '',
          summary: '',
          coverImage: '',
          content: '',
          sort: 0
        }
      }
      showEditDialog.value = true
    }

    function closeEditDialog() {
      showEditDialog.value = false
    }

    async function handleCoverImageChange(event) {
      const file = event.target.files[0]
      if (!file) return

      try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload?type=newsPhoto', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          throw new Error('上传失败')
        }

        const data = await response.json()
        editingNews.value.coverImage = data.url
      } catch (error) {
        console.error('封面图片上传失败:', error)
        alert('封面图片上传失败')
      }
    }

    async function saveNews() {
      try {
        const method = editingNews.value.id ? 'PUT' : 'POST'
        const url = '/api/news'

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(editingNews.value)
        })

        const data = await response.json()
        if (data.code == 200) {
          alert('保存成功')
          closeEditDialog()
          loadNewsList()
        } else {
          throw new Error(data.msg || '保存失败')
        }
      } catch (error) {
        console.error('保存新闻出错:', error)
        alert('保存新闻失败: ' + error.message)
      }
    }

    onMounted(() => {
      loadNewsList()
    })

    return {
      newsList,
      selectedNews,
      selectAll,
      showEditDialog,
      editingNews,
      editorOptions,
      deleteSelected,
      toggleSelectAll,
      formatDate,
      openEditDialog,
      closeEditDialog,
      handleCoverImageChange,
      saveNews,
      onEditorReady
    }
  }
}
</script>

<style scoped>
/* 基础样式 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

/* 主容器 */
.news-management-container {
  width: 100%;
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.news-management {
  max-width: 1400px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.news-management h1 {
  font-size: 24px;
  margin-bottom: 25px;
  color: #333;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

/* 新闻列表 */
.news-list-container {
  width: 100%;
  overflow-x: auto;
}

.news-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  min-width: 1000px;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #555;
  position: sticky;
  top: 0;
}

tr:hover {
  background-color: #f8f9fa;
}

/* 列宽设置 */
.checkbox-col {
  width: 50px;
}

.id-col {
  width: 80px;
}

.title-col {
  min-width: 250px;
}

.time-col {
  width: 180px;
}

.action-col {
  width: 100px;
}

/* 按钮样式 */
button {
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 4px;
  font-size: 14px;
  padding: 8px 16px;
  border: none;
}

.delete-button {
  background-color: #ff4444;
  color: white;
}

.delete-button:hover {
  background-color: #dd3333;
}

.add-button {
  background-color: #4285f4;
  color: white;
}

.add-button:hover {
  background-color: #3367d6;
}

.edit-button {
  background-color: #34a853;
  color: white;
  padding: 6px 12px;
}

.edit-button:hover {
  background-color: #2d8e47;
}

/* 编辑对话框 */
.edit-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.edit-dialog {
  background-color: white;
  border-radius: 8px;
  width: 95%;
  max-width: 1300px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.dialog-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-header h2 {
  font-size: 20px;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  padding: 5px;
}

.close-button:hover {
  color: #666;
}

.dialog-body {
  padding: 20px;
  flex: 1;
  overflow-y: auto;
}

.dialog-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  text-align: right;
}

/* 表单布局 */
.form-container {
  display: flex;
  gap: 20px;
}

.form-left {
  flex: 1;
  min-width: 350px;
}

.form-right {
  flex: 2;
  min-width: 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input[type="number"] {
  width: 80px;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

/* 图片上传 */
.image-upload {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.upload-button {
  background-color: #f0f0f0;
  color: #555;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #ddd;
  font-size: 13px;
}

.upload-button:hover {
  background-color: #e0e0e0;
}

.file-name {
  font-size: 13px;
  color: #777;
}

.cover-preview {
  max-width: 100%;
  max-height: 200px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-top: 10px;
}

/* 富文本编辑器 */
.quill-editor-container {
  height: 500px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.quill-editor {
  flex: 1;
  min-height: 0;
}

/* 对话框按钮 */
.save-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  margin-right: 10px;
}

.save-button:hover {
  background-color: #45a049;
}

.cancel-button {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
}

.cancel-button:hover {
  background-color: #d32f2f;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .form-container {
    flex-direction: column;
  }

  .form-left, .form-right {
    min-width: 100%;
  }

  .quill-editor-container {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .news-management {
    padding: 15px;
  }

  .edit-dialog {
    width: 98%;
  }

  .dialog-body {
    padding: 15px;
  }
}
</style>