<template>
  <div class="designer-management-container">
    <div class="designer-management">
      <h1>设计师管理</h1>

      <!-- 设计师列表 -->
      <div class="designer-list-container">
        <div class="designer-actions">
          <button @click="deleteSelected" class="delete-button">删除选中</button>
          <button @click="openEditDialog(null)" class="add-button">新增设计师</button>
        </div>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th class="checkbox-col"><input type="checkbox" v-model="selectAll" @change="toggleSelectAll"></th>
                <th class="id-col">序号</th>
                <th class="name-col">姓名</th>
                <th class="position-col">职务</th>
                <th class="department-col">部门</th>
                <th class="style-col">擅长风格</th>
                <th class="action-col">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(designer, index) in designerList" :key="designer.id">
                <td><input type="checkbox" v-model="selectedDesigners" :value="designer.id"></td>
                <td>{{ index + 1 }}</td>
                <td>{{ designer.name }}</td>
                <td>{{ designer.position }}</td>
                <td>{{ designer.department }}</td>
                <td>{{ designer.style }}</td>
                <td>
                  <button @click="openEditDialog(designer)" class="edit-button">编辑</button>
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
            <h2>{{ editingDesigner.id ? '编辑设计师' : '新增设计师' }}</h2>
            <button class="close-button" @click="closeEditDialog">×</button>
          </div>

          <div class="dialog-body">
            <div class="form-container">
              <div class="form-left">
                <div class="form-group">
                  <label>姓名</label>
                  <input v-model="editingDesigner.name" type="text" placeholder="请输入设计师姓名">
                </div>

                <div class="form-group">
                  <label>头像</label>
                  <div class="image-upload">
                    <input type="file" @change="handleAvatarChange" accept="image/*" id="avatar-upload">
                    <label for="avatar-upload" class="upload-button">选择头像</label>
                    <span class="file-name" v-if="!editingDesigner.avatar">未选择文件</span>
                    <span class="file-name" v-else>已选择: {{ editingDesigner.avatar.split('/').pop() }}</span>
                  </div>
                  <img v-if="editingDesigner.avatar" :src="editingDesigner.avatar" class="avatar-preview">
                </div>

                <div class="form-group">
                  <label>职务</label>
                  <input v-model="editingDesigner.position" type="text" placeholder="请输入职务">
                </div>

                <div class="form-group">
                  <label>部门</label>
                  <input v-model="editingDesigner.department" type="text" placeholder="请输入部门">
                </div>

                <div class="form-group">
                  <label>擅长风格</label>
                  <input v-model="editingDesigner.style" type="text" placeholder="请输入擅长风格">
                </div>
              </div>

              <div class="form-right">
                <div class="form-group">
                  <label>代表作品 (每行一个作品)</label>
                  <textarea
                    v-model="worksText"
                    rows="5"
                    placeholder="请输入代表作品，每行一个"
                  ></textarea>
                </div>

                <div class="form-group">
                  <label>设计理念</label>
                  <textarea v-model="editingDesigner.concept" rows="5" placeholder="请输入设计理念"></textarea>
                </div>

                <div class="form-group">
                  <label>曾获奖励 (每行一个奖励)</label>
                  <textarea
                    v-model="awardsText"
                    rows="5"
                    placeholder="请输入曾获奖励，每行一个"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="dialog-footer">
            <button @click="saveDesigner" class="save-button">保存</button>
            <button @click="closeEditDialog" class="cancel-button">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'

