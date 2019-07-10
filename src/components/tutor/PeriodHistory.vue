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
            <el-button slot="append" icon="el-icon-search" ></el-button>
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

    </div>

</template>

<script>
  export default {
    name: 'PeriodHistory',
    data(){
      return{
        tableData: [{
          number: '201603091071',
          username: '赵珂',
          school: '齐鲁工业大学',
          class: '基础班',
          change:'扣除',
          score:'5',
          reason:'请假'
        },{
          number: '201603091071',
          username: '赵珂',
          school: '齐鲁工业大学',
          class: '基础班',
          change:'扣除',
          score:'5',
          reason:'请假'

        },{
          number: '201603091071',
          username: '赵珂',
          school: '齐鲁工业大学',
          class: '基础班',
          change:'扣除',
          score:'5',
          reason:'请假'
        },{
          number: '201603091071',
          username: '赵珂',
          school: '齐鲁工业大学',
          class: '基础班',
          change:'扣除',
          score:'5',
          reason:'请假'
        },{
          number: '201603091071',
          username: '赵珂',
          school: '齐鲁工业大学',
          class: '基础班',
          change:'扣除',
          score:'5',
          reason:'请假'
        }]
      }
    },
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
