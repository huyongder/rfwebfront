<template>
  <div class="reward-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span class="card-title">奖惩记录</span>
          <div class="card-actions">
            <el-button type="primary" size="default" @click="handleAdd">
              <el-icon><Plus /></el-icon>
              <span>新增记录</span>
            </el-button>
          </div>
        </div>
      </template>

      <!-- 查询表单 -->
      <el-form :inline="true" :model="queryParams" class="search-form">
        <el-form-item label="姓名">
          <el-input v-model="queryParams.title" placeholder="请输入姓名" clearable />
        </el-form-item>
        <el-form-item label="部门">
          <el-select
            v-model="queryParams.departmentId"
            placeholder="请选择部门"
            clearable
            style="width: 200px"
            popper-class="department-select"
          >
            <el-option
              v-for="item in departments"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="日期范围">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
            @change="handleDateChange"
          />
        </el-form-item>
        <el-form-item label="类型">
          <el-select
            v-model="queryParams.type"
            placeholder="请选择类型"
            clearable
            style="width: 120px"
          >
            <el-option label="奖励" :value="1" />
            <el-option label="惩罚" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 查询结果统计信息 -->
      <div class="search-result-info">
        <el-alert
          :title="`共找到 ${total} 条记录，其中奖励 ${rewardCount} 条，惩罚 ${punishCount} 条`"
          type="info"
          :closable="false"
          show-icon
        />
      </div>

      <el-table
        :data="tableDataWithDepartmentName"
        border
        style="width: 100%"
        :row-style="{height: '60px'}"
        :header-cell-style="{background: '#f5f7fa', color: '#606266'}"
        :span-method="spanMethod"
      >
        <el-table-column prop="title" label="姓名" min-width="180" />
        <el-table-column prop="departmentName" label="部门" min-width="180" />
        <el-table-column prop="recordDate" label="日期" min-width="120" />
        <el-table-column prop="type" label="类型" min-width="100">
          <template #default="scope">
            <el-tag :type="scope.row.type === 1 ? 'success' : 'danger'">
              {{ scope.row.type === 1 ? '奖励' : '惩罚' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="180" />
        <el-table-column label="操作" min-width="180" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="queryParams.pageNum"
          v-model:page-size="queryParams.pageSize"
          :total="total"
          :page-sizes="[10, 20, 30, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :width="dialogWidth"
      top="5vh"
      class="responsive-dialog"
    >
      <el-form :model="form" label-width="120px" label-position="top">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="名称">
              <el-input v-model="form.title" placeholder="请输入名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门">
              <el-select
                v-model="form.departmentId"
                placeholder="请选择部门"
                style="width: 100%"
                popper-class="department-select"
              >
                <el-option
                  v-for="item in departments"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="日期">
              <el-date-picker
                v-model="form.recordDate"
                type="date"
                placeholder="选择日期"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型">
              <el-select
                v-model="form.type"
                placeholder="请选择类型"
                style="width: 100%"
              >
                <el-option label="奖励" :value="1" />
                <el-option label="惩罚" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="内容" class="quill-form-item">
          <div class="quill-vertical-container">
            <QuillEditor
              v-model:content="form.content"
              contentType="html"
              theme="snow"
              :options="editorOptions"
            />
          </div>
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
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { QuillEditor } from '@vueup/vue-quill'
import { Plus } from '@element-plus/icons-vue'

const tableData = ref([])
const departments = ref([])
const dialogVisible = ref(false)
const dialogTitle = ref('')
const dateRange = ref([])
const total = ref(0)
const rewardCount = ref(0)
const punishCount = ref(0)
const spanArr = ref([])
const windowWidth = ref(window.innerWidth)

const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  title: '',
  departmentId: null,
  startDate: null,
  endDate: null,
  type: null
})

const form = ref({
  id: null,
  title: '',
  departmentId: null,
  recordDate: '',
  type: 1,
  content: ''
})

// 添加计算属性，将departmentId映射为departmentName
const tableDataWithDepartmentName = computed(() => {
  return tableData.value.map(item => {
    const department = departments.value.find(d => d.id === item.departmentId)
    return {
      ...item,
      departmentName: department ? department.name : '未知部门'
    }
  })
})

const dialogWidth = computed(() => {
  return windowWidth.value <= 768 ? '90%' : '60%'
})

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

const spanMethod = ({ rowIndex, columnIndex }) => {
  if (columnIndex === 1) {
    const _row = spanArr.value[rowIndex]
    const _col = _row > 0 ? 1 : 0
    return {
      rowspan: _row,
      colspan: _col
    }
  }
}

const handleSpanData = (data) => {
  spanArr.value = []
  let pos = 0

  data.forEach((item, index) => {
    if (index === 0) {
      spanArr.value.push(1)
      pos = 0
    } else {
      if (item.departmentId === data[index - 1].departmentId) {
        spanArr.value[pos] += 1
        spanArr.value.push(0)
      } else {
        spanArr.value.push(1)
        pos = index
      }
    }
  })
}

