<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生</el-breadcrumb-item>
      <el-breadcrumb-item>查看招聘信息</el-breadcrumb-item>
      <el-breadcrumb-item>招聘信息详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="header">
      <el-col :span="20">
        <div class="grid-content bg-purple-dark">
          <h1 class="type">{{position}} <span class="salary">{{salary}}</span></h1>
          <p class="location">{{location}}</p>
        </div>
      </el-col>
      <el-col :span="4" >
        <el-button type="primary" plain size="middle" @click="addinfo" class="button">点我报名</el-button>
         </el-col>
    </el-row>

    <el-row>
      <el-col :span="16 " class="content">
        <div class="grid-content bg-purple">
          <h1 class="describe">职位描述:</h1>
          <div>
            <h4 class="duty">岗位职责：</h4> <br />
           {{detail}} <br />
            {{detail}}  <br />
            {{detail}}  <br />
            <h4>任职要求：</h4> <br />
            {{detail}}  <br />
            {{detail}}  <br />
            {{detail}}  <br />
            {{detail}}  <br />
            {{detail}}  <br />
            </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">
          <h1 class="c_name">公司名称:{{companyName}}</h1>
           <p class="c_adress">公司地址:{{location}}</p>
        </div>
      </el-col>
    </el-row>



  </div>
</template>

<script>
import axios from 'axios'
  export default {
  /*接收上一个页面传来的id,根据id查询所有数据渲染详情页*/
    created() {
     this.p_id=this.$route.query.id
      this.gettableData()
    },
    name: 'InfoDetail',

    data(){
      return {
        p_id: -1,
        position: '',
        salary: '',
        companyName: '',
        location:'',
        detail: '',
      }
    },
    methods: {
     /* 通过id查询岗位详情*/
      async gettableData() {
        let res = await this.axios({
          url: '/api/v1/student/findPositionInfoByPid',
          method: 'get',
          params: {
            p_id : this.p_id,
          }
        })
        let {status} = res
        let {data} = res.data
        if (status == 200) {
          console.log(data)
          this.company = data.company
          this.detail = data.detail
          this.location = data.location
          this.position = data.position
          this.salary = data.salary
        }
      },

     /*学生报名,报400错误*/
      async addinfo(){
            // 发送ajax请求
            let res = await this.axios.post(`/api/v1/student/studentSignupPosition`,{p_id:this.p_id})
            let { code } = res.data
            console.log(res)
            /*if (code === 0) {
              this.$message.success('恭喜你，添加成功了')
              // 清空表单的内容
              this.$refs.form.resetFields()
              // 关闭模态框
              this.infoAddDialog = false
              // 重新渲染
              // 求最大的页码
              this.total++
              this.current = Math.ceil(this.total / this.pageSize)
              this.getTableData()
            } else {
              this.$message.error('添加失败了')
            }*/


      },
      //excel 上传
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>

<style scoped>


  .content{
    margin-left: 15%;
  }
  .header{
    text-align: center;
  }
  .salary{
    color: red;
  }
  .button{
    margin:10px 0 0 0;
  }
  .user-breadcrumb {
    line-height: 40px;
    background-color: #d4dae0;
    font-size: 18px;
    padding-left: 10px;
  }
</style>
