<template>
  <div class="case-management-container">
    <div class="case-management">
      <h1>优秀案例管理</h1>

      <!-- 案例列表 -->
      <div class="case-list-container">
        <div class="case-actions">
          <button @click="deleteSelected" class="delete-button" :disabled="loading">
            {{ loading ? '处理中...' : '删除选中' }}
          </button>
          <button @click="openEditDialog(null)" class="add-button">新增案例</button>
        </div>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th class="checkbox-col">
                  <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                </th>
                <th class="index-col">序号</th>
                <th class="cover-col">封面</th>
                <th class="title-col">标题</th>
                <th class="time-col">创建时间</th>
                <th class="action-col">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(caseItem, index) in caseList" :key="caseItem.id">
                <td><input type="checkbox" v-model="selectedCases" :value="caseItem.id" /></td>
                <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                <td>
                  <img
                    :src="caseItem.coverUrl"
                    class="cover-thumbnail"
                    @click="previewImage(caseItem.coverUrl)"
                  />
                </td>
                <td>{{ caseItem.title }}</td>
                <td>{{ formatDate(caseItem.create_time) }}</td>
                <td>
                  <button @click="openEditDialog(caseItem)" class="edit-button">编辑</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 分页控件 -->
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1 || loading">上一页</button>
          <span>第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
          <button @click="nextPage" :disabled="currentPage === totalPages || loading">
            下一页
          </button>
        </div>
      </div>

      <!-- 编辑对话框 -->
      <div v-if="showEditDialog" class="edit-dialog-overlay">
        <div class="edit-dialog">
          <div class="dialog-header">
            <h2>{{ editingCase.id ? '编辑案例' : '新增案例' }}</h2>
            <button class="close-button" @click="closeEditDialog">×</button>
          </div>

          <div class="dialog-body">
            <div class="form-container">
              <div class="form-left">
                <div class="form-group">
                  <label>案例标题 <span class="required">*</span></label>
                  <input v-model="editingCase.title" type="text" placeholder="请输入案例标题" />
                </div>

                <div class="form-group">
                  <label>封面图片 <span class="required">*</span></label>
                  <div class="image-upload">
                    <input
                      type="file"
                      @change="handleCoverImageChange"
                      accept="image/*"
                      id="cover-upload"
                      :disabled="uploading"
                    />
                    <label
                      for="cover-upload"
                      class="upload-button"
                      :class="{ disabled: uploading }"
                    >
                      {{ uploading ? '上传中...' : '选择封面图片' }}
                    </label>
                    <span class="file-name" v-if="!editingCase.coverUrl">未选择文件</span>
                    <span class="file-name" v-else>
                      已选择: {{ editingCase.coverUrl.split('/').pop() }}
                    </span>
                  </div>
                  <img
                    v-if="editingCase.coverUrl"
                    :src="editingCase.coverUrl"
                    class="cover-preview"
                  />
                </div>
              </div>

              <div class="form-right">
                <div class="form-group">
                  <label>案例详情</label>
                  <div class="quill-editor-container">
                    <quill-editor
                      v-model:content="editingCase.content"
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
            <button @click="saveCase" class="save-button" :disabled="saving">
              {{ saving ? '保存中...' : '保存' }}
            </button>
            <button @click="closeEditDialog" class="cancel-button">取消</button>
          </div>
        </div>
      </div>

      <!-- 图片预览模态框 -->
      <div v-if="showImagePreview" class="preview-modal" @click="closePreview">
        <div class="preview-content">
          <img :src="previewImageUrl" alt="预览图片" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import axios from 'axios'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
  components: {
    QuillEditor,
  },
  setup() {
    const caseList = ref([])
    const selectedCases = ref([])
    const selectAll = ref(false)
    const showEditDialog = ref(false)
    const editingCase = ref({
      id: null,
      title: '',
      coverUrl: '',
      content: '',
    })

    // 状态管理
    const loading = ref(false)
    const saving = ref(false)
    const uploading = ref(false)

    // 分页相关
    const currentPage = ref(1)
    const pageSize = ref(12)
    const totalPages = ref(1)
    const totalItems = ref(0)

    // 图片预览相关
    const showImagePreview = ref(false)
    const previewImageUrl = ref('')

    // Quill 编辑器配置
    const editorOptions = {
      modules: {
        toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image', 'video'],
          ],
          handlers: {
            image: imageHandler,
          },
        },
      },
      placeholder: '请输入案例详情内容...',
      theme: 'snow',
    }

    let quillInstance = null

    // 图片上传处理
    async function imageHandler() {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.click()

      input.onchange = async () => {
        const file = input.files[0]
        if (!file) return

        try {
          uploading.value = true
          const formData = new FormData()
          formData.append('file', file)
          formData.append('type', 'goodCasePhoto')

          const { data } = await axios.post('/api/upload?type=goodCasePhoto', formData, {
            headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('token')}` },
          })

          if (data.url) {
            const range = quillInstance.getSelection()
            quillInstance.insertEmbed(range.index, 'image', data.url)
            quillInstance.setSelection(range.index + 1)
          } else {
            throw new Error(data.msg || '上传失败：服务器未返回有效URL')
          }
        } catch (error) {
          console.error('图片上传失败:', error)
          alert('图片上传失败: ' + error.message)
        } finally {
          uploading.value = false
        }
      }
    }

    function onEditorReady(editor) {
      quillInstance = editor
    }

    // 加载案例列表
    async function loadCaseList() {
      try {
        loading.value = true
        const { data } = await axios.get('/api/goodCase/page', {
          params: {
            pageNum: currentPage.value,
            pageSize: pageSize.value,
          },
        })

        if (data.code === 200) {
          caseList.value = data.data.records || []
          totalItems.value = data.data.total || 0
          totalPages.value = Math.ceil(totalItems.value / pageSize.value)
        } else {
          console.error('获取案例列表失败:', data.msg)
          alert('获取案例列表失败: ' + data.msg)
        }
      } catch (error) {
        console.error('获取案例列表出错:', error)
        alert('获取案例列表出错: ' + error.message)
      } finally {
        loading.value = false
      }
    }

    // 删除选中的案例
    async function deleteSelected() {
      if (selectedCases.value.length === 0) {
        alert('请至少选择一个案例')
        return
      }

      if (!confirm(`确定要删除选中的 ${selectedCases.value.length} 个案例吗？`)) {
        return
      }

      try {
        loading.value = true
        const deleteRequests = selectedCases.value.map(id =>
          axios.delete(`/api/goodCase/${id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
        );

        const results = await Promise.all(deleteRequests)
        const hasError = results.some((result) => result.data.code !== 200)

        if (hasError) {
          throw new Error('部分案例删除失败')
        }

        alert('删除成功')
        loadCaseList()
        selectedCases.value = []
      } catch (error) {
        console.error('删除案例出错:', error)
        alert('删除案例失败: ' + error.message)
      } finally {
        loading.value = false
      }
    }

    // 全选/取消全选
    function toggleSelectAll() {
      if (selectAll.value) {
        selectedCases.value = caseList.value.map((caseItem) => caseItem.id)
      } else {
        selectedCases.value = []
      }
    }

    // 格式化日期
    function formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleString()
    }

    // 打开编辑对话框
    function openEditDialog(caseItem = null) {
      if (caseItem) {
        editingCase.value = { ...caseItem }
      } else {
        editingCase.value = {
          id: null,
          title: '',
          coverUrl: '',
          content: '',
        }
      }
      showEditDialog.value = true
    }

    // 关闭编辑对话框
    function closeEditDialog() {
      showEditDialog.value = false
    }

    // 处理封面图片上传
    async function handleCoverImageChange(event) {
      const file = event.target.files[0]
      if (!file) return

      try {
        uploading.value = true
        const formData = new FormData()
        formData.append('file', file)

        const { data } = await axios.post('/api/upload?type=goodCasePhoto', formData, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        console.log(data)

        if (data.url) {
          editingCase.value.coverUrl = data.url
          console.log(editingCase.value.coverUrl)
        } else {
          throw new Error(data.msg || '上传失败')
        }
      } catch (error) {
        console.error('封面图片上传失败:', error)
        alert('封面图片上传失败: ' + error.message)
      } finally {
        uploading.value = false
      }
    }

    // 保存案例
    async function saveCase() {
      if (!editingCase.value.title) {
        alert('请填写案例标题')
        return
      }

      if (!editingCase.value.coverUrl) {
        alert('请上传封面图片')
        return
      }

      try {
        saving.value = true
        const method = editingCase.value.id ? 'put' : 'post'
        const url = '/api/goodCase'
        console.log(editingCase.value)
        const { data } = await axios[method](url, editingCase.value, {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        console.log(data)
        if (data.code === 200) {
          alert('保存成功')
          closeEditDialog()
          loadCaseList()
        } else {
          throw new Error(data.msg || `保存失败，错误码: ${data.code}`)
        }
      } catch (error) {
        console.error('保存案例出错:', error)
        alert('保存案例失败: ' + error.message)
      } finally {
        saving.value = false
      }
    }

    // 预览图片
    function previewImage(imageUrl) {
      previewImageUrl.value = imageUrl
      showImagePreview.value = true
    }

    // 关闭图片预览
    function closePreview() {
      showImagePreview.value = false
    }

    // 分页导航
    function prevPage() {
      if (currentPage.value > 1) {
        currentPage.value--
        loadCaseList()
      }
    }

    function nextPage() {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
        loadCaseList()
      }
    }

    // 初始化加载案例列表
    onMounted(() => {
      loadCaseList()
    })

    return {
      caseList,
      selectedCases,
      selectAll,
      showEditDialog,
      editingCase,
      currentPage,
      pageSize,
      totalPages,
      showImagePreview,
      previewImageUrl,
      editorOptions,
      loading,
      saving,
      uploading,
      deleteSelected,
      toggleSelectAll,
      formatDate,
      openEditDialog,
      closeEditDialog,
      handleCoverImageChange,
      saveCase,
      previewImage,
      closePreview,
      prevPage,
      nextPage,
      onEditorReady,
    }
  },
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
.case-management-container {
  width: 100%;
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.case-management {
  max-width: 100%;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.case-management h1 {
  font-size: 24px;
  margin-bottom: 25px;
  color: #333;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

/* 案例列表 */
.case-list-container {
  width: 100%;
  overflow-x: auto;
}

.case-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.table-container {
  width: 100%;
  overflow-x: auto;
  margin-bottom: 20px;
  background-color: transparent;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
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

.index-col {
  width: 60px;
  text-align: center;
}

.cover-col {
  width: 150px;
}

.title-col {
  min-width: 400px;
}

.time-col {
  width: 200px;
}

.action-col {
  width: 150px;
}

/* 封面缩略图 */
.cover-thumbnail {
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #eee;
  transition: transform 0.3s;
}

.cover-thumbnail:hover {
  transform: scale(1.05);
  opacity: 0.9;
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
  padding: 8px 12px;
}

.edit-button:hover {
  background-color: #2d8e47;
}

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

.pagination button {
  padding: 10px 20px;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
  font-size: 14px;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination span {
  font-size: 14px;
  color: #666;
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
  max-width: 1400px;
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
  font-size: 22px;
  color: #333;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 28px;
  color: #999;
  cursor: pointer;
  padding: 5px;
  transition: color 0.2s;
}

.close-button:hover {
  color: #666;
}

.dialog-body {
  padding: 25px;
  flex: 1;
  overflow-y: auto;
}

.dialog-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  text-align: right;
}

/* 表单布局 */
.form-container {
  display: flex;
  gap: 30px;
}

.form-left {
  flex: 1;
  min-width: 400px;
}

.form-right {
  flex: 3;
  min-width: 0;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: #555;
  font-size: 15px;
}

.form-group input[type='text'] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  transition: border-color 0.3s;
}

.form-group input[type='text']:focus {
  border-color: #4285f4;
  outline: none;
}

/* 图片上传 */
.image-upload {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.upload-button {
  background-color: #f0f0f0;
  color: #555;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid #ddd;
  font-size: 14px;
  transition: all 0.2s;
}

.upload-button:hover {
  background-color: #e0e0e0;
}

.file-name {
  font-size: 14px;
  color: #777;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cover-preview {
  max-width: 100%;
  max-height: 300px;
  border: 1px solid #eee;
  border-radius: 6px;
  margin-top: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 富文本编辑器 */
.quill-editor-container {
  height: 600px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
}

.quill-editor {
  flex: 1;
  min-height: 0;
}

/* 预览模态框 */
.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  cursor: pointer;
}

.preview-content {
  max-width: 90%;
  max-height: 90%;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
}

.preview-content img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 4px;
}

/* 对话框按钮 */
.save-button {
  background-color: #4caf50;
  color: white;
  padding: 12px 25px;
  margin-right: 15px;
  font-size: 15px;
  font-weight: 500;
}

.save-button:hover {
  background-color: #45a049;
}

.cancel-button {
  background-color: #f44336;
  color: white;
  padding: 12px 25px;
  font-size: 15px;
  font-weight: 500;
}

.cancel-button:hover {
  background-color: #d32f2f;
}

/* 响应式调整 */
@media (max-width: 1600px) {
  .case-management {
    max-width: 98%;
    padding: 25px;
  }

  .form-container {
    flex-direction: column;
  }

  .form-left,
  .form-right {
    min-width: 100%;
  }

  .cover-col {
    width: 120px;
  }

  .title-col {
    min-width: 250px;
  }

  .time-col {
    width: 180px;
  }
}

@media (max-width: 1200px) {
  .quill-editor-container {
    height: 500px;
  }

  .cover-thumbnail {
    width: 100px;
    height: 75px;
  }
}

@media (max-width: 992px) {
  .case-management {
    padding: 20px;
  }

  .edit-dialog {
    width: 98%;
  }

  th,
  td {
    padding: 10px 12px;
  }

  .action-col {
    width: 120px;
  }
}

@media (max-width: 768px) {
  .case-management {
    padding: 15px;
  }

  .dialog-body {
    padding: 15px;
  }

  .title-col {
    min-width: 200px;
  }

  .time-col {
    width: 150px;
  }

  .pagination {
    flex-direction: column;
    gap: 10px;
  }

  .save-button,
  .cancel-button {
    width: 100%;
    margin-bottom: 10px;
    margin-right: 0;
  }
}

@media (max-width: 576px) {
  .case-actions {
    flex-direction: column;
    gap: 10px;
  }

  .delete-button,
  .add-button {
    width: 100%;
  }

  .cover-col {
    width: 80px;
  }

  .cover-thumbnail {
    width: 70px;
    height: 50px;
  }

  .title-col {
    min-width: 150px;
  }

  .time-col {
    width: 120px;
  }

  .action-col {
    width: 100px;
  }

  .edit-button {
    padding: 6px 10px;
    font-size: 13px;
  }
}

/* 特殊样式 */
.required {
  color: #f44336;
  margin-left: 4px;
}

.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>