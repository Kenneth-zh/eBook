# E-book电子书管理系统

#### 介绍
E-book电子书后台管理系统，完成了用户登录，文件上传，EPUB电子书解析，电子书列表，电子书新增、删除、编辑、查询等功能模块

#### 技术栈
vue + vue-router + vuex + webpack + elementUI + Node.js + Express 


#### 项目预览地址

http://106.53.107.136/

#### 目录结构 

```
├── /src/            # 源码目录
│ ├── /api/          # axios请求定义
│ ├── /assets/       # 组件静态资源(图片)
│ ├── /components/   # 公共组件
| ├── /directive/    # 自定义指令
│ ├── /filters/      # 过滤器
│ ├── /icons/        # svg矢量图片文件
│ ├── /layout/       # 布局组件
│ ├── /router/       # 路由配置
│ ├── /store/        # vuex的状态管理
│ ├── /styles/       # 全局css样式
│ ├── /utils/        # 工具类 
│ └── /views/        # 前端页面

```

#### 部分功能模块截图

登录
![输入图片说明](https://images.gitee.com/uploads/images/2020/1223/155024_7be166a5_7644054.png "PX@1[0QRX7(RCDIH}1V{8A8.png")


上传电子书
![输入图片说明](https://images.gitee.com/uploads/images/2020/1223/155214_e373ad8c_7644054.png "LPQA30ET0FEYEZ13``05(C8.png")
![输入图片说明](https://images.gitee.com/uploads/images/2020/1223/155228_aaf9b6d5_7644054.png "KLRGGB(L0VZK83AO[L0DP}J.png")


电子书解析
![输入图片说明](https://images.gitee.com/uploads/images/2020/1223/155252_8cf1b8ae_7644054.png "8W7Q%3]~0}BB@QODQ]L(H[H.png")


电子书列表
![输入图片说明](https://images.gitee.com/uploads/images/2020/1223/155321_ffba41ad_7644054.png "L41H3P}0YB~7YMUCYVVR9EI.png")


电子书的删除、编辑等功能
![输入图片说明](https://images.gitee.com/uploads/images/2020/1223/155408_ae8e732b_7644054.png "A8V$H0RM](3XH8KJH~_VMDC.png")



#### 运行项目
------------------------
```
ebook-web前端部分

# 安装依赖
npm install

# 运行项目
npm run dev

ebook-server后端部分

# 安装依赖
npm install

# 开启服务器
node app.js

该项目访问的接口已部署到云服务器，若要改为访问本地接口，下载并安装node：https://nodejs.org/dist/v12.14.0/node-v12.14.0-x64.msi，
并将config/dev.env.js文件中的baseURL改为http://localhost:5000即可;

```

#### 电子书资源下载

百度网盘链接：https://pan.baidu.com/s/1xvHJigSpztAAmC1_T0010g 
提取码：ab23 
