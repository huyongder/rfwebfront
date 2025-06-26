# Login

- 登录接口：/auth/login POST {"username": "admin", "password": "123456"}
- 登录成功返回：{"token":eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJodWltZW5nIiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNzQ4NDAwNzEzfQ.MqTWPGPaLMWWCJgGm_2CE3dpF4PjFizjjB3Tt--YSmY"
  }

# 权限

#后台管理模块 左侧菜单栏

- 新闻管理 **/auth/news**
  - **/edit** 编辑新闻
  - **/list** 新闻列表

# 前端install

- npm install pinia // 安装pinia进行库管理

# 后端接口说明
1、图片上传：http://localhost:8080/api/upload?type=newsPhoto POST   实现于：rfwebbackend/controller/Photos/FileUploadController.java  
type类型： 
* newsPhoto 新闻内部图片  
* coverNewsPhoto 新闻展示配套图片
* designerPhoto 设计师图片
* largePhoto 首页大图
* buildPhoto 工地展示首页图片
* complainPhoto 投诉图片
* dirStorePhoto 直营门店图片
* goodCasePhoto 优秀案例图片  

返回值：  
        {  
        "url": "http://localhost:8080/uploads/largePhotos/202372210380_370.jpg",  
        "filename": "202372210380_370.jpg",  
        "size": 519532,  
        "type": "largePhoto"  
        },