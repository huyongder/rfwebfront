/*
 * @Descripttion: quill富文本编辑器集成工具
 * @Author: huimeng
 * @Date: 2025-05-28 15:06:10
 * @LastEditors: huimeng
 * @LastEditTime: 2025-07-11 10:21:54
 */
/*
 * @Descripttion: quill富文本编辑器集成工具（灵活版本）
 */
import { Quill } from '@vueup/vue-quill'
import ImageUploader from 'quill-image-uploader'

class DynamicQuill {
  /**
   * 初始化Quill配置
   * @param {Object} options
   * @param {Function} options.onImageUpload - 图片上传处理器
   * @param {Function} options.onVideoUpload - 视频上传处理器
   * @param {Function} options.onFileUpload - 文件上传处理器
   * @param {Function} options.onSave - 保存处理器
   * @param {Array} options.toolbar - 自定义工具栏配置
   */
  static init(options = {}) {
    // 注册必要的模块
    Quill.register('modules/imageUploader', ImageUploader)

    return {
      theme: 'snow',
      modules: {
        toolbar: {
          container: options.toolbar || this._getDefaultToolbar(),
          handlers: {
            image: () => this._handleMediaUpload('image', options.onImageUpload),
            video: () => this._handleMediaUpload('video', options.onVideoUpload),
            file: () => this._handleMediaUpload('file', options.onFileUpload),
            save: () => options.onSave?.(Quill.root.innerHTML)
          }
        },
        imageUploader: {
          upload: (file) => options.onImageUpload?.(file)
        }
      }
    }
  }

  /**
   * 处理媒体文件上传
   */
  static async _handleMediaUpload(type, uploadHandler) {
    if (!uploadHandler) {
      console.warn(`未提供${type}上传处理器`)
      return
    }

    const input = document.createElement('input')
    input.type = 'file'
    input.accept = this._getAcceptType(type)
    input.onchange = async (e) => {
      const file = e.target.files[0]
      if (!file) return

      try {
        const url = await uploadHandler(file)
        const quill = Quill.find(document.querySelector('.ql-editor'))
        const range = quill.getSelection()
        quill.insertEmbed(range.index, type, url)
      } catch (error) {
        console.error(`${type}上传失败:`, error)
      }
    }
    input.click()
  }

  static _getDefaultToolbar() {
    return [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      ['image', 'video', 'file'],
      [{ type: 'save', label: '保存内容' }]
    ]
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
