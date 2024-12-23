import service from '../utils/request'

export function createBook(book) {
  return service({
    url: '/book/create',
    method: 'post',
    data: book
  })
}

export function updateBook(book) {
  return service({
    url: '/book/update',
    method: 'post',
    data: book
  })
}

export function getBook(fileName) {
  return service({
    url: '/book/getBook',
    method: 'get',
    params: {
      fileName
    }
  })
}

export function listBook(params) {
  return service({
    url: '/book/list',
    method: 'get',
    params
  })
}

export function deleteBook(fileName) {
  return service({
    url: '/book/delete',
    method: 'get',
    params: {
      fileName
    }
  })
}

export function getCategory() {
  return service({
    url: '/book/category',
    method: 'get'
  })
}


export function bookHome() {
    return service({
      url: '/book/home',
      method: 'get'
    })
}