const fetchData = async () => {
  try {
    // 确保部门数据已加载
    if (departments.value.length === 0) {
      await fetchDepartments()
    }

    const res = await axios.get('/api/reward-punishment/list', {
      params: queryParams.value
    })
    tableData.value = res.data.data.list
    total.value = res.data.data.total
    handleSpanData(tableData.value)

    rewardCount.value = tableData.value.filter(item => item.type === 1).length
    punishCount.value = tableData.value.filter(item => item.type === 2).length
  } catch (error) {
    console.log(error)
    ElMessage.error('获取奖惩记录失败')
  }
}

const fetchDepartments = async () => {
  try {
    const res = await axios.get('/api/department')
    departments.value = res.data.data
  } catch (error) {
    console.log(error)
    ElMessage.error('获取部门列表失败')
  }
}

const handleQuery = () => {
  queryParams.value.pageNum = 1
  fetchData()
}

const resetQuery = () => {
  dateRange.value = []
  queryParams.value = {
    pageNum: 1,
    pageSize: 10,
    title: '',
    departmentId: null,
    startDate: null,
    endDate: null,
    type: null
  }
  fetchData()
}

const handleDateChange = (value) => {
  if (value && value.length === 2) {
    queryParams.value.startDate = value[0]
    queryParams.value.endDate = value[1]
  } else {
    queryParams.value.startDate = null
    queryParams.value.endDate = null
  }
}

const handleSizeChange = (val) => {
  queryParams.value.pageSize = val
  fetchData()
}

const handleCurrentChange = (val) => {
  queryParams.value.pageNum = val
  fetchData()
}

const handleAdd = () => {
  dialogTitle.value = '新增奖惩记录'
  form.value = {
    id: null,
    title: '',
    departmentId: null,
    recordDate: new Date().toISOString().split('T')[0],
    type: 1,
    content: ''
  }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑奖惩记录'
  form.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = async (id) => {
  try {
    await axios.delete(`/api/reward-punishment/${id}`)
    ElMessage.success('删除成功')
    fetchData()
  } catch (error) {
    console.log(error)
    ElMessage.error('删除失败')
  }
}

const submitForm = async () => {
  try {
    if (form.value.id) {
      await axios.put('/api/reward-punishment', form.value)
    } else {
      await axios.post('/api/reward-punishment', form.value)
    }
    ElMessage.success('操作成功')
    dialogVisible.value = false
    fetchData()
  } catch (error) {
    console.log(error)
    ElMessage.error('操作失败')
  }
}

onMounted(async () => {
  window.addEventListener('resize', handleResize)
  await fetchDepartments()  // 先加载部门数据
  await fetchData()         // 再加载表格数据
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

const editorOptions = ref({
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image']
    ]
  },
  placeholder: '请输入内容...',
  theme: 'snow'
})
</script>

<style scoped>
.reward-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
}

.search-form {
  margin-bottom: 20px;
}

.search-result-info {
  margin-bottom: 20px;
}

.el-button {
  border-radius: 4px;
  font-weight: 500;
}

.el-button--primary {
  box-shadow: 0 2px 6px 0 rgba(64, 158, 255, 0.3);
}

.el-button + .el-button {
  margin-left: 10px;
}

.el-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-table .cell {
  white-space: nowrap;
}

.el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: #f5f7fa !important;
}

.responsive-dialog .el-dialog {
  border-radius: 12px;
}

.responsive-dialog .el-dialog__header {
  padding: 20px 20px 10px;
  border-bottom: 1px solid #eee;
}

.responsive-dialog .el-dialog__body {
  padding: 20px;
  max-height: 70vh;
  overflow-y: auto;
}

.responsive-dialog .el-dialog__footer {
  padding: 10px 20px 20px;
  border-top: 1px solid #eee;
}

.el-form-item__label {
  font-weight: bold;
  color: #606266;
  padding-bottom: 8px !important;
}

.el-input__inner, .el-textarea__inner {
  border-radius: 4px;
}

.quill-form-item :deep(.el-form-item__content) {
  display: block;
  width: 100%;
}

.quill-vertical-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.quill-vertical-container :deep(.ql-toolbar) {
  border-radius: 4px 4px 0 0;
  border-bottom: none;
  background: #f5f7fa;
}

.quill-vertical-container :deep(.ql-container) {
  border-radius: 0 0 4px 4px;
  height: 250px;
  flex: 1;
}

.quill-vertical-container :deep(.ql-formats) {
  margin-right: 8px;
}

.pagination {
  margin-top: 20px;
  text-align: right;
}

.department-select .el-select-dropdown__item {
  white-space: nowrap;
  overflow: visible;
  text-overflow: unset;
  padding-right: 20px;
}

.department-select {
  max-width: none !important;
}
</style>