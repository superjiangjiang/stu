<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>老师</el-breadcrumb-item>
        <el-breadcrumb-item>学时管理</el-breadcrumb-item>
        <el-breadcrumb-item>学时管理历史记录</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入学号/姓名" v-model="queryStr" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"  @click="search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="tableData" stripe class="content">
        <el-table-column prop="editDate" label="时间" width="150">
        </el-table-column>
        <el-table-column prop="sName" label="姓名" width="150">
        </el-table-column>
        <el-table-column prop="school" label="学校" width="180">
        </el-table-column>
        <el-table-column prop="cName" label="班级" width="150">
        </el-table-column>
        <el-table-column prop="detail" label="学时变更" width="150">
        </el-table-column>
        <el-table-column prop="hours" label="学时数" width="150">
        </el-table-column>
        <el-table-column prop="reason" label="原因" width="150">
        </el-table-column>
      </el-table>
      <!--
    分页组件
      background 背景色
      layout 分页显示的内容
      total 总条数

      给 current-page 属性添加 .sync 修饰符后, 就可以设置当前页
  -->
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="page_no"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

</template>

<script>
  import axios from 'axios'
  export default {
    name: 'PeriodHistory',
    created(){
      this.gettableData()
    },
    data(){
      return{
        tableData: [],
        pageSize:3,
        page_no:1,
        total:0,
        queryStr:'',
      }
    },
    methods:{
        //展示信息
        async gettableData() {
          let res = await this.axios({
            url: '/api/v1/tutor/getHistory',
            method: 'get',
            params: {
              page_no:this.page_no,
              key:this.queryStr,
            }
          })
          let {status} = res
          let { data } = res.data
          console.log(res)
          if (status == 200) {
            this.tableData = data.list
            this.total = data.total
            this.pageSize = data.pageSize

          }
        },
        //分页查询

        handleCurrentChange(val) {
          this.page_no = val
          this.gettableData()
        },


        //模糊查询
        search() {
          // 搜索的时候，让当前页变成1
          this.page_no = 1
          this.getList()
          console.log(this.queryStr)
        },


    }
  }
</script>

<style scoped>
.user-breadcrumb {
  line-height: 40px;
  background-color: #d4dae0;
  font-size: 18px;
  padding-left: 10px;
}
</style>
