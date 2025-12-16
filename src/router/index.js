import { createRouter, createWebHistory } from 'vue-router'

// 导入页面组件
const Home = () => import('../views/Home.vue')
const Analysis = () => import('../views/Analysis.vue')
const Prediction = () => import('../views/Prediction.vue')
const Metaphysics = () => import('../views/Metaphysics.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页 - 双色球AI智能选号助手',
      keepAlive: true
    }
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: Analysis,
    meta: {
      title: '数据分析 - 双色球AI智能选号助手',
      keepAlive: true
    }
  },
  {
    path: '/prediction',
    name: 'Prediction',
    component: Prediction,
    meta: {
      title: '智能预测 - 双色球AI智能选号助手',
      keepAlive: true
    }
  },
  {
    path: '/metaphysics',
    name: 'Metaphysics',
    component: Metaphysics,
    meta: {
      title: '玄学分析 - 双色球AI智能选号助手',
      keepAlive: true
    }
  },
  // 404页面重定向到首页
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 动态设置页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '双色球AI智能选号助手'
  next()
})

export default router