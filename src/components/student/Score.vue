<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生</el-breadcrumb-item>
      <el-breadcrumb-item>成绩显示</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入用户名" v-model="queryStr" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>

    </el-row>

    <!--
      el-table 表格组件
        data 用来给表格组件提供数据
        stripe 添加改属性后，启用隔行变色效果

      el-table-column 表格中的每一列
        label 每一列的标题名称
        width 每一列的宽度
        prop 表示数据中的属性名（字段名称）

    userList = [
      {}, {}, {}
    ]
     -->
    <el-table :data="tableData" stripe>
      <el-table-column prop="number" label="学号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="grade" label="年级" width="180">
      </el-table-column>
      <el-table-column prop="school" label="学校" width="180">
      </el-table-column>
      <el-table-column prop="subject" label="科目" width="180">
      </el-table-column>
      <el-table-column prop="score" label="成绩" width="180">
      </el-table-column>

    </el-table>

    <!--
      分页组件
        background 背景色
        layout 分页显示的内容
        total 总条数

        给 current-page 属性添加 .sync 修饰符后, 就可以设置当前页
    -->
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="curPage" >
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

      tableData: [{
        number: '201603091071',
        username: '赵珂',
        grade: '计科软件外包(16-2)',
        school:'齐鲁工业大学',
        subject:'数据结构',
        score:'98'
      }, {
        number: '201603091071',
        username: '赵珂',
        grade: '计科软件外包(16-2)',
        school:'齐鲁工业大学',
        subject:'数据结构',
        score:'98'
      },{
        number: '201603091071',
        username: '赵珂',
        grade: '计科软件外包(16-2)',
        school:'齐鲁工业大学',
        subject:'数据结构',
        score:'98'
      },{
        number: '201603091071',
        username: '赵珂',
        grade: '计科软件外包(16-2)',
        school:'齐鲁工业大学',
        subject:'数据结构',
        score:'98'
      },{
        number: '201603091071',
        username: '赵珂',
        grade: '计科软件外包(16-2)',
        school:'齐鲁工业大学',
        subject:'数据结构',
        score:'98'
      },{
        number: '201603091071',
        username: '赵珂',
        grade: '计科软件外包(16-2)',
        subject:'数据结构',
        score:'98'
      },{
        number: '201603091071',
        username: '赵珂',
        grade: '计科软件外包(16-2)',
        school:'齐鲁工业大学',
        subject:'数据结构',
        score:'98'
      },{
        number: '201603091071',
        username: '赵珂',
        grade: '计科软件外包(16-2)',
        school:'齐鲁工业大学',
        subject:'数据结构',
        score:'98'
      },{
        number: '201603091071',
        username: '赵珂',
        grade: '计科软件外包(16-2)',
        school:'齐鲁工业大学',
        subject:'数据结构',
        score:'98'
      },{
        number: '201603091071',
        username: '赵珂',
        grade: '计科软件外包(16-2)',
        school:'齐鲁工业大学',
        subject:'数据结构',
        score:'98'
      }]
    }
  },

  methods: {
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


    // 添加用户


    // 根据用户id删除用户


    // 展示编辑对话框

    // 点击确定按钮，修改用户数据


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
