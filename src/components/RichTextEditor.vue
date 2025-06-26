<!--
 * @Descripttion:富文本编辑器组件
 * @Author: huimeng
 * @Date: 2025-03-03 16:36:50
 * @LastEditors: huimeng
 * @LastEditTime: 2025-05-26 14:29:45
-->

<template>
  <div class="editor-container">
    <!-- 左侧页面列表 -->
    <!-- <div class="sidebar">
      <h3>已创建的界面</h3>
      <ul>
        <li v-for="page in pages" :key="page.id">
          <router-link :to="`/editor/${page.id}`"> {{ page.id }} - {{ page.title }} </router-link>
          <div class="actions">
            <button @click="editPage(page.id)" class="edit-button">修改</button>
            <button @click="deletePage(page.id)" class="delete-button">删除</button>
          </div>
        </li>
      </ul>
      <router-link to="/editor" class="new-page-link">+ 创建新页面</router-link>
    </div> -->

    <!-- 右侧编辑器 -->
    <div class="editor-content">
      <h2>富文本编辑器</h2>
      <div class="title-input">
        <label for="title">标题：</label>
        <input type="text" id="title" v-model="title" placeholder="请输入标题" />
      </div>
      <div ref="editor" class="quill-editor"></div>
      <!-- <button @click="saveContent">保存</button> -->
    </div>
  </div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import axios from 'axios'

export default {
  data() {
    return {
      quill: null,
      title: '',
      content: '',
      pageId: this.$route.params.id || '', // 从路由中获取页面 ID
      pages: [], // 存储已创建的页面列表
    }
  },
  watch: {
    // 监听路由变化，当路由中的 id 变化时重新加载内容
    '$route.params.id': function (newId) {
      this.pageId = newId || ''
      this.fetchContent()
    },
  },
  mounted() {
    this.initQuill()
    // this.fetchContent()
    // this.fetchPages() // 加载已创建的页面列表
  },
  methods: {
    // 初始化 Quill 编辑器
    initQuill() {
      this.quill = new Quill(this.$refs.editor, {
        theme: 'snow',
        modules: {
          toolbar: [
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
            ['image'],
          ],
        },
      })
      // 监听图片上传事件
      this.quill.getModule('toolbar').addHandler('image', () => {
        this.uploadImage()
      })
    },
    // 加载页面内容
    // async fetchContent() {
    //   if (this.pageId) {
    //     try {
    //       const response = await fetch(`http://localhost:8080/api/pages/get?id=${this.pageId}`)
    //       if (!response.ok) {
    //         throw new Error('加载页面内容失败')
    //       }
    //       const result = await response.json()
    //       this.title = result.title
    //       this.quill.root.innerHTML = result.content
    //     } catch (error) {
    //       console.error('加载失败：', error)
    //     }
    //   } else {
    //     this.title = ''
    //     this.quill.root.innerHTML = ''
    //   }
    // },
    // 加载页面列表
    // async fetchPages() {
    //   try {
    //     const response = await fetch('http://localhost:8080/api/pages/list')
    //     if (!response.ok) {
    //       throw new Error('加载页面列表失败')
    //     }
    //     this.pages = await response.json()
    //   } catch (error) {
    //     console.error('加载页面列表失败：', error)
    //   }
    // },
    // 保存页面
    // async saveContent() {
    //   const content = this.quill.root.innerHTML
    //   const title = this.title
    //   try {
    //     const response = await fetch('http://localhost:8080/api/pages/save', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ title, content }),
    //     })
    //     if (!response.ok) {
    //       throw new Error('保存失败')
    //     }
    //     alert('保存成功！')
    //     this.fetchPages() // 保存后重新加载页面列表
    //     const result = await response.json()
    //     this.$router.push(`/editor/${result.id}`) // 跳转到新创建的页面
    //   } catch (error) {
    //     console.error('保存失败：', error)
    //   }
    // },
    // 修改页面
    // async editPage(id) {
    //   this.$router.push(`/editor/${id}`) // 跳转到编辑页面
    // },
    // 删除页面
    // async deletePage(id) {
    //   if (confirm('确定要删除该页面吗？')) {
    //     try {
    //       const response = await fetch(`http://localhost:8080/api/pages/delete?id=${id}`, {
    //         method: 'DELETE',
    //       })
    //       if (!response.ok) {
    //         throw new Error('删除失败')
    //       }
    //       alert('删除成功！')
    //       this.fetchPages() // 删除后重新加载页面列表
    //       if (this.pageId === id) {
    //         this.$router.push('/editor') // 如果删除的是当前页面，跳转到创建新页面
    //       }
    //     } catch (error) {
    //       console.error('删除失败：', error)
    //     }
    //   }
    // },

    // 上传图片
    async uploadImage() {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.click()

      input.onchange = async () => {
        const file = input.files[0]
        if (file) {
          const formData = new FormData()
          formData.append('file', file)

          try {
            const response = await axios.post(
              '/api/upload/newsimage',
              formData,
            )

            // 注意 axios 的响应数据在 response.data 中
            const url = response.data
            console.log('图片上传成功，URL：', url)

            // 确保编辑器已聚焦
            this.quill.focus()

            // 获取当前光标位置
            const range = this.quill.getSelection()
            const index = range ? range.index : this.quill.getLength()

            // 插入图片
            this.quill.insertEmbed(index, 'image', url)

            // 将光标移动到图片后面
            this.quill.setSelection(index + 1)
          } catch (error) {
            // 错误处理（axios 的错误对象更结构化）
            if (error.response) {
              // 服务器返回了非 2xx 状态码
              console.error('服务器错误：', error.response.data)
            } else if (error.request) {
              // 请求已发出但无响应
              console.error('网络错误：', error.message)
            } else {
              // 其他错误
              console.error('请求配置错误：', error.message)
            }
          }
        }
      }
    },
  },
}
</script>

<style scoped>
.editor-container {
  display: flex;
  margin: 20px;
}

.sidebar {
  width: 250px;
  margin-right: 20px;
  padding: 10px;
  border-right: 1px solid #ccc;
}

.sidebar h3 {
  margin-bottom: 10px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.sidebar li:hover {
  background-color: #f5f5f5;
}

.sidebar a {
  text-decoration: none;
  color: inherit;
}

.sidebar a:hover {
  text-decoration: underline;
}

.new-page-link {
  display: block;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
}

.new-page-link:hover {
  text-decoration: underline;
}

.actions {
  display: flex;
  gap: 5px;
}

.editor-content {
  flex: 1;
}

.title-input {
  margin-bottom: 20px;
}

.title-input label {
  font-weight: bold;
}

.title-input input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.quill-editor {
  height: 400px;
  margin-bottom: 20px;
}

button {
  margin-right: 10px;
}

.edit-button {
  background-color: #4caf50;
  color: white;
}

.delete-button {
  background-color: #ff4d4f;
  color: white;
}
</style>
