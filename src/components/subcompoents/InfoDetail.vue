<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生</el-breadcrumb-item>
      <el-breadcrumb-item>招聘信息查看</el-breadcrumb-item>
      <el-breadcrumb-item>招聘信息详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="header">
      <el-col :span="20">
        <div class="grid-content bg-purple-dark">
          <h1 class="type">Java工程师 <span class="salary">2000</span>-<span class="salary">4000</span></h1>
          <p class="location">山东济南</p>
        </div>
      </el-col>
      <el-col :span="4" >
        <el-button type="primary" plain size="mini" @click="showinfoAddDialog" class="button">点我报名</el-button>
           <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture">
            <el-button type="primary" plain  size="mini" class="button">上传简历</el-button>
          </el-upload>
         </el-col>



    </el-row>

    <el-row>
      <el-col :span="16 " class="content">
        <div class="grid-content bg-purple">
          <h1 class="describe">职位描述:</h1>
          <div>
            <h4 class="duty">岗位职责：</h4> <br />
            1、全面负责前端的开发工作，与后台的接口进行数据交互。 <br />
            2、基于H5标准，完成Web和H5移动端应用编程方面的工作。 <br />
            3、有小程序、公众号经验 <br />
            <h4>任职要求：</h4> <br />
            1、了解网页制作的流程，熟悉HTML，css,js技术。 <br />
            2、熟悉es6，熟悉vue，react优先。 <br />
            3、掌握Photoshop等设计软件，能够用这些软件进行切图。 <br />
            4、热爱互联网，有从事互联网相关工作的意愿。 <br />
            5、有较好的沟通能力、高度的责任感，有钻研新技术的兴趣和能力。 <br />
            薪资：月薪+年终奖+项目奖金+节假日福利+生日福利+期权分红 <br />
            地址：杭州下沙新加坡科技园5幢701-706室
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">
          <h1 class="c_name">公司名称:XXXXXX有限公司</h1>
          <p class="c_count">公司人数:XXXXXX人</p>
          <p class="c_adress">公司地址:XXXXX-XXXX-XXXX</p>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="报名信息" :visible.sync="infoAddDialog" @close="closeinfoAddDialog">
      <el-form :model="form"  ref="infoAddForm">
         <el-form-item label="学校">
          <el-input v-model="form.school" placeholder="请输入学校"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="form.class" placeholder="请输入班级"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="infoAddDialog = false">取 消</el-button>
        <el-button type="primary">立即发布</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'InfoDetail',
    data(){
      return {

        form: {
         school: '',
         name: '',
         class: ''
        },

        infoAddDialog: false
      }
    },
    methods: {
      // 展示添加对话框
      showinfoAddDialog() {
        this.infoAddDialog = true
      },
      // 关闭对话框重置表单
      closeinfoAddDialog() {
        // console.log('对话框关闭了')
        this.$refs.infoAddForm.resetFields()
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
