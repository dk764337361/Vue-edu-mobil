import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: 'login' */ '@/views/login/index')
  },
  {
    path: '/',
    name: 'course',
    component: () =>
      import(/* webpackChunkName: 'course' */ '@/views/course/index')
  },
  {
    path: '/learn',
    name: 'learn',
    component: () => import(/* webpackChunkName: 'learn' */ '@/views/learn/index'),
    meta: { requiresAuth: true }

  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index'),
    meta: { requiresAuth: true }
  },
  {
    path: '/course-info/:courseId',
    name: 'course-info',
    component: () => import(/* webpackChunkName: 'course-info' */ '@/views/course-info'),
    props: true
  },
  {
    path: '/lesson-video/:lessonId',
    name: 'lesson-video',
    component: () => import(/* webpackChunkName: 'lesson-video' */ '@/views/course-info/video'),
    props: true
  },
  // 支付页
  {
    path: '/pay/:courseId',
    name: 'pay',
    component: () => import(/* webpackChunkName: 'pay' */ '@/views/pay'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '*',
    name: 'error-page',
    component: () =>
      import(/* webpackChunkName: 'error-page' */ '@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})

// 导航守卫进行登陆检测与跳转
router.beforeEach((to, from, next) => {
// 验证 to 路由是否需要进行身份认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 验证VueX的store 中是否存储用户登陆信息
    if (!store.state.user) {
      // 未登录,跳转到登陆页面
      return next({
        name: 'login',
        query: {
          // 将本次路由的 fullPath 传递给 login ⻚⾯
          redirect: to.fullPath
        }
      })
    }
    // 已经登陆，允许通过
    next()
  } else {
    next()
  }
})
export default router
