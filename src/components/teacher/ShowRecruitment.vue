<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>老师</el-breadcrumb-item>
    <el-breadcrumb-item>招聘信息</el-breadcrumb-item>
  </el-breadcrumb>
</div>
</template>

<script>
  export default {
    name: 'ShowRecruitment'
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
