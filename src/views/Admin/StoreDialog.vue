<!--
 * @Descripttion:直营门店管理
 * @Author: huimeng
 * @Date: 2025-05-26 14:55:01
 * @LastEditors: huimeng
 * @LastEditTime: 2025-08-06 10:29:23
-->
<template>
  <div class="store-management-container">
    <div class="store-management">
      <h1>直营门店管理</h1>

      <!-- 门店列表 -->
      <div class="store-list-container">
        <div class="store-actions">
          <button @click="deleteSelected" class="delete-button">删除选中</button>
          <button @click="openEditDialog(null)" class="add-button">新增门店</button>
        </div>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th class="checkbox-col">
                  <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                </th>
                <th class="id-col">序号</th>
                <th class="name-col">门店名称</th>
                <th class="sort-col">排序</th>
                <th class="time-col">创立时间</th>
                <th class="action-col">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(store, index) in storeList" :key="store.id">
                <td><input type="checkbox" v-model="selectedStores" :value="store.id" /></td>
                <td>{{ index + 1 }}</td>
                <td>{{ store.name }}</td>
                <td>{{ store.sort_order }}</td>
                <td>{{ formatDate(store.createTime) }}</td>
                <td>
                  <button @click="openEditDialog(store)" class="edit-button">编辑</button>
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
            <h2>{{ editingStore.id ? '编辑门店' : '新增门店' }}</h2>
            <button class="close-button" @click="closeEditDialog">×</button>
          </div>

          <div class="dialog-body">
            <div class="form-container">
              <div class="form-left">
                <div class="form-group">
                  <label>门店名称</label>
                  <input v-model="editingStore.name" type="text" placeholder="请输入门店名称" />
                </div>

                <div class="form-group">
                  <label>门店创立时间</label>
                  <input
                    v-model="editingStore.createTime"
                    type="datetime-local"
                    :max="new Date().toISOString().slice(0, 16)"
                  />
                </div>

                <div class="form-group">
                  <label>简短介绍</label>
                  <textarea
                    v-model="editingStore.brief"
                    rows="3"
                    placeholder="请输入简短介绍"
                  ></textarea>
                </div>

                <div class="form-group">
                  <label>封面图片</label>
                  <div class="image-upload">
                    <input
                      type="file"
                      @change="handleCoverImageChange"
                      accept="image/*"
                      id="cover-upload"
                    />
                    <label for="cover-upload" class="upload-button">选择图片</label>
                    <span class="file-name" v-if="!editingStore.cover_image">未选择文件</span>
                    <span class="file-name" v-else>
                      已选择:
                      {{ (editingStore.cover_image || editingStore.coverImage).split('/').pop() }}
                    </span>
                  </div>
                  <img
                    v-if="editingStore.cover_image"
                    :src="editingStore.cover_image"
                    class="cover-preview"
                  />
                </div>

                <div class="form-group">
                  <label>排序权重</label>
                  <input v-model="editingStore.sort_order" type="number" min="0" />
                </div>
              </div>

              <div class="form-right">
                <div class="form-group">
                  <label>详细内容</label>
                  <div class="quill-editor-container">
                    <RichTextEditor
                      v-model="editingStore.detail_content"
                      :maxImageWidth="1100"
                      :image-upload-path="'/api/upload?type=dirStorePhoto'"
                      :video-upload-path="'/api/upload?type=dirStoreVideo'"
                      placeholder="请输入门店详细内容..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="dialog-footer">
            <button @click="saveStore" class="save-button">保存</button>
            <button @click="closeEditDialog" class="cancel-button">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import RichTextEditor from '@/utils/RichTextEditor.vue'

