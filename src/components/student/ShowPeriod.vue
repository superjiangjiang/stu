<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生</el-breadcrumb-item>
      <el-breadcrumb-item>查看学时</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20" style="margin-top: 10px;">
      <el-col :span="6">
        <el-input placeholder="请输入学时变动原因" v-model="queryStr" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"  @click="search"></el-button>
        </el-input>
      </el-col>
     <!-- <el-col :span="4" >
        <el-tag>总学时</el-tag>
      </el-col>
      <el-col :span="4" >
        <el-tag>学时</el-tag>
      </el-col>-->
    </el-row>

    <el-table :data="tableData" stripe class="table">
      <el-table-column prop="editTime" label="时间" width="220">
      </el-table-column>
      <el-table-column prop="student.sNo" label="学号" width="150">
      </el-table-column>
      <el-table-column prop="student.name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="student.school" label="学校" width="180">
      </el-table-column>
      <el-table-column prop="reason" label="原因" width="320">
      </el-table-column>
      <el-table-column prop="detail" label="学时变动情况" width="120">
      </el-table-column>

    </el-table>

    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="pageNum"
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
    name: 'ShowPeriod',
    created(){
      this.gettableData()
    },
    data(){
      return{
        tableData: [],
        pageSize:3,
        pageNum:1,
        total:0,
        queryStr:'',
      }
    },
    methods:{
      /*学生查看学时*/
      async gettableData() {
        let res = await this.axios({
          url: '/api/v1/student/findStuHistory',
          method: 'get',
          params: {
            pageNum:this.pageNum,
            key:this.queryStr,
          }
        })
        let { data,code } = res.data
        if (code == 0) {
          for (var i = 0; i < data.list.length; i++) {
            data.list[i].editTime = this.timestampToTime(data.list[i].editTime)

          }
          this.tableData = data.list
          this.total = data.total
          this.pageSize = data.pageSize

        }
      },

      //分页查询
      handleCurrentChange(val) {
        this.pageNum = val
        this.gettableData()
      },

      //通过原因查看学时
      search() {
        // 搜索的时候，让当前页变成1
        this.pageNum = 1
        this.gettableData()
        console.log(this.queryStr)
      },
      timestampToTime(timer) {    //时间戳为10位需*1000，时间戳为13位的话不需乘1000在转成yymmdd
        let date = new Date(timer)
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m
        let d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        return y + '-' + m + '-' + d
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
