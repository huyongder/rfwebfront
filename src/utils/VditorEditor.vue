<template>
  <div ref="editorContainer" class="vditor-container"></div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch, defineProps, defineEmits } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

export default {
  name: 'VditorEditor',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    uploadUrl: {
      type: String,
      default: '/api/upload'
    },
    placeholder: {
      type: String,
      default: '请输入内容...'
    },
    maxFileSize: {
      type: Number,
      default: 10 // MB
    }
  },
  emits: ['update:modelValue', 'upload-success', 'upload-error'],
  setup(props, { emit }) {
    const editorContainer = ref(null)
    const vditorInstance = ref(null)

    // 初始化编辑器
    onMounted(() => {
      vditorInstance.value = new Vditor(editorContainer.value, {
        height: 500,
        mode: 'wysiwyg',
        value: props.modelValue,
        placeholder: props.placeholder,
        upload: {
          url: props.uploadUrl,
          max: props.maxFileSize * 1024 * 1024,
          accept: 'image/*,video/*',
          handler(files) {
            const file = files[0]
            if (!file) return Promise.resolve('')

            const formData = new FormData()
            formData.append('file', file)

            return fetch(props.uploadUrl, {
              method: 'POST',
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
              },
              body: formData
            })
              .then(response => {
                if (!response.ok) throw new Error('上传失败')
                return response.json()
              })
              .then(data => {
                const fileUrl = data.url || data.data?.url
                if (!fileUrl) throw new Error('无法获取文件URL')

                emit('upload-success', {
                  url: fileUrl,
                  response: data,
                  fileName: file.name
                })

                return fileUrl
              })
              .catch(error => {
                console.error('上传失败:', error)
                emit('upload-error', {
                  error: error.message,
                  fileName: file?.name
                })
                throw error
              })
          },
          filename: (name) => {
            const ext = name.split('.').pop()
            return `${Date.now()}.${ext}`
          }
        },
        toolbar: [
          'emoji',
          'headings',
          'bold',
          'italic',
          'strike',
          '|',
          'color',
          'background',
          '|',
          'align-left',
          'align-center',
          'align-right',
          '|',
          'list',
          'ordered-list',
          'check',
          '|',
          'quote',
          'code',
          'inline-code',
          '|',
          'link',
          'image',
          'video',
          '|',
          'table',
          '|',
          'undo',
          'redo',
          '|',
          'fullscreen'
        ],
        input: (value) => {
          emit('update:modelValue', value)
        },
        after: () => {
          console.log('Vditor 初始化完成')
        }
      })
    })

    // 监听内容变化
    watch(() => props.modelValue, (newValue) => {
      if (vditorInstance.value && newValue !== vditorInstance.value.getValue()) {
        vditorInstance.value.setValue(newValue)
      }
    })

    // 组件卸载时销毁编辑器
    onBeforeUnmount(() => {
      if (vditorInstance.value) {
        vditorInstance.value.destroy()
      }
    })

    return {
      getContent: () => vditorInstance.value?.getValue() || '',
      getHTML: () => vditorInstance.value?.getHTML() || '',
      insertContent: (content) => {
        if (vditorInstance.value) {
          vditorInstance.value.insertValue(content)
        }
      }
    }
  }
}
</script>

<style scoped>
.vditor-container {
  height: 500px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}
</style>

<style>
/* 全局样式调整 */
.vditor-toolbar {
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  padding: 8px;
}

.vditor-content img,
.vditor-content video {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 10px auto;
}

@media (max-width: 768px) {
  .vditor-toolbar {
    flex-wrap: wrap;
    height: auto;
  }

  .vditor-toolbar__item {
    margin-bottom: 5px;
  }
}
</style>