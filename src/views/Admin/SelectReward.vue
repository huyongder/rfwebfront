<template>
  <div class="reward-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span class="card-title">奖惩记录</span>
        </div>
      </template>

      <!-- 查询表单 -->
      <el-form :inline="true" :model="queryParams" class="search-form">
        <el-form-item label="姓名">
          <el-input v-model="queryParams.title" placeholder="请输入姓名" clearable />
        </el-form-item>
        <el-form-item label="部门">
          <el-select
            v-model="queryParams.department"
            placeholder="请选择部门"
            clearable
            filterable
            style="width: 200px"
            popper-class="department-select"
          >
            <el-option
              v-for="item in departments"
              :key="item.name"
              :label="item.name"
              :value="item.name"
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
        :row-style="{ height: '60px' }"
        :header-cell-style="{ background: '#f5f7fa', color: '#606266' }"
        :span-method="spanMethod"
      >
        <el-table-column prop="title" label="姓名" min-width="120" />
        <el-table-column prop="departmentName" label="部门" min-width="150" />
        <el-table-column prop="recordDate" label="日期" min-width="120" />
        <el-table-column prop="type" label="类型" min-width="100">
          <template #default="scope">
            <el-tag :type="scope.row.type === 1 ? 'success' : 'danger'">
              {{ scope.row.type === 1 ? '奖励' : '惩罚' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="奖惩内容" min-width="300">
          <template #default="scope">
            <div v-html="scope.row.content"></div> 
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
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const tableData = ref([])
const departments = ref([])
const dateRange = ref([])
const total = ref(0)
const rewardCount = ref(0)
const punishCount = ref(0)
const spanArr = ref([])

const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  title: '',
  department: null,
  startDate: null,
  endDate: null,
  type: null,
})

const tableDataWithDepartmentName = computed(() => {
  return tableData.value.map(item => ({
    ...item,
    departmentName: item.department || '未知部门' // 直接显示department字段
  }));
});

const spanMethod = ({ rowIndex, columnIndex }) => {
  if (columnIndex === 1) {
    const _row = spanArr.value[rowIndex]
    const _col = _row > 0 ? 1 : 0
    return {
      rowspan: _row,
      colspan: _col,
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
      if (item.department === data[index - 1].department) {
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
      params: queryParams.value,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    tableData.value = res.data.data.list
    total.value = res.data.data.total
    handleSpanData(tableData.value)

    rewardCount.value = tableData.value.filter((item) => item.type === 1).length
    punishCount.value = tableData.value.filter((item) => item.type === 2).length
  } catch (error) {
    console.log(error)
    ElMessage.error('获取奖惩记录失败')
  }
}

const fetchDepartments = async () => {
  try {
    const res = await axios.get('/api/department', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
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
    department: null,
    startDate: null,
    endDate: null,
    type: null,
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

onMounted(async () => {
  await fetchDepartments() // 先加载部门数据
  await fetchData() // 再加载表格数据
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

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #f5f7fa !important;
}

.el-form-item__label {
  font-weight: bold;
  color: #606266;
  padding-bottom: 8px !important;
}

.el-input__inner,
.el-textarea__inner {
  border-radius: 4px;
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
