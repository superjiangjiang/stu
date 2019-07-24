<template>
    <div>
      <el-row>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>学生</el-breadcrumb-item>
          <el-breadcrumb-item>查看招聘信息</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入职位名/公司名/位置" v-model="queryStr" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"  @click="search"></el-button>
          </el-input>
        </el-col>
      </el-row>


      <el-row>
        <el-card class="box-card" shadow="hover" >
          <div v-for="item in info" :key="item.id" class="info" @click="GoInfoDetail(item.id)">
            <el-row :gutter="20">
              <el-col :span="4"><div class="grid-content bg-purple type">职位：{{item.position}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple salary"><span>薪资：{{item.salary}}</span></div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple"><span class="name">公司名：{{item.companyName}}</span></div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple"><span >位置：{{item.location}}</span></div></el-col>
              <el-col :span="4"> <div class="grid-content bg-purple"><span>招聘人数：{{item.region}}</span></div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple"><span>发布于：{{item.createtime}}</span></div></el-col>
            </el-row>
          </div>
        </el-card>
      </el-row>
      <div class="block">

        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'LookInfo',
    created() {
      this.gettableData()
    },
    data() {
      return {
        queryStr: '',
        info: [],
        pageSize: 3,
        pageNum: 1,
        total: 0,
       }
    },
    methods: {
      /*跳转到职位详情页,带着id*/
      GoInfoDetail(id) {
        console.log(id)
        this.$router.push({
          name: 'infodetail',
          query:{
          id: id
          }})
      },

      /*学生查询所有职位*/
      async gettableData() {
        let res = await this.axios({
          url: '/api/v1/student/findAllPosition',
          method: 'get',
          params: {
            pageNum: this.pageNum,
          }
        })
        let {status} = res
        let {data} = res.data
        console.log(res)
        if (status == 200) {
          this.info = data.list
          this.total = data.total
          this.pageSize = data.pageSize
         }
      },
      /*学生通过关键字查询职位*/
      async findPositionByKey() {
        let res = await this.axios({
          url: '/api/v1/student/findPositionByKey',
          method: 'get',
          params: {
            pageNum: this.pageNum,
            key:this.queryStr,
          }
        })
        let {status} = res
        let {data} = res.data
        console.log(res)
        if (status == 200) {
          this.info = data.list
          this.total = data.total
          this.pageSize = data.pageSize
        }
      },

      //分页查询
      handleCurrentChange(val) {
        this.pageNum = val
        this.key = ''
        this.findPositionByKey()
      },

      //模糊查询
      search() {
        // 搜索的时候，让当前页变成1
        this.pageNum = 1
        this.findPositionByKey()
        console.log(this.queryStr)
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

  /*.el-row {
    margin-bottom: 2px;
    &:last-child {
      margin-bottom: 0;
    }
  }*/
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
  .info div{
    height: 50px;
    overflow: hidden;
  }
</style>
