<template>
  <el-container class="home-wrapper">
    <el-header class="color">
      <el-row>
        <el-col :span="8" class="logo">
          <img src="@/assets/logo.png" alt="安博logo">
        </el-col>
        <el-col :span="8">
          <h1 class="title">学生管理系统</h1>
        </el-col>
        <el-col :span="8">
          <div class="welcome">
            <span>欢迎您{{name}}</span>
            <a href="javascript:;" @click.prevent="logout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!--roleId为1 为管理员-->
        <el-menu v-if="this.roleId === 1" :router="true" default-active="/home/users" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
           <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>管理员</span>
            </template>
            <el-menu-item index="/home/academicmanager">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>学业导师管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/home/technologymanager">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>技术老师管理</span>
              </template>
            </el-menu-item>

         <el-menu-item index="/home/infomanager">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>信息管理</span>
            </template>
          </el-menu-item>

          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>公共</span>
            </template>
            <el-menu-item index="/home/schoolstatisticsemployment">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>学校就业统计</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <!--roleId为2,为学业导师-->
        <el-menu v-else-if="this.roleId === 2" :router="true" default-active="/home/users" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>学业导师</span>
            </template>
            <el-menu-item index="/home/showrecruitment">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>招聘信息管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/home/studentchange">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>学生管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/home/periodmanager">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>学时管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>公共</span>
            </template>
            <el-menu-item index="/home/schoolstatisticsemployment">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>学校就业统计</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <!--roleId为3,为技术老师-->
        <el-menu v-else-if="this.roleId === 3" :router="true" default-active="/home/users" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>技术老师</span>
            </template>
            <el-menu-item index="/home/statisticalscores">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>成绩管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/home/classemploymentrate">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>所带学生就业率</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>公共</span>
            </template>
            <el-menu-item index="/home/schoolstatisticsemployment">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>学校就业统计</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <!--roleId为4,为学生-->
        <el-menu v-else-if="this.roleId === 4" :router="true" default-active="/home/users" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>学生</span>
            </template>

            <!-- 启用路由模式后，index就相当于 原来 router-link 中的to属性，用来指定导航的路径（哈希值） -->
            <!-- 可以使用 /home/student 或者 home/student -->
            <el-menu-item index="/home/showperiod">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>查看学时</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/home/score">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>查看成绩</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/home/lookinfo">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>查看招聘信息</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/home/personal">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>查看个人信息</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>公共</span>
            </template>
            <el-menu-item index="/home/schoolstatisticsemployment">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>学校就业统计</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  /*接收登录页传来的roleId*/
  created() {
    this.roleId = this.$route.params.roleId
    this.name = this.$route.params.name
    console.log(this.name)
  },
  /*点击叉号清除用户登录缓存*/
  mounted () {
    window.addEventListener( 'beforeunload', e => this.set() );
  },
  data(){
    return {
     roleId: -1,
      name: ''
    }
  },
  methods: {
    set(){
      localStorage.removeItem('token')
    },
    // 退出功能
    logout() {
      // 1 弹出确认对话框
      // 2 用户点击确认
      //  2.1 跳回登录页面
      //  2.2 清除token
      this.$confirm('您是否确认退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // 点击确认按钮
        .then(() => {
          // 清除token
          localStorage.removeItem('token')
          // 跳回登录页面
          this.$router.push('/login')
        })
    },
    handleOpen(key, keyPath) {
      console.log('open', key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log('close', key, keyPath)
    }
  }
}
</script>

<style scoped lang="less">
.home-wrapper {
  height: 100%;

  .el-header {
    padding: 0;
    background-color: #b3c1cd;
    color: #333;
    text-align: center;

    .logo {
      text-align: left;
      }

    .title {
      margin: 0;
      line-height: 60px;
      color: #fff;
      font-size: 36px;
    }

    .welcome {
      line-height: 60px;
      font-weight: bold;
      text-align: right;
      padding-right: 30px;
      float: right;

      a {
        color: #b07a17;
        text-decoration: none;
      }
    }
  }

  .el-aside {
    background-color: #545c64;
    color: #333;
    line-height: 200px;
  }

  .el-main {
    background-color: #eaeef1;
    color: #333;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
}
</style>
