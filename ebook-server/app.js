const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
const cors = require('cors')



// 创建 express 应用
const app = express()

// 监听 / 路径的 get 请求
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', router)


// 使 express 监听 5000 端口号发起的 http 请求
const server = app.listen(5001, function () {
    const { address, port } = server.address()
    console.log('Http Server is running on http://%s:%s', address, port)
})