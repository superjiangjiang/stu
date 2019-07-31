<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>学生</el-breadcrumb-item>
        <el-breadcrumb-item>查看个人信息</el-breadcrumb-item>
      </el-breadcrumb>

      <el-form ref="form" :model="form" label-width="150px" style="margin: 10px auto; width: 800px;">
         <el-form-item prop="id" label="学生档案号：" style="width: 700px;">
         {{form.sNo}}
        </el-form-item>
        <el-form-item prop="photo" label="学生照片：" style="width: 700px;">
          <el-upload
            class="avatar-uploader"
            action="123"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
             >
            <img v-if="form.photo" :src="form.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

            <span slot="footer" class="dialog-footer">
         <el-button @click="infoExcelDialog= false">取消</el-button>
         <el-button type="primary" @click="submitUploadFile()">确定</el-button>
      </span>
          </el-form-item>
        <el-form-item prop="name" label="学生姓名：" style="width: 700px;">
          {{form.name}}
        </el-form-item>
        <el-form-item prop="sex" label="学生性别：" style="width: 700px;">
          {{form.sex}}
        </el-form-item>
        <el-form-item prop="school" label="学生原学校：" style="width: 700px;">
         {{form.school}}
        </el-form-item>
        <el-form-item prop="grade" label="实训届/入学年级：" style="width: 700px;">
          {{form.grade}}
        </el-form-item>
          <el-form-item prop="native_place" label="籍贯：" style="width: 700px;">
           {{form.nativePlace}}
          </el-form-item>
          <el-form-item prop="birthday" label="出生日期：" style="width: 700px;">
           {{form.birthday}}
          </el-form-item>
        <el-form-item prop="phone" label="联系方式：" style="width: 700px;">
          {{form.phone}}
        </el-form-item>
          <el-form-item prop="id_number" label="身份证号：" style="width: 700px;">
            {{form.idNumber}}
          </el-form-item>
            <el-form-item prop="interview" label="曾经的面试历史：" style="width: 700px;">
             {{form.firstEmployment}}
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    created(){
      this.findMyInfo()
    },
    name: 'Personal',
    data() {
      return {
        imageUrl: '',
        form: {
          sNo: -1,
          photo: '',
          name: '宋阳阳',
          sex: '女',
          school: '齐鲁工业大学',
          grade: '2019',
          nativePlace: "山东省菏泽市",
          birthday: 2019-1-1,
          phone: '17862986510',
          idNumber: '37xxxxxxxxxxxxxxxx',
          firstEmployment: '瑞德,虞美人,浪潮',
        },
      }
    },
    methods: {
      /*学生查看个人信息*/
      async findMyInfo() {
        let res = await this.axios({
          url: '/api/v1/student/findMyInfo',
          method: 'get',
          params: {
            s_no:localStorage.getItem("s_no"),
          }
        })
        let { data,code } = res.data
       if (code == 0) {
         this.form.sNo = data.sNo
          this.form.photo = "http://47.103.10.32"+data.photo
          this.form.name = data.name
          this.form.sex=data.sex==0?"男":"女"
          this.form.school = data.school
          this.form.grade = data.grade
          this.form.nativePlace = data.nativePlace
          this.form.birthday = data.birthday
          this.form.phone = data.phone
          this.form.idNumber = data.idNumber
          this.form.firstEmployment = data.firstEmployment
          this.form.photo = data.photo
          console.log(this.form.photo)
        }
      },

      //学生上传头像提交之前的方法
      beforeAvatarUpload(file) {
        this.files = file;
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG、PNG 格式!');
          return
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return  isLt2M
        }

        this.imgFileName = file.name;
        let fileFormData = new FormData();
        fileFormData.append('file', this.files, this.imgFileName);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名
         let requestConfig = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }
        this.axios.post(`/api/v1/student/uploadStudent?file=`+this.files, fileFormData, requestConfig).then((res) => {
          console.log(res)
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            this.findMyInfo()
          } else{
            this.$message.error(res.data.msg)
          }
        })
        return true
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
