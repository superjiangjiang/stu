<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>学生</el-breadcrumb-item>
        <el-breadcrumb-item>查看学时</el-breadcrumb-item>
        <el-breadcrumb-item>查看学时详情</el-breadcrumb-item>
      </el-breadcrumb>

      <el-table :data="tableData" stripe class="table">
        <el-table-column prop="time" label="时间" width="180">
        </el-table-column>
        <el-table-column prop="number" label="学号" width="180">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="grade" label="年级" width="180">
        </el-table-column>
        <el-table-column prop="school" label="学校" width="180">
        </el-table-column>
        <el-table-column prop="resource" label="原因" width="180">
        </el-table-column>


      </el-table>


    </div>
</template>

<script>
  export default {
    name: 'PeriodDetial',
    data() {
      return {
        tableData: [{
          time:'2019-07-04',
          number: '201603091071',
          username: '赵珂',
          grade: '计科软件外包(16-2)',
          school:'齐鲁工业大学',
          resource:'请假一天'
        }]

      }
    }
  }
</script>

<style scoped>
.table{
  margin-top: 20px;

}
</style>
