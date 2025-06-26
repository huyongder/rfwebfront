/*
 * @Descripttion: quill富文本编辑器集成工具
 * @Author: huimeng
 * @Date: 2025-05-28 15:06:10
 * @LastEditors: huimeng
 * @LastEditTime: 2025-06-06 14:00:34
 */
import { Quill } from '@vueup/vue-quill'
import ImageUploader from 'quill-image-uploader'
import axios from 'axios'

class DynamicQuill {
  static config = {
    endpoints: {
      image: '/api/upload/image',
      video: '/api/upload/video',
      file: '/api/upload/file',
      save: '/api/content/save', // 默认保存接口
    },
  }

  static init(options = {}) {
    this.config.endpoints = { ...this.config.endpoints, ...options.endpoints }

    Quill.register('modules/imageUploader', ImageUploader)

    return {
      theme: 'snow',
      modules: {
        toolbar: {
          container: [
            ['bold', 'italic'],
            ['image', 'video', 'file'],
            [{ type: 'save', label: '保存' }],
          ],
          handlers: {
            image: this._createUploadHandler('image'),
            video: this._createUploadHandler('video'),
            file: this._createUploadHandler('file'),
            save: this.handleSave,
          },
        },
        imageUploader: { upload: this._universalUpload },
      },
    }
  }

  static _createUploadHandler(type) {
    return () => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = this._getAcceptType(type)
      input.onchange = (e) => this._handleFileSelect(e, type)
      input.click()
    }
  }

  static async _handleFileSelect(event, type) {
    const file = event.target.files[0]
    try {
      const url = await this._universalUpload(file, type)
      const quill = Quill.find(document.querySelector('.ql-editor'))
      const range = quill.getSelection()
      quill.insertEmbed(range.index, type, url)
    } catch (error) {
      console.error(`${type}上传失败:`, error)
    }
  }

  static async _universalUpload(file, type) {
    const formData = new FormData()
    formData.append('file', file)

    const response = await axios.post(this.config.endpoints[type], formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return response.data.url // 假设接口返回标准化结构
  }

  static handleSave() {
    const content = Quill.root.innerHTML
    axios.post(this.config.endpoints.save, { content })
  }

  static _getAcceptType(type) {
    const types = { 
      image: 'image/*',
      video: 'video/*',
      file: '.doc,.docx,.pdf,.xls,.xlsx',
    }
    return types[type] || '*/*'
  }
}

export default DynamicQuill
