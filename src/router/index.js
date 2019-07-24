import Vue from 'vue'
import Router from 'vue-router'

// 导入 Login 组件（注意，不要添加 .vue 后缀）
import Login from '@/components/login/Login'
// 导入招聘信息管理组件
import SchoolStatisticsEmployment from '@/components/public/SchoolStatisticsEmployment'
// 导入首页组件
import Home from '@/components/home/Home'

//引入学生查看招聘信息的组件
import LookInfo from '@/components/student/LookInfo'
// 导入修改个人信息组件
import Personal from '@/components/student/Personal'
// 导入用户列表组件
import Score from '@/components/student/Score'
//引入学生查看学时组件
import ShowPeriod from '@/components/student/ShowPeriod'


//引入导师发布招聘信息组件
import InfoDetail from '@/components/subcompoents/InfoDetail'

//引入学生查看学时详情的组件
import PeriodDetial from '@/components/subcompoents/PeriodDetial'





//引入导师学生管理组件
import StudentChange from '../components/tutor/StudentChange'

//引入所带班级就业率组件
import ClassEmploymentRate from '@/components/technologyteacher/ClassEmploymentRate'

//引入成绩统计组件
import StatisticalScores from  '@/components/technologyteacher/StatisticalScores'

//引入学时历史记录
import PeriodHistory from '../components/tutor/PeriodHistory'

//引入学业导师管理组件
import AcademicManager from '../components/manager/AcademicManager'
//引入技术老师管理组件
import TechnologyManager from '../components/manager/TechnologyManager'



//引入招聘信息管理组件
import ShowRecruitment from '../components/tutor/ShowRecruitment'

//引入学时管理组件
import PeriodManager from '@/components/tutor/PeriodManager'

//引入信息管理组件
import InfoManager from '../components/manager/InfoManager'

Vue.use(Router)
const router = new Router({
  routes: [
    // children 用来配置子路由，将来匹配的组件会展示在 Home 组件的 router-view 中
    {
      path: '/home',
      component: Home, children: [
        { path: 'showrecruitment', component: ShowRecruitment },

        { path:'studentchange',component:StudentChange},


        { path: 'score', component: Score },
        { path: 'showperiod', component: ShowPeriod },
        {path:'lookinfo',component:LookInfo},
        { path: 'personal', component: Personal },

        { path: 'classemploymentrate', component: ClassEmploymentRate },
        { path: 'statisticalscores', component: StatisticalScores },




        { path: 'periodmanager', component: PeriodManager },
        {path:'academicmanager',component:AcademicManager},
        {path:'technologymanager',component:TechnologyManager},
        {path:'infomanager',component:InfoManager},



        { path: 'schoolstatisticsemployment', component: SchoolStatisticsEmployment },

         { path:'/lookinfo/infodetail',component:InfoDetail,name:'infodetail'},
        { path:'/showperiod/perioddetial',component:PeriodDetial,name:'perioddetial'},
        {path:'/periodmanager/periodhistory',component:PeriodHistory,name:'periodhistory'}
      ]

    },
    { path: '/login', component: Login },


  ]
})

// 全局导航守卫
// 所有的路由都会先走守卫
// 添加导航守卫之后，不管是访问哪个路由，都会执行beforeEach回调函数中的代码
// 因为所有的路由，都会经过该导航守卫，所以，就可以在这个导航守卫的回调函数中
// 判断有没有登录了
 router.beforeEach((to, from, next) => {
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
})

export default router
