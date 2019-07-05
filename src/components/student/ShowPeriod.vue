<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>学生</el-breadcrumb-item>
    <el-breadcrumb-item>查看学时</el-breadcrumb-item>
  </el-breadcrumb>
  <el-table :data="tableData" stripe>
    <el-table-column prop="number" label="学号" width="150">
    </el-table-column>
    <el-table-column prop="username" label="姓名" width="100">
    </el-table-column>
    <el-table-column prop="grade" label="年级" width="180">
    </el-table-column>
    <el-table-column prop="school" label="学校" width="180">
    </el-table-column>
    <el-table-column prop="all_period" label="总学时" width="100">
    </el-table-column>
    <el-table-column prop="un_period" label="已扣学时" width="100">
    </el-table-column>
    <el-table-column label="详情" >
      <template slot-scope="scope">
        <el-button plain size="mini" @click="godetail()" >查看详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
  export default {
    name: 'ShowPeriod',
    data(){
      return{
        tableData: [{
          number: '201603091071',
          username: '赵珂',
          grade: '计科软件外包(16-2)',
          school:'齐鲁工业大学',
          all_period:'100',
          un_period:'20'
        }]
      }
    },
    methods:{
      godetail(){
        // this.$route.push({name:"evaluationdetail"})
        this.$router.push({name:'perioddetial'})
      }
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