export default {
  components: {
    RichTextEditor
  },
  setup() {
    const storeList = ref([])
    const selectedStores = ref([])
    const selectAll = ref(false)
    const showEditDialog = ref(false)
    const editingStore = ref({
      id: null,
      name: '',
      cover_image: '',
      brief: '',
      detail_content: '',
      sort_order: 0,
      createTime: '',
    })

    // 加载门店列表
    async function loadStoreList() {
      try {
        const response = await fetch('/api/stores/list',{
          method: 'GET',
        })
        const data = await response.json()
        if (data.code === 200) {
          storeList.value = data.data
        } else {
          console.error('获取门店列表失败:', data.msg)
        }
      } catch (error) {
        console.error('获取门店列表出错:', error)
      }
    }

    // 删除选中的门店
    async function deleteSelected() {
      if (selectedStores.value.length === 0) {
        alert('请至少选择一家门店')
        return
      }

      if (!confirm(`确定要删除选中的 ${selectedStores.value.length} 家门店吗？`)) {
        return
      }

      try {
        for (const id of selectedStores.value) {
          const response = await fetch(`/api/stores/delete/${id}`, {
            method: 'DELETE',
            headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
          })
          const data = await response.json()
          if (data.code !== 200) {
            throw new Error(data.msg || `删除门店 ${id} 失败`)
          }
        }

        alert('删除成功')
        loadStoreList()
        selectedStores.value = []
      } catch (error) {
        console.error('删除门店出错:', error)
        alert('删除门店失败: ' + error.message)
      }
    }

    // 全选/取消全选
    function toggleSelectAll() {
      if (selectAll.value) {
        selectedStores.value = storeList.value.map((store) => store.id)
      } else {
        selectedStores.value = []
      }
    }

    // 格式化日期显示
    function formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date
        .toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })
        .replace(/\//g, '-')
    }

    // 将日期转换为datetime-local格式
    function formatDateTimeLocal(isoString) {
      if (!isoString) return ''
      const date = new Date(isoString)
      return date.toISOString().slice(0, 16)
    }

    // 打开编辑对话框
    function openEditDialog(store = null) {
      if (store) {
        editingStore.value = {
          ...store,
          cover_image: store.coverImage || '',
          createTime: formatDateTimeLocal(store.createTime),
          detail_content: store.detailContent || ''
        }
      } else {
        editingStore.value = {
          id: null,
          name: '',
          cover_image: '',
          brief: '',
          detail_content: '',
          sort_order: 0,
          createTime: formatDateTimeLocal(new Date().toISOString()),
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
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload?type=dirStorePhoto', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        })
        if (!response.ok) {
          throw new Error('上传失败')
        }

        const data = await response.json()
        editingStore.value.cover_image = data.url
      } catch (error) {
        console.error('封面图片上传失败:', error)
        alert('封面图片上传失败: ' + error.message)
      }
    }

    // 保存门店
    async function saveStore() {
      // 验证必填字段
      if (!editingStore.value.name) {
        alert('请输入门店名称')
        return
      }

      if (!editingStore.value.createTime) {
        alert('请选择门店创立时间')
        return
      }

      try {
        // 准备请求数据
        const requestData = {
          name: editingStore.value.name,
          coverImage: editingStore.value.cover_image || '',
          brief: editingStore.value.brief || '',
          detailContent: editingStore.value.detail_content || '',
          sortOrder: editingStore.value.sort_order || 0,
          createTime: new Date(editingStore.value.createTime).toISOString(),
        }

        // 如果有ID，表示是编辑现有门店
        if (editingStore.value.id) {
          requestData.id = editingStore.value.id
        }

        const response = await fetch('/api/stores/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(requestData),
        })

        const data = await response.json()

        if (data.code === 200) {
          alert('保存成功')
          closeEditDialog()
          loadStoreList()
        } else {
          throw new Error(data.msg || `保存失败，错误码: ${data.code}`)
        }
      } catch (error) {
        console.error('保存门店出错:', error)
        alert('保存门店失败: ' + error.message)
      }
    }

    // 初始化加载门店列表
    onMounted(() => {
      loadStoreList()
    })

    return {
      storeList,
      selectedStores,
      selectAll,
      showEditDialog,
      editingStore,
      deleteSelected,
      toggleSelectAll,
      formatDate,
      openEditDialog,
      closeEditDialog,
      handleCoverImageChange,
      saveStore,
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
.store-management-container {
  width: 100%;
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.store-management {
  max-width: 1400px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.store-management h1 {
  font-size: 24px;
  margin-bottom: 25px;
  color: #333;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

/* 门店列表 */
.store-list-container {
  width: 100%;
  overflow-x: auto;
}

.store-actions {
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

.id-col {
  width: 80px;
}

.name-col {
  min-width: 200px;
}

.sort-col {
  width: 80px;
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

.form-group input[type='text'],
.form-group input[type='number'],
.form-group input[type='datetime-local'],
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input[type='number'] {
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

/* 富文本编辑器容器 */
.quill-editor-container {
  height: 500px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* 对话框按钮 */
.save-button {
  background-color: #4caf50;
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

  .form-left,
  .form-right {
    min-width: 100%;
  }

  .quill-editor-container {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .store-management {
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