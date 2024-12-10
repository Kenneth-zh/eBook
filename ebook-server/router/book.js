const express = require('express')
const multer = require('multer') //文件上传中间件
const {
  UPLOAD_PATH
} = require('../utils/constant')
const Result = require('../Models/Result')
const Book = require('../Models/Book')
const boom = require('boom')
const {
  decode
} = require('../utils')
const bookService = require('../service/book')


const router = express.Router()

router.post(
  '/upload',
  multer({
    dest: `${UPLOAD_PATH}/book`
  }).single('file'),
  function (req, res, next) {
    if (!req.file || req.file.length === 0) {
      new Result('上传电子书失败').fail(res)
    } else {
      /* console.log(req.file); */
      /* console.log('成功'); */
      /*  new Result(req.file,'电子书上传成功').success(res) */
      /* const book1 = req.file
      console.log(book1); */
      const book = new Book(req.file)
      book.parse()
        .then(book => {
          new Result(book.toJson(), '上传成功').success(res)
        })
        .catch((err) => {
          console.log('/book/upload', err)
          next(boom.badImplementation(err))

        })
    }
  })

router.post(
  '/create',
  function (req, res, next) {
    const decoded = decode(req)
    if (decoded && decoded.username) {
      req.body.username = decoded.username
    }
    const book = new Book(null, req.body) //请求体表单转换为book对象，用于数据库操作
    console.log(book);
    bookService.insertBook(book)
      .then(() => {
        new Result().success(res)
      })
      .catch(err => {
        console.log('/book/create', err)
        next(boom.badImplementation(err))
      })
  }
)

router.get('/getBook', function (req, res, next) {
  const {
    fileName
  } = req.query
  if (!fileName) {
    next(boom.badRequest(new Error('参数fileName不能为空')))
  } else {
    bookService.getBook(fileName)
      .then(book => {
        new Result(book, '获取电子书信息成功').success(res)
      })
      .catch(err => {
        console.log('/book/get', err)
        next(boom.badImplementation(err))
      })
  }
})

router.post(
  '/update',
  function (req, res, next) {
    const decoded = decode(req)
    if (decoded && decoded.username) {
      req.body.username = decoded.username
    }
    const book = new Book(null, req.body)
    bookService.updateBook(book)
      .then(() => {
        new Result(null, '更新成功').success(res)
      })
      .catch(err => {
        next(boom.badImplementation(err))
      })
  }
)

router.get('/delete', function (req, res, next) {
  const {
    fileName
  } = req.query
  if (!fileName) {
    next(boom.badRequest(new Error('参数fileName不能为空')))
  } else {
    bookService.deleteBook(fileName)
      .then(() => {
        new Result(null, '删除成功').success(res)
      })
      .catch(err => {
        console.log('/book/delete', err)
        next(boom.badImplementation(err))
      })
  }
})

router.get('/list', function (req, res, next) {
  bookService.listBook(req.query)
    .then(({
      list,
      count,
      page,
      pageSize
    }) => {
      new Result(
        list,
        '获取图书列表成功', {
          page: Number(page),
          pageSize: Number(pageSize),
          total: count || 0
        }
      ).success(res)
    })
    .catch(err => {
      console.log('/book/list', err)
      next(boom.badImplementation(err))
    })
})

router.get('/category', function (req, res, next) {
  bookService.getCategory().then(category => {
    new Result(category).success(res)
  }).catch(err => {
    next(boom.badImplementation(err))
  })
})

router.get('/home', function(req, res, next) {
  bookService.home().then(result => {
    new Result(result).success(res)
  }).catch(err => {
    next(boom.badImplementation(err))
  })
})

module.exports = router