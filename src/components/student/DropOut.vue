<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生</el-breadcrumb-item>
      <el-breadcrumb-item>申请退学</el-breadcrumb-item>
    </el-breadcrumb>

    <h2 align="center">退学申请流程</h2>
    <el-steps :active="2" align-center class="steps">
      <el-step title="学生本人申请" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="班主任审批" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="实训中心审批" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="学校审批" description="这是一段很长很长很长的描述性文字"></el-step>
    </el-steps>
  </div>
</template>

<script>
  export default {
    name: 'DropOut'
  }
</script>

<style scoped>
  .steps{
    margin-top: 10%;
  }
  .user-breadcrumb {
    line-height: 40px;
    background-color: #d4dae0;
    font-size: 18px;
    padding-left: 10px;
  }
</style>
