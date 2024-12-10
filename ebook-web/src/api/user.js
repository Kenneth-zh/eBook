import service from '../utils/request'

export function login(data) {
  return service({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return service({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return service({
    url: '/user/logout',
    method: 'post'
  })
}
