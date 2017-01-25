import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex'
import NProgress from 'nprogress' //页面顶部进度条
import 'nprogress/nprogress.css'

import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Main from './components/Main.vue'
import Table from './components/nav1/Table.vue'
import Form from './components/nav1/Form.vue'
import Page3 from './components/nav1/Page3.vue'
import Page4 from './components/nav2/Page4.vue'
import Page5 from './components/nav2/Page5.vue'
import Page6 from './components/nav3/Page6.vue'
import echarts from './components/charts/echarts.vue'

import util from './util'

Vue.use(ElementUI)
Vue.use(VueRouter)

const routes = [{
    path: '/login',
    component: Login,
    hidden: true //不显示在导航中
  },
  //{ path: '/main', component: Main },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-message', //图标样式class
    children: [
      //{ path: '/main', component: Main },
      { path: '/table', component: Table, name: 'Table' },
      { path: '/form', component: Form, name: 'Form' },
      { path: '/page3', component: Page3, name: '页面3' },
    ]
  }, {
    path: '/',
    component: Home,
    name: '用户管理',
    iconCls: 'fa fa-id-card-o',
    children: [
      { path: '/page4', component: Table, name: '用户管理' },
      { path: '/page5', component: Page5, name: '页面5' }
    ]
  }, {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'fa fa-address-card',
    leaf: true, //只有一个节点
    children: [
      { path: '/page6', component: Page6, name: '导航三' }
    ]
  }, {
    path: '/',
    component: Home,
    name: 'Charts',
    iconCls: 'fa fa-bar-chart',
    children: [
      { path: '/echarts', component: echarts, name: 'echarts' }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(({ meta, path }, from, next) => {
  var { auth = true } = meta
  console.log(store.state.com.isLogin)
  var isLogin = Boolean(store.state.com.isLogin) //true用户已登录， false用户未登录

  if (auth && !isLogin && path !== '/login') {
    return next({ path: '/login' })
  }
  next()
})
router.afterEach(transition => {
  NProgress.done();
});

new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: { App }
  //render: h => h(Login)
}).$mount('#app')

//router.replace('/login')
