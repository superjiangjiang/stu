<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>学生</el-breadcrumb-item>
        <el-breadcrumb-item>查看个人信息</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row :gutter="20" style="margin-top: 10px;" >
        <el-col :span="4" :push="20">
          <el-button type="primary" plain size="mini" @click="showStudentEditDailog()">修改密码</el-button>
          </el-col>
      </el-row>
      <el-form ref="form" :model="form" label-width="120px" style="margin: 10px auto; width: 800px;">
         <el-form-item prop="id" label="学生档案号" style="width: 700px;">
          <el-input disabled  :value="form.id"></el-input>
        </el-form-item>
        <el-form-item prop="photo" label="学生照片" style="width: 700px;">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="form.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item prop="name" label="学生姓名" style="width: 700px;">
          <el-input disabled  :value="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="学生性别" style="width: 700px;">
          <el-input disabled  :value="form.sex"></el-input>
        </el-form-item>
        <el-form-item prop="school" label="学生原学校" style="width: 700px;">
          <el-input disabled  :value="form.school"></el-input>
        </el-form-item>
        <el-form-item prop="grade" label="实训届/入学年级" style="width: 700px;">
          <el-input disabled  :value="form.grade"></el-input>
        </el-form-item>
          <el-form-item prop="native_place" label="籍贯" style="width: 700px;">
            <el-input disabled  :value="form.native_place"></el-input>
          </el-form-item>
          <el-form-item prop="birthday" label="出生日期" style="width: 700px;">
            <el-input disabled  :value="form.birthday"></el-input>
          </el-form-item>
        <el-form-item prop="phone" label="联系方式" style="width: 700px;">
          <el-input disabled  :value="form.phone"></el-input>
        </el-form-item>
          <el-form-item prop="id_number" label="身份证号" style="width: 700px;">
            <el-input disabled  :value="form.id_number"></el-input>
          </el-form-item>
            <el-form-item prop="interview" label="曾经的面试历史" style="width: 700px;">
              <el-input disabled type="textarea" :value="form.interview"></el-input>
            </el-form-item>
        </el-form>





      <el-dialog title="学生管理" :visible.sync="studentEditDialog" @close="closestudentEditDialog">

        <el-form :model="studentEditForm"  ref="studentEditForm">
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="studentEditForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="studentEditForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-row :gutter="20" style="margin-top: 10px;">
            <el-col :span="8" :push="8">
              <el-button @click="studentEditDialog = false">取 消</el-button>
              <el-button type="primary" >确 定</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>

    </div>
</template>

<script>
  export default {
    name: 'Personal',
    data() {
      return {
        imageUrl: '',
        form: {
          id: 201603091048,
          photo: '../../../static/assets/logo.png',
          name: '宋阳阳',
          sex: '女',
          school: '齐鲁工业大学',
          grade: '2019',
          native_place: "山东省菏泽市",
          birthday: 2019-1-1,
          phone: '17862986510',
          id_number: '37xxxxxxxxxxxxxxxx',
          interview: '瑞德,虞美人,浪潮'
        },
        studentEditDialog: false,
        studentEditForm: {
          pass: '',
          checkPass: ''
        },
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      showStudentEditDailog() {

        this.studentEditDialog = true
      },
      // 关闭用户编辑对话框
      closestudentEditDialog() {
        this.$refs.form.resetFields()
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style scoped>
  .user-breadcrumb {
    line-height: 40px;
    background-color: #d4dae0;
    font-size: 18px;
    padding-left: 10px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
