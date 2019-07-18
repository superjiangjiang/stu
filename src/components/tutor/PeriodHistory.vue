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
            <el-button slot="append" icon="el-icon-search"  @click="queryPeriodList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="tableData" stripe class="content">
        <el-table-column prop="number" label="时间" width="150">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="150">
        </el-table-column>
        <el-table-column prop="school" label="学校" width="180">
        </el-table-column>
        <el-table-column prop="class" label="班级" width="150">
        </el-table-column>
        <el-table-column prop="change" label="学时变更" width="150">
        </el-table-column>
        <el-table-column prop="score" label="学时数" width="150">
        </el-table-column>
        <el-table-column prop="reason" label="原因" width="150">
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="curPage" @current-change="changePage">
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
        curPage:1,
        total:0,
        queryStr:'',
      }
    },
    methods:{
      async gettableData(curPage = 1){
        const res = await this.$http.post('http://47.103.10.32:8080/ambowEducation/api/v1/tutor/editHours',this.tableData).then(res=>{
          // params: {
          //   // 当前页
          //   pagenum: curPage,
          //   // 每页展示多少条数据
          //   pagesize: 3,
          //   // 查询条件
          //   query: this.queryStr || ''
          // }
        })
        const { data, meta } = res.data
        if (meta.status === 200) {
          // 获取数据成功
          this.tableData = data.list
          this.total = data.total
          this.curPage = data.pagenum
        }
      },
        changePage(curPage) {
          console.log('当前页为：', curPage)
          this.gettableData(curPage)
        },
        queryPeriodList() {
          console.log(this.queryStr)
          this.curPage = 1
          this.gettableData()
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
