<template>
  <el-container class="home-wrapper">
    <el-header>
      <el-row>
        <el-col :span="8" class="logo">
          <img src="@/assets/logo.png" alt="安博logo">
        </el-col>
        <el-col :span="8">
          <h1 class="title">学生管理系统</h1>
        </el-col>
        <el-col :span="8">
          <div class="welcome">
            <span>欢迎您XX</span>
            <a href="javascript:;" @click.prevent="logout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!--
          el-menu 表示菜单组件

            default-active 当前激活菜单的 index 值

          el-sub-menu 表示一组菜单
            index 是唯一的，不能重复！！！
         -->

        <el-menu :router="true" default-active="/home/users" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="1">
            <!--
              template: 用来包裹一级菜单，内部指定菜单的图标和菜单名称

              如果要给菜单添加 小图标，应该使用 template 来包裹整个内容
              -->
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
                <span>成绩显示</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/home/upload">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>上传简历</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/home/lookinfo">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>招聘信息</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/home/teacherevaluation">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>教师评价</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/home/dropout">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>申请退学</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>管理员</span>
            </template>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>班主任</span>
            </template>
            <el-menu-item index="/home/studentmanager">
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
          <el-submenu index="4">
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
           <el-menu-item index="/home/statisticsclass">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>课时管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/home/statisticsstudentevaluation">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>学生评价统计</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/home/classemploymentrate">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>所带学生就业率</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/home/schoolstatisticsemployment">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>学校就业统计</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导师</span>
            </template>
             <el-menu-item index="/home/showrecruitment">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>招聘信息管理</span>
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
  methods: {
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
      // // 点击取消按钮
      // .catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   })
      // })
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