export default {
  setup() {
    const designerList = ref([])
    const selectedDesigners = ref([])
    const selectAll = ref(false)
    const showEditDialog = ref(false)
    const editingDesigner = ref({
      id: null,
      name: '',
      avatar: '',
      position: '',
      department: '',
      style: '',
      works: '',       // 改为字符串类型
      concept: '',
      awards: ''       // 改为字符串类型
    })

    // 处理作品文本与数组的转换
    const worksText = computed({
      get: () => {
        if (!editingDesigner.value.works) return ''
        // 将逗号分隔的字符串转换为换行显示的文本
        return editingDesigner.value.works.replace(/,/g, '\n')
      },
      set: (val) => {
        // 将换行分隔的文本转换为逗号分隔的字符串
        editingDesigner.value.works = val.split('\n')
          .filter(item => item.trim() !== '')
          .join(',')
      }
    })

    // 处理奖励文本与数组的转换
    const awardsText = computed({
      get: () => {
        if (!editingDesigner.value.awards) return ''
        // 将逗号分隔的字符串转换为换行显示的文本
        return editingDesigner.value.awards.replace(/,/g, '\n')
      },
      set: (val) => {
        // 将换行分隔的文本转换为逗号分隔的字符串
        editingDesigner.value.awards = val.split('\n')
          .filter(item => item.trim() !== '')
          .join(',')
      }
    })

    // 加载设计师列表
    async function loadDesignerList() {
      try {
        const response = await fetch('/api/designers/list')
        const data = await response.json()
        console.log('获取设计师列表成功:', data)
        if (data.code === 200) {
          designerList.value = data.data.map(designer => ({
            ...designer,
            works: Array.isArray(designer.works) ? designer.works.join(',') : (designer.works || ''),
            awards: Array.isArray(designer.awards) ? designer.awards.join(',') : (designer.awards || '')
          }))
        } else {
          console.error('获取设计师列表失败:', data.msg)
        }
      } catch (error) {
        console.error('获取设计师列表出错:', error)
      }
    }

    // 删除选中的设计师
    async function deleteSelected() {
      if (selectedDesigners.value.length === 0) {
        alert('请至少选择一位设计师')
        return
      }

      if (!confirm(`确定要删除选中的 ${selectedDesigners.value.length} 位设计师吗？`)) {
        return
      }

      try {
        for (const id of selectedDesigners.value) {
          const response = await fetch(`/api/designers/${id}`, {
            method: 'DELETE'
          })
          const data = await response.json()
          if (data.code !== 200) {
            throw new Error(data.msg || `删除设计师 ${id} 失败`)
          }
        }

        alert('删除成功')
        loadDesignerList()
        selectedDesigners.value = []
      } catch (error) {
        console.error('删除设计师出错:', error)
        alert('删除设计师失败: ' + error.message)
      }
    }

    // 全选/取消全选
    function toggleSelectAll() {
      if (selectAll.value) {
        selectedDesigners.value = designerList.value.map(designer => designer.id)
      } else {
        selectedDesigners.value = []
      }
    }

    // 打开编辑对话框
    function openEditDialog(designer = null) {
      if (designer) {
        // 深拷贝设计师数据
        editingDesigner.value = JSON.parse(JSON.stringify(designer))

        if (Array.isArray(editingDesigner.value.works)) {
          editingDesigner.value.works = editingDesigner.value.works.join(',')
        } else if (!editingDesigner.value.works) {
          editingDesigner.value.works = ''
        }

        if (Array.isArray(editingDesigner.value.awards)) {
          editingDesigner.value.awards = editingDesigner.value.awards.join(',')
        } else if (!editingDesigner.value.awards) {
          editingDesigner.value.awards = ''
        }
      } else {
        editingDesigner.value = {
          id: null,
          name: '',
          avatar: '',
          position: '',
          department: '',
          style: '',
          works: '',    // 初始化为空字符串
          concept: '',
          awards: ''    // 初始化为空字符串
        }
      }
      showEditDialog.value = true
    }

    // 关闭编辑对话框
    function closeEditDialog() {
      showEditDialog.value = false
    }

    // 处理头像上传
    async function handleAvatarChange(event) {
      const file = event.target.files[0]
      if (!file) return

      try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload?type=designerPhoto', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          throw new Error('上传失败')
        }

        const data = await response.json()
        editingDesigner.value.avatar = data.url
      } catch (error) {
        console.error('头像上传失败:', error)
        alert('头像上传失败: ' + error.message)
      }
    }

    // 保存设计师
    async function saveDesigner() {
      try {
        // 准备发送的数据
        const payload = {
          ...editingDesigner.value,
          // 确保works和awards是字符串
          works: editingDesigner.value.works || '',
          awards: editingDesigner.value.awards || ''
        }

        const method = editingDesigner.value.id ? 'PUT' : 'POST'
        const url = editingDesigner.value.id
          ? `/api/designers/${editingDesigner.value.id}`
          : '/api/designers'

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })

        const data = await response.json()
        if (data.code === 200 || data.success) {
          alert('保存成功')
          closeEditDialog()
          loadDesignerList()
        } else {
          throw new Error(data.msg || `保存失败，错误码: ${data.code}`)
        }
      } catch (error) {
        console.error('保存设计师出错:', error)
        alert('保存设计师失败: ' + error.message)
      }
    }

    // 初始化加载设计师列表
    onMounted(() => {
      loadDesignerList()
    })

    return {
      designerList,
      selectedDesigners,
      selectAll,
      showEditDialog,
      editingDesigner,
      worksText,
      awardsText,
      deleteSelected,
      toggleSelectAll,
      openEditDialog,
      closeEditDialog,
      handleAvatarChange,
      saveDesigner
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
.designer-management-container {
  width: 100%;
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.designer-management {
  max-width: 1400px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.designer-management h1 {
  font-size: 24px;
  margin-bottom: 25px;
  color: #333;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

/* 设计师列表 */
.designer-list-container {
  width: 100%;
  overflow-x: auto;
}

.designer-actions {
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

.name-col {
  min-width: 120px;
}

.position-col {
  min-width: 120px;
}

.department-col {
  min-width: 120px;
}

.style-col {
  min-width: 150px;
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
  max-width: 1200px;
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
  flex: 1;
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
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
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

.avatar-preview {
  max-width: 150px;
  max-height: 150px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-top: 10px;
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
}

@media (max-width: 768px) {
  .designer-management {
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