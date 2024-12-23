import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//懒加载
import Layout from '@/layout'



export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
    }]
},
{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
},
{
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
},
{
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
},
{
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
},

{
    path: '/',
    component: Layout,
    redirect: '/book',
    children: [{
        path: 'book',
        component: () => import('@/views/book/list'),
        name: 'book',
        meta: {
            title: '图书总览',
            icon: 'list',
            affix: false
        }
    }]
},

]


export const asyncRoutes = [{
    path: '/book',
    name: 'book',
    component: Layout,
    redirect: '/book/create',
    meta: {
        title: '图书管理',
        icon: 'documentation',
        //roles: ['admin', 'editor']
    },
    children: [{
        name: 'bookCreate',
        path: '/book/create',
        component: () => import('@/views/book/create'),
        meta: {
            title: '上传图书',
            icon: 'edit',
            //roles: ['admin']
        }
    },/*
    {
        name: 'bookEdit',
        path: '/book/edit/:fileName',
        component: () => import('@/views/book/edit'),
        hidden: true,
        meta: {
            title: '编辑图书',
            icon: 'edit',
            //roles: ['admin'],
            activeMenu: '/book/list'
        },

    },
    {
        name: 'bookList',
        path: '/book/list',
        component: () => import('@/views/book/list'),
        meta: {
            title: '图书列表',
            icon: 'list',
            //roles: ['editor']
        }
    }*/
    ]
}
]

const createRouter = () => new Router({
    // mode: 'history'
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher //重置路由
}

export default router
