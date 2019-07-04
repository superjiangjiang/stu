<template>
    <div>

      <el-row>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>教师</el-breadcrumb-item>
          <el-breadcrumb-item>招聘信息</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row >
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="招聘企业">
            <el-input v-model="form.name" aria-placeholder="请输入企业名称"></el-input>
          </el-form-item>
          <el-form-item label="工作地点">
            <el-input v-model="form.workplace" aria-placeholder="请输入企业名称"></el-input>
          </el-form-item>
          <el-form-item label="企业地址">
            <el-input v-model="form.workplace2" aria-placeholder="请输入企业名称"></el-input>
          </el-form-item>
          <el-form-item label="招聘人数">
            <el-input v-model="form.region" aria-placeholder="请输入招聘人数"></el-input>
          </el-form-item>
          <el-form-item label="发布时间">
            <el-col :span="5">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>

          </el-form-item>

          <el-form-item label="招聘职业">
            <el-input v-model="form.type" aria-placeholder="请输入企业名称"></el-input>
          </el-form-item>
          <el-form-item label="薪资">
            <el-col :span="5">
              <el-input v-model="form.salary_min" aria-placeholder="请输入最低工资"></el-input>
            </el-col>
            <el-col class="line" :span="0.5">-</el-col>
            <el-col :span="5">
              <el-input v-model="form.salary_max" aria-placeholder="请输入最高工资"></el-input>
            </el-col>
          </el-form-item>


          <el-form-item label="招聘详情">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即发布</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "Recruitment",
      data() {
        return {
          form: {
            name: '',
            workplace:'',
            workplace2:'',
            region: '',
            date: '',


            type: '',
            salary_min: '',
            salary_max:'',
            desc: ''
          }
        }
      },
      methods: {
        onSubmit() {
          console.log('submit!');
        }
      }
    }
</script>

<style scoped lang="less">
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .user-breadcrumb {
    line-height: 40px;
    background-color: #d4dae0;
    font-size: 18px;
    padding-left: 10px;
  }
</style>
