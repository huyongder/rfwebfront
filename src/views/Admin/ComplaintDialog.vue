<template>
  <div class="complaint-management">
    <h1>投诉管理</h1>

    <!-- 批量操作工具栏 -->
    <div class="batch-toolbar" v-if="selectedComplaints.length > 0">
      <el-button type="danger" size="small" @click="batchDelete">
        批量删除 ({{ selectedComplaints.length }})
      </el-button>
    </div>

    <!-- 投诉列表表格 -->
    <el-table
      :data="complaints"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" width="80">
        <template #default="{ $index }">
          {{ (currentPage - 1) * pageSize + $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100" />
      <el-table-column prop="phone" label="手机号" width="130" />
      <el-table-column prop="address" label="地址" width="180" />
      <el-table-column prop="type" label="类型" width="100" />
      <el-table-column prop="description" label="描述" min-width="300" />
      <el-table-column prop="createTime" label="创建时间" width="160">
        <template #default="{row}">
          {{ formatDate(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{row}">
          <el-tag :type="row.status === 'PROCESSED' ? 'success' : 'danger'">
            {{ row.status === 'PROCESSED' ? '已处理' : '未处理' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" fixed="right">
        <template #default="{row}">
          <div class="action-buttons">
            <el-button size="small" @click="showDetail(row)">详情</el-button>
            <el-button
              size="small"
              :type="row.status === 'UNPROCESSED' ? 'success' : 'info'"
              @click="updateStatus(row.complaintId)"
            >
              {{ row.status === 'UNPROCESSED' ? '标记为已处理' : '已处理' }}
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="deleteComplaint(row.complaintId)"
            >
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页控件 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="fetchComplaints"
        @current-change="fetchComplaints"
      />
    </div>

    <!-- 投诉详情对话框 -->
    <el-dialog v-model="detailVisible" title="投诉详情" width="70%">
      <div v-if="currentComplaint">
        <el-descriptions border :column="2">
          <el-descriptions-item label="姓名">{{ currentComplaint.name }}</el-descriptions-item>
          <el-descriptions-item label="手机号">{{ currentComplaint.phone }}</el-descriptions-item>
          <el-descriptions-item label="地址">{{ currentComplaint.address }}</el-descriptions-item>
          <el-descriptions-item label="类型">{{ currentComplaint.type }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="currentComplaint.status === 'PROCESSED' ? 'success' : 'danger'">
              {{ currentComplaint.status === 'PROCESSED' ? '已处理' : '未处理' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ formatDate(currentComplaint.createTime) }}</el-descriptions-item>
          <el-descriptions-item label="处理时间" v-if="currentComplaint.status === 'PROCESSED'">
            {{ formatDate(currentComplaint.processedTime) }}
          </el-descriptions-item>
        </el-descriptions>

        <h3 style="margin-top: 20px;">投诉描述</h3>
        <el-input
          type="textarea"
          :rows="5"
          v-model="currentComplaint.description"
          readonly
        />

        <h3 style="margin-top: 20px;">相关图片</h3>
        <div class="image-list" v-if="images.length > 0">
          <el-image
            v-for="(image, index) in images"
            :key="index"
            :src="image.imageUrl"
            :preview-src-list="images.map(img => img.imageUrl)"
            fit="cover"
            style="width: 150px; height: 150px; margin-right: 10px;"
          />
        </div>
        <el-empty description="无相关图片" v-else />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

export default {
  name: 'ComplaintManagement',
  data() {
    return {
      complaints: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      detailVisible: false,
      currentComplaint: null,
      images: [],
      selectedComplaints: [] // 存储选中的投诉项
    };
  },
  mounted() {
    this.fetchComplaints();
  },
  methods: {
    async fetchComplaints() {
      try {
        const response = await axios.get('/api/complaints/list', {
        params: {
          page: this.currentPage,
          size: this.pageSize,
          sortField: 'complaintId',
          sortOrder: 'desc'
        }
      });
      this.complaints = response.data.records;
      this.total = response.data.total;
      } catch (error) {
        ElMessage.error('获取投诉列表失败: ' + error.message);
      }
    },

    // 处理选中项变化
    handleSelectionChange(val) {
      this.selectedComplaints = val;
    },

    // 批量删除
    async batchDelete() {
      try {
        await ElMessageBox.confirm(`确定要删除选中的${this.selectedComplaints.length}条投诉记录吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });

        const ids = this.selectedComplaints.map(item => item.complaintId);
        await axios.post('/api/complaints/batch-delete', ids , {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        ElMessage.success('批量删除成功');
        this.selectedComplaints = [];
        this.fetchComplaints();
      } catch (error) {
        if (error !== 'cancel') {
          ElMessage.error('批量删除失败: ' + error.message);
        }
      }
    },

    async updateStatus(complaintId) {
      try {
        await axios.post(`/api/complaints/update-status/${complaintId}`,null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        ElMessage.success('状态更新成功');
        this.fetchComplaints();
      } catch (error) {
        ElMessage.error('更新状态失败: ' + error.message);
      }
    },

    async deleteComplaint(complaintId) {
      try {
        await ElMessageBox.confirm('确定要删除这条投诉记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });

        await axios.delete(`/api/complaints/delete/${complaintId}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        ElMessage.success('删除成功');
        this.fetchComplaints();
      } catch (error) {
        if (error !== 'cancel') {
          ElMessage.error('删除失败: ' + error.message);
        }
      }
    },

    async showDetail(complaint) {
      this.currentComplaint = complaint;
      this.detailVisible = true;

      try {
        const response = await axios.get(`/api/complaints/images/${complaint.complaintId}`);
        this.images = response.data;
      } catch (error) {
        this.images = [];
        console.error('获取图片失败:', error);
      }
    },

    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleString();
    }
  }
};
</script>

<style scoped>
.complaint-management {
  padding: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.image-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.batch-toolbar {
  margin-bottom: 15px;
}
</style>