<template>
  <div class="department-container">
    <el-card class="department-card">
      <template #header>
        <div class="card-header">
          <h2 class="card-title">部门管理</h2>
          <div class="card-actions">
            <el-button type="primary" size="large" @click="handleAdd">
              <el-icon><Plus /></el-icon>新增部门
            </el-button>
          </div>
        </div>
      </template>

      <el-table :data="tableData" border style="width: 100%" class="department-table">
        <el-table-column prop="name" label="部门名称" width="250" />
        <el-table-column prop="createTime" label="创建时间" width="220" />
        <el-table-column prop="updateTime" label="更新时间" width="220" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="40%">
      <el-form :model="form" label-width="100px">
        <el-form-item label="部门名称">
          <el-input v-model="form.name" placeholder="请输入部门名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { Plus } from '@element-plus/icons-vue'

const tableData = ref([])
const dialogVisible = ref(false)
const dialogTitle = ref('')
const form = ref({
  id: null,
  code: '',  // 保留code字段但始终为空
  name: ''
})

const fetchData = async () => {
  try {
    const res = await axios.get('/api/department',{
      headers: {
        Authorization: localStorage.getItem('token')
      }}
    )
    tableData.value = res.data.data
  } catch (error) {
    console.error('获取部门列表失败:', error)
    ElMessage.error('获取部门列表失败')
  }
}

const handleAdd = () => {
  dialogTitle.value = '新增部门'
  form.value = { id: null, code: '', name: '' }  // 初始化时code为空
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑部门'
  form.value = {
    id: row.id,
    code: '',  // 编辑时也保持code为空
    name: row.name
  }
  dialogVisible.value = true
}

const handleDelete = async (id) => {
  try {
    await axios.delete(`/api/department/${id}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    ElMessage.success('删除成功')
    fetchData()
  } catch (error) {
    console.error('删除失败:', error)
    ElMessage.error('删除失败')
  }
}

const submitForm = async () => {
  try {
    const payload = {
      ...form.value,
      code: ''  // 确保提交时code为空
    }

    if (form.value.id) {
      await axios.put('/api/department', payload,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
    } else {
      await axios.post('/api/department', payload,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
    }
    ElMessage.success('操作成功')
    dialogVisible.value = false
    fetchData()
  } catch (error) {
    console.error('操作失败:', error)
    ElMessage.error('操作失败')
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
/* 样式保持不变 */
.department-container {
  padding: 20px;
}

.department-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
}

.card-title {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

.department-table {
  margin-top: 16px;
}

.el-table-column {
  font-weight: 500;
}

.el-form-item {
  margin-bottom: 22px;
}

.el-input {
  width: 100%;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>