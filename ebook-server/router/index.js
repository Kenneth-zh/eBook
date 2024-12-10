const express = require('express')
const boom = require('boom')
const Result = require('../Models/Result')
const userRouter = require('./user')
const jwtAuth = require('./jwt')
const bookRouter = require('./book')

// 注册路由
const router = express.Router()
router.use(jwtAuth)

router.get('/', function(req, res) {
  res.send('后台服务器启动成功')
})

// 通过 userRouter 来处理 /user 路由，对路由处理进行解耦
router.use('/user', userRouter)
router.use('/book',bookRouter)


/**
 * 集中处理404请求的中间件
 */
router.use((req, res, next) => {
  next(boom.notFound('接口不存在'))
})

/**
 * 自定义路由异常处理中间件
 */
router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    new Result(null, 'token失效', {
      error: err.status,
      errorMsg: err.name
    }).expired(res.status(err.status))
  } else {
    const msg = (err && err.message) || '系统错误'
    const statusCode = (err.output && err.output.statusCode) || 500;
    const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message
    new Result(null, msg, {
      error: statusCode,
      errorMsg
    }).fail(res.status(statusCode))
  }
})


module.exports = router