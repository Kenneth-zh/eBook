# E-book电子书管理系统

#### 数据库初始化
```
CREATE TABLE admin_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO admin_user (username, password) VALUES ('admin', 'f315515a2ce0a887dd1cc0e00cdca0e4');

CREATE TABLE book (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publisher VARCHAR(255),
    fileName VARCHAR(255) NOT NULL,
    categoryText VARCHAR(255),
    updateType INT,
    createUser VARCHAR(255),
    createDt DATETIME,
    cover VARCHAR(255)
);

CREATE TABLE contents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fileName VARCHAR(255) NOT NULL,
    href VARCHAR(255),
    `order` INT,
    level INT,
    text VARCHAR(255),
    label VARCHAR(255),
    pid VARCHAR(255),
    navId VARCHAR(255)
);

CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoryText VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    num INT
);

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE shelf (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE rank (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
```


#### 介绍
E-book电子书后台管理系统，完成了用户登录，文件上传，EPUB电子书解析，电子书列表，电子书新增、删除、编辑、查询等功能模块

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

