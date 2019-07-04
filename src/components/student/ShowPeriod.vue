<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>学生</el-breadcrumb-item>
    <el-breadcrumb-item>查看学时</el-breadcrumb-item>
  </el-breadcrumb>
</div>
</template>

<script>
  export default {
    name: 'ShowPeriod'
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
