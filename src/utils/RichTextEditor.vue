<template>
  <div class="quill-editor-container">
    <quill-editor
      ref="editor"
      v-model:content="content"
      contentType="html"
      :options="editorOptions"
      :formats="formats"
      @ready="onEditorReady"
    />
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import Quill from 'quill'

// 注册字体大小模块
const Size = Quill.import('attributors/style/size')
Size.whitelist = ['12px', '14px', '16px', '18px', '20px', '24px', '32px', '48px']
Quill.register(Size, true)

// 注册中文字体模块
const Font = Quill.import('attributors/style/font')
Font.whitelist = [
  'Arial',
  'Microsoft YaHei',
  'SimSun',
  'SimHei',
  'KaiTi',
  'sans-serif',
  'serif',
  'monospace'
]
Quill.register(Font, true)

// 注册对齐模块
const Align = Quill.import('attributors/style/align')
Quill.register(Align, true)

export default {
  name: 'RichTextEditor',
  components: {
    QuillEditor
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    imageUploadPath: {
      type: String,
      default: '/api/upload?type=defaultImage'
    },
    videoUploadPath: {
      type: String,
      default: '/api/upload?type=defaultVideo'
    },
    placeholder: {
      type: String,
      default: '请输入内容...'
    },
    maxImageWidth: {
      type: Number,
      default: 650
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      content: this.modelValue,
      formats: [
        'align',
        'background',
        'bold',
        'color',
        'font',
        'size',
        'code',
        'italic',
        'link',
        'strike',
        'script',
        'underline',
        'blockquote',
        'header',
        'indent',
        'list',
        'direction',
        'code-block',
        'image',
        'video'
      ],
      editorOptions: {
        modules: {
          toolbar: {
            container: [
              [{ 'font': Font.whitelist }],
              [{ 'size': Size.whitelist }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              ['link', 'image', 'video'],
              ['clean']
            ],
            handlers: {
              image: this.imageHandler,
              video: this.videoHandler
            }
          }
        },
        placeholder: this.placeholder,
        theme: 'snow'
      },
      quillInstance: null
    }
  },
  watch: {
    modelValue(newVal) {
      if (newVal !== this.content) {
        this.content = newVal
      }
    },
    content(newVal) {
      this.$emit('update:modelValue', newVal)
    }
  },
  methods: {
    onEditorReady(editor) {
      this.quillInstance = editor
    },

    async imageHandler() {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.click()

      input.onchange = async () => {
        const file = input.files[0]
        if (!file) return

        try {
          // 压缩图片
          const compressedFile = await this.compressImage(file, this.maxImageWidth)

          const formData = new FormData()
          formData.append('file', compressedFile)

          const response = await fetch(this.imageUploadPath, {
            method: 'POST',
            headers: {
              authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: formData,
          })

          if (!response.ok) throw new Error('图片上传失败')

          const data = await response.json()
          const imageUrl = data.url

          const range = this.quillInstance.getSelection()
          this.quillInstance.insertEmbed(range.index, 'image', imageUrl)

          // 添加响应式样式类
          this.quillInstance.formatText(range.index, 1, 'class', 'responsive-image')

          this.quillInstance.formatLine(range.index, 1, 'align', 'center')
          this.quillInstance.setSelection(range.index + 1)
        } catch (error) {
          console.error('图片上传失败:', error)
          alert('图片上传失败: ' + error.message)
        }
      }
    },

    videoHandler() {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'video/*')
      input.click()

      input.onchange = async () => {
        const file = input.files[0]
        if (!file) return

        try {
          const formData = new FormData()
          formData.append('file', file)

          const response = await fetch(this.videoUploadPath, {
            method: 'POST',
            headers: {
              authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: formData,
          })

          if (!response.ok) throw new Error('视频上传失败')

          const data = await response.json()
          const videoUrl = data.url

          const range = this.quillInstance.getSelection()
          this.quillInstance.insertEmbed(range.index, 'video', videoUrl)
          this.quillInstance.formatLine(range.index, 1, 'align', 'center')
          this.quillInstance.setSelection(range.index + 1)
        } catch (error) {
          console.error('视频上传失败:', error)
          alert('视频上传失败: ' + error.message)
        }
      }
    },

    // 图片压缩方法
    compressImage(file, maxWidth, quality = 0.8) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          const img = new Image()
          img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            // 计算新尺寸
            let width = img.width
            let height = img.height

            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width)
              width = maxWidth
            }

            // 设置canvas尺寸
            canvas.width = width
            canvas.height = height

            // 绘制压缩后的图片
            ctx.drawImage(img, 0, 0, width, height)

            // 转换为Blob
            canvas.toBlob((blob) => {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              })
              resolve(compressedFile)
            }, 'image/jpeg', quality)
          }
          img.src = event.target.result
        }
        reader.readAsDataURL(file)
      })
    }
  }
}
</script>

<style scoped>
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
</style>

<style>
/* 以下是必须的全局样式 */

/* 1. 移除 ql-align-center 的 margin 导致的图片间空白 */
.ql-align-center {
  margin: 0 !important;
}

/* 2. 字体大小下拉菜单样式 */
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before {
  content: "12px";
  font-size: 12px !important;
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14px"]::before {
  content: "14px";
  font-size: 14px !important;
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before {
  content: "16px";
  font-size: 16px !important;
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="18px"]::before {
  content: "18px";
  font-size: 18px !important;
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before {
  content: "20px";
  font-size: 20px !important;
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="24px"]::before {
  content: "24px";
  font-size: 24px !important;
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="32px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="32px"]::before {
  content: "32px";
  font-size: 32px !important;
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="48px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="48px"]::before {
  content: "48px";
  font-size: 48px !important;
}

/* 3. 中文字体下拉菜单样式 */
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Arial"]::before {
  content: "Arial";
  font-family: "Arial";
}

.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Microsoft YaHei"]::before {
  content: "微软雅黑";
  font-family: "Microsoft YaHei";
}

.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimSun"]::before {
  content: "宋体";
  font-family: "SimSun";
}

.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimHei"]::before {
  content: "黑体";
  font-family: "SimHei";
}

.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="KaiTi"]::before {
  content: "楷体";
  font-family: "KaiTi";
}

/* 4. 确保下拉菜单标签也显示正确 */
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Arial"]::before {
  content: "Arial";
  font-family: "Arial";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Microsoft YaHei"]::before {
  content: "微软雅黑";
  font-family: "Microsoft YaHei";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimSun"]::before {
  content: "宋体";
  font-family: "SimSun";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimHei"]::before {
  content: "黑体";
  font-family: "SimHei";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="KaiTi"]::before {
  content: "楷体";
  font-family: "KaiTi";
}

/* 5. 确保编辑器内容应用字体 */
.ql-font-microsoft yahei {
  font-family: "Microsoft YaHei";
}
.ql-font-simsun {
  font-family: "SimSun";
}
.ql-font-simhei {
  font-family: "SimHei";
}
.ql-font-kaiti {
  font-family: "KaiTi";
}

/* 响应式图片样式 */
.ql-editor .responsive-image {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

/* 确保图片和视频默认居中 */
.ql-editor img,
.ql-editor video {
  display: block;
  margin: 0 auto;
  max-width: 100%;
}

/* PC端特定样式 */
@media (min-width: 768px) {
  .ql-editor .responsive-image {
    max-width: 650px;
  }
}

/* 移动端自适应 */
@media (max-width: 767px) {
  .ql-editor .responsive-image {
    max-width: 100%;
    width: auto;
  }
}
</style>