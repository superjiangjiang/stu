<template>
    <div>

      <el-row>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>学业导师</el-breadcrumb-item>
          <el-breadcrumb-item>发布信息</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="招聘企业">
            <el-input v-model="form.name" aria-placeholder="请输入企业名称"></el-input>
          </el-form-item>
          <el-form-item label="招聘人数">
            <el-input v-model="form.region" aria-placeholder="请输入招聘人数"></el-input>
          </el-form-item>
          <el-form-item label="招聘时间">
            <el-col :span="5">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="0.5">-</el-col>
            <el-col :span="5">
              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>

          <el-form-item label="招聘职业">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="JAVA初级工程师" name="type"></el-checkbox>
              <el-checkbox label="前端工程师" name="type"></el-checkbox>
              <el-checkbox label="XXXXXXXXXX" name="type"></el-checkbox>
              <el-checkbox label="XXXXXXXXXXXX" name="type"></el-checkbox>
            </el-checkbox-group>
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
            region: '',
            date1: '',
            date2: '',

            type: [],
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
</style>
