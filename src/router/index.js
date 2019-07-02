import Vue from 'vue'
import Router from 'vue-router'

// 导入 Login 组件（注意，不要添加 .vue 后缀）
import Login from '@/components/login/Login'
// 导入首页组件
import Home from '@/components/home/Home'
// 导入用户列表组件
import Score from '@/components/student/Score'

//引入上传组件
import Upload from '@/components/student/Upload'

//引入所带班级就业率组件
import ClassEmploymentRate from '@/components/teacher/ClassEmploymentRate'

//引入成绩统计组件
import StatisticalScores from  '@/components/teacher/StatisticalScores'

//引入统计课时组件
import StatisticsClass from '@/components/teacher/StatisticsClass'


//引入学生评价的组件

import StatisticsStudentEvaluation from '@/components/teacher/StatisticsStudentEvaluation'

//引入学生管理组件
import StudentManager from '@/components/teacher/StudentManager'


//引入学校就业统计组件
import SchoolStatisticsEmployment from '@/components/school/SchoolStatisticsEmployment'

//引入导师组件
import Recruitment from '@/components/academic/Recruitment'
Vue.use(Router)

const router = new Router({
  routes: [
    // children 用来配置子路由，将来匹配的组件会展示在 Home 组件的 router-view 中
    {
      path: '/home',
      component: Home, children: [
        { path: 'score', component: Score },
        { path: 'upload', component: Upload },
        { path: 'ClassEmploymentRate', component: ClassEmploymentRate },
        { path: 'StatisticalScores', component: StatisticalScores },
        { path: 'StatisticsClass', component: StatisticsClass },
        { path: 'StatisticsStudentEvaluation', component: StatisticsStudentEvaluation },
        { path: 'StudentManager', component: StudentManager },
        { path: 'SchoolStatisticsEmployment', component: SchoolStatisticsEmployment },
        { path: 'Recruitment', component: Recruitment },

      ]
    },
    { path: '/login', component: Login }
  ]
})

// 全局导航守卫
// 所有的路由都会先走守卫
// 添加导航守卫之后，不管是访问哪个路由，都会执行beforeEach回调函数中的代码
// 因为所有的路由，都会经过该导航守卫，所以，就可以在这个导航守卫的回调函数中
// 判断有没有登录了
/* router.beforeEach((to, from, next) => {
  // console.log('导航守卫在看门', to)
  // ...

  if (to.path === '/login') {
    // 如果访问的是login页面，直接放行，也就是任何人不管有没有登录
    // 都可以访问登录页面
    // 直接调用 next() 方法，表示：访问的是哪个页面，就展示这个页面的内容
    next()
  } else {
    // 访问的不是登录页面

    // 判断用户是否登录成功，
    // 1 当用户登录成功，直接调用 next() 方法放行
    // 2 当用户没有登录，应该调用 next('/login') 跳转到登录页面，让用户登录

    // 通过登录成功时候保存的token，来作为有没有登录成功的条件
    const token = localStorage.getItem('token')
    if (token) {
      // 有，登录成功
      next()
    } else {
      // 没有，登录失败
      next('/login')
    }
  }
}) */

export default router
