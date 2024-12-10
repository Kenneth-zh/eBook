import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

//线下
const service = axios.create({
    baseURL: 'http://127.0.0.1:5001/',
    timeout: 5000
})

//线上
/*const service = axios.create({
  baseURL: 'http://119.29.190.23:5000/',
  timeout: 5000 
})*/


service.interceptors.request.use(
    config => {
        // 如果存在 token 则附带在 http header 中
        if (store.getters.token) {
            config.headers['Authorization'] = `Bearer ${getToken()}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data

        if (res.code !== 0) {
            Message({
                message: res.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            // 判断 token 失效的场景
            if (res.code === -2) {
                // 如果 token 失效，则弹出确认对话框，用户点击后，清空 token 并返回登录页面
                MessageBox.confirm('Token 失效，请重新登录', '确认退出登录', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            return Promise.reject(new Error(res.msg || '请求失败'))
        } else {
            return res
        }
    },
    error => {
        let message = error.message || '请求失败'
        if (error.response && error.response.data) {
            const { data } = error.response
            message = data.msg
        }
        Message({
            message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
