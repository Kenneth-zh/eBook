const express = require('express')

const {
  md5,decode
} = require('../utils')
const {
  PWD_SALT
} = require('../utils/constant')
const {
  login,findUser
} = require('../service/user')
const Result = require('../Models/Result')
const {
  body,
  validationResult
} = require('express-validator')
const boom = require('boom')
const jwt = require('jsonwebtoken')
const {
  PRIVATE_KEY,
  JWT_EXPIRED
} = require('../utils/constant')
const router = express.Router()


router.post(
  '/login',
  [
    body('username').isString().withMessage('用户名必须为字符'),
    body('password').isString().withMessage('密码必须为数字')
  ],
  function (req, res, next) {
    const err = validationResult(req)
    if (!err.isEmpty()) {
      const [{
        msg
      }] = err.errors
      next(boom.badRequest(msg))
    } else {
      const username = req.body.username
      const password = md5(`${req.body.password}${PWD_SALT}`)
      login(username, password).then(user => {
        if (!user || user.length === 0) {
          new Result('登录失败').fail(res)
        } else {
          const token = jwt.sign({
              username
            },
            PRIVATE_KEY, {
              expiresIn: JWT_EXPIRED
            }
          )
          new Result({
            token
          }, '登录成功').success(res)
        }
      })
    }
  })

router.get('/info', function(req, res) {
  const decoded = decode(req)
 /*  console.log('准备查询');
  const username = 'admin' */
  if (decoded && decoded.username) {
    findUser(decoded.username).then(user => {
      if (user) {
        /* console.log('拿到查询数据'); */
        user.roles = [user.role]
        new Result(user, '获取用户信息成功').success(res)
      } else {
        new Result('获取用户信息失败').fail(res)
      }
    })
  } else {
    new Result('用户信息解析失败').fail(res)
  }
})



module.exports = router