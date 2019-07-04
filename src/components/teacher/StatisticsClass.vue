<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>教师</el-breadcrumb-item>
      <el-breadcrumb-item>课时管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="tableData" stripe>
      <el-table-column prop="number" label="教师号" width="180">
      </el-table-column>
      <el-table-column prop="teachername" label="教师名" width="100">
      </el-table-column>
      <el-table-column prop="class" label="所教班级" width="180">
      </el-table-column>
      <el-table-column prop="subject" label="所教科目" width="180">
      </el-table-column>
      <el-table-column prop="all" label="总课时" width="100">
      </el-table-column>
      <el-table-column prop="have" label="已授课时" width="100">
      </el-table-column>
      <el-table-column prop="residue" label="剩余课时" width="100">
      </el-table-column>

      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button plain size="mini" @click="godetail()" >课时详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--
      分页组件
        background 背景色
        layout 分页显示的内容
        total 总条数

        给 current-page 属性添加 .sync 修饰符后, 就可以设置当前页
    -->
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="curPage" @current-change="changePage">
    </el-pagination>






  </div>
</template>

<script>
  // import axios from 'axios'

  export default {
    created() {
      // console.log('axios: ', this.$http === axios)

      // 发送请求，获取数据
      // this.getUserList()
    },

    data() {
      return {
        userList: [],
        // 每页大小
        pageSize: 3,
        // 当前页码
        curPage: 1,
        // 总条数
        total: 0,
        // 搜索内容
        queryStr: '',
        //假数据
        tableData: [{
          number: '201603091071',
          teachername: '赵珂',
          class: '基础班',
          subject: 'java基础',
          all:200,
          have:100,
          residue:100
        }, {
          number: '201603091071',
          teachername: '赵珂',
          class: '基础班',
          subject: '数据库',
          all:'200',
          have:'100',
          residue:'100'
        },{
          number: '201603091071',
          teachername: '赵珂',
          class: '基础班',
          subject: 'jdbc',
          all:'200',
          have:'100',
          residue:'100'
        },{
          number: '201603091071',
          teachername: '赵珂',
          class: '基础班',
          subject: 'javaweb',
          all:'200',
          have:'100',
          residue:'100'
        },{
          number: '201603091071',
          teachername: '赵珂',
          class: '基础班',
          subject: 'ssm',
          all:'200',
          have:'100',
          residue:'100'
        }]

      }
    },

    methods: {
      godetail(){
        console.log("haha")
        // this.$route.push({name:"evaluationdetail"})
        this.$router.push({name:'statisticsclassdetail'})
      }
      // 获取用户列表数据
      // curPage = 1 给参数添加默认值
      /* getUserList(curPage = 1) {
        this.$http
          .get('/student', {
            params: {
              // 当前页
              pagenum: curPage,
              // 每页展示多少条数据
              pagesize: 3,
              // 查询条件
              query: this.queryStr || ''
            }
            // 将 token 作为请求头，传递给服务器接口
            // 这样，才能正确的调用这个接口
            // headers: {
            //   Authorization: localStorage.getItem('token')
            // }
          })
          .then(res => {
            console.log('请求成功:', res)
            const { data, meta } = res.data
            if (meta.status === 200) {
              // 获取数据成功
              this.userList = data.student
              this.total = data.total
              this.curPage = data.pagenum
            }
          })
      }, */
      /**
       * 分页获取数据
       * 参数 cruPage 表示当前点击的页码
       */

    }
  }
</script>

<style>
  .user-breadcrumb {
    line-height: 40px;
    background-color: #d4dae0;
    font-size: 18px;
    padding-left: 10px;
  }
</style>
