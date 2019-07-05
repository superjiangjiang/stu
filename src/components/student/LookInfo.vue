<template>
    <div>
      <el-row>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>学生</el-breadcrumb-item>
          <el-breadcrumb-item>查看招聘信息</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>

      <el-row>
        <el-card class="box-card" shadow="hover" >
          <div v-for="item in info" :key="item.id" class="info" @click="GoInfoDetail">
            <el-row :gutter="20">
              <el-col :span="4"><div class="grid-content bg-purple type">职位：{{item.type}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple salary"><span>薪资：{{item.salary_min}}</span>-<span>{{item.salary_max}}</span></div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple"><span class="name">公司名：{{item.name}}</span></div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple"><span >位置：{{item.location}}</span></div></el-col>
              <el-col :span="4"> <div class="grid-content bg-purple"><span>招聘人数：{{item.region}}</span></div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple"><span>发布于：{{item.date1}}</span></div></el-col>
            </el-row>
          </div>
        </el-card>
      </el-row>
      <div class="block">

        <el-pagination
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'LookInfo',
    data(){
      return{
        info:[{
          id:'1',
          name: '安博公司',
          region: '30,',
          date1: '2019-7-3',

          location:'山东济南',
          type: 'Java工程师',
          salary_min: 2000,
          salary_max:4000

        },
          {
            id:'2',
            name: '安博公司',
            region: '30,',
            date1: '2019-7-3',

            location:'山东济南',
            type: 'Java工程师',
            salary_min: 2000,
            salary_max:4000

          },
          {
            id:'3',
            name: '安博公司',
            region: '30,',
            date1: '2019-7-3',

            location:'山东济南',
            type: 'Java工程师',
            salary_min: 2000,
            salary_max:4000

          },
          {
            id:'4',
            name: '安博公司',
            region: '30,',
            date1: '2019-7-3',
            location:'山东济南',
            type: 'Java工程师',
            salary_min: 2000,
            salary_max:4000

          },
          {
            id:'5',
            name: '安博公司',
            region: '30,',
            date1: '2019-7-3',
            location:'山东济南',
            type: 'Java工程师',
            salary_min: 2000,
            salary_max:4000
          },
          {
            id:'6',
            name: '安博公司',
            region: '30,',
            date1: '2019-7-3',
            location:'山东济南',
            type: 'Java工程师',
            salary_min: 2000,
            salary_max:4000

          },
          {
            id:'7',
            name: '安博公司',
            region: '30,',
            date1: '2019-7-3',
            location:'山东济南',
            type: 'Java工程师',
            salary_min: 2000,
            salary_max:4000
          },
          {
            id:'8',
            name: '安博公司',
            region: '30,',
            date1: '2019-7-3',
            location:'山东济南',
            type: 'Java工程师',
            salary_min: 2000,
            salary_max:4000
          },
          {
            id:'9',
            name: '安博公司',
            region: '30,',
            date1: '2019-7-3',
            location:'山东济南',
            type: 'Java工程师',
            salary_min: 2000,
            salary_max:4000
          }]
      }
    },
    methods:{
      GoInfoDetail(){
        this.$router.push({name:'infodetail'})
      }
    }
  }
</script>

<style scoped lang="less">
  .user-breadcrumb {
    line-height: 40px;
    background-color: #d4dae0;
    font-size: 18px;
    padding-left: 10px;
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
  .type{
    color: #6666cc;
  }
  .salary{
    color: red;
  }
  .info{
    border: 1px solid #cccccc;
    line-height: 50px;
    height: 50px;
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .info:hover{

    background: #f5f5f5;
  }
</style>
