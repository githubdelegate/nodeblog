import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Admin from '@/components/Admin'
import Article from '@/components/Article'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      redirect: '/admin/article'
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [{
        path: '/admin/article',
        name: 'article',
        component: Article
      }]
    }
  ]
})

export default router
