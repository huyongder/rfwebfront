<!--
 * @Descripttion: 
 * @Author: huimeng
 * @Date: 2025-05-26 14:55:01
 * @LastEditors: huimeng
 * @LastEditTime: 2025-05-26 14:55:07
-->
<template>
  <el-dialog v-model="visible" :title="store ? '编辑门店' : '新增门店'" width="800px">
    <el-form :model="form" label-width="80px">
      <el-form-item label="门店名称" required>
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="门店简介">
        <el-input v-model="form.introduction" type="textarea" />
      </el-form-item>
      <el-form-item label="门店详情">
        <QuillEditor
          v-model:content="form.detail"
          contentType="html"
          theme="snow"
          style="height: 300px"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { saveStore } from '@/api/store'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: Boolean,
  store: Object,
})

const emit = defineEmits(['update:modelValue', 'refresh'])

const visible = ref(false)
const form = ref({
  id: null,
  name: '',
  introduction: '',
  detail: '',
})

watch(
  () => props.modelValue,
  (val) => {
    visible.value = val
    if (val && props.store) {
      form.value = { ...props.store }
    } else if (val) {
      form.value = {
        id: null,
        name: '',
        introduction: '',
        detail: '',
      }
    }
  },
)

watch(visible, (val) => {
  emit('update:modelValue', val)
})

const handleSubmit = async () => {
  if (!form.value.name) {
    ElMessage.warning('请输入门店名称')
    return
  }

  try {
    await saveStore(form.value)
    ElMessage.success('保存成功')
    visible.value = false
    emit('refresh')
  } catch (error) {
    ElMessage.error('保存失败')
    console.log(error)
  }
}
</script>
