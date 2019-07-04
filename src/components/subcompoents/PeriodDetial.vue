<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>学生</el-breadcrumb-item>
        <el-breadcrumb-item>查看学时</el-breadcrumb-item>
        <el-breadcrumb-item>查看学时详情</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="block">
        <div class="radio">
          排序：
          <el-radio-group v-model="reverse">
            <el-radio :label="true">倒序</el-radio>
            <el-radio :label="false">正序</el-radio>
          </el-radio-group>
        </div>

        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp">
            {{activity.content}}
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'PeriodDetial',
    data() {
      return {

      }
    }
  }
</script>

<style scoped>

</style>
