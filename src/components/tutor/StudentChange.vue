<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学业导师</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入学号" v-model="queryStr" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"  @click="search"></el-button>
        </el-input>
      </el-col>

      <el-col :span="4">
        <el-button type="primary" size="small" @click="showInfoDialog">点击上传学生信息excel</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="small" @click="showDormitoryDialog">点击上传学生宿舍excel</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="small" @click="showClassDialog">点击上传学生班级excel</el-button>
      </el-col>
      </el-row>



    <el-table :data="tableData" stripe   @selection-change="handleSelectionChange"  @load="changeStatus">
      <el-table-column prop="sNo" label="学号" width="120">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="school" label="学校" width="140">
      </el-table-column>
      <el-table-column prop="clazz.name" label="班级" width="80">
      </el-table-column>
      <el-table-column prop="dormitoryNo"  label="宿舍" width="120" >
      </el-table-column>
      <el-table-column prop="status" label="就业状态" width="80">
      </el-table-column>
      <el-table-column prop="firstEmployment" label="首次就业单位" width="180">
      </el-table-column>
      <el-table-column prop="firstSalary" label="薪资" width="100">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showStudentEditDialog(scope.row)"></el-button>
          <el-button type="primary" plain size="mini" @click="showJobTrackingDialog(scope.row)">就业追踪</el-button>

        </template>
      </el-table-column>

    </el-table>

    <!--
      分页组件
        background 背景色
        layout 分页显示的内容
        total 总条数

        给 current-page 属性添加 .sync 修饰符后, 就可以设置当前页
    -->
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="page_no"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 编辑用户对话框 -->
    <el-dialog title="学生管理" :visible.sync="studentEditDialog">

      <el-form :model="studentEditForm"  ref="studentEditForm">
        <el-form-item prop="sNo" label="学号" width="100">
          <el-input disabled  v-model= "studentEditForm.sNo"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名" width="100">
          <el-input  v-model="studentEditForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="school" label="学校" width="100">
          <el-input  v-model="studentEditForm.school"></el-input>
        </el-form-item>
        <el-form-item prop="clazz" label="班级" width="100">
          <el-select
            v-model="studentEditForm.clazz" filterable placeholder="请输入/请选择" >
            <el-option
              v-for="item in options1"
              :key="item.name"
              :label="item.name"
              v-model="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="dormitoryNo" label="宿舍" width="100">
          <el-input  v-model="studentEditForm.dormitoryNo"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="就业" width="100">
          <el-select
            v-model="studentEditForm.status" filterable placeholder="请输入/请选择" >
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              v-model="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="studentEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="editStudent">确 定</el-button>
      </div>
    </el-dialog>
<!--就业追踪-->
    <el-dialog title="就业追踪" :visible.sync="jobTrackingDialog">
      <el-table :data="jobTrackingData">
        <el-table-column prop="companyName" label="公司" width="250"></el-table-column>
        <el-table-column prop="salary" label="薪水" idth="100"></el-table-column>
        <el-table-column prop="type" label="职位" idth="150"></el-table-column>
      </el-table>
      <el-row :gutter="20" >
        <el-col :span="6" push="10">
          <el-button  plain size="mini" type="primary" @click="showinfoAddDialog" style="margin-top: 10px;">添加就业追踪</el-button>
        </el-col>
      </el-row>
    </el-dialog>


    <el-dialog title="添加就业追踪" :visible.sync="infoAddDialog">
      <el-form :model="form"  ref="form">
        <el-form-item label="公司名">
          <el-input v-model="form.companyName"  placeholder="请输入公司名"></el-input>
        </el-form-item>
        <el-form-item label="薪水">
          <el-input v-model="form.salary"  placeholder="请输入薪水"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select
            v-model="form.type" filterable placeholder="请输入/请选择" >
            <el-option
              v-for="item in options5"
              :key="item.value"
              :label="item.label"
              v-model="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="infoAddDialog = false">取 消</el-button>
        <el-button type="primary" @click="addinfo">添加</el-button>
      </div>

    </el-dialog>

    <el-dialog title="上传学生信息excel" :visible.sync="infoExcelDialog">
      <el-upload
        ref="uploadInfo"
        action=" "
        class="upload-demo"
        :limit="1"
        :file-list="infoFileList"
        :before-upload="beforeUploadFile"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
        <div slot="tip" class="el-upload-list__item-name">{{infoFileName}}</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
         <el-button @click="infoExcelDialog= false">取消</el-button>
         <el-button type="primary" @click="submitUploadFile()">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="上传学生班级excel" :visible.sync="classExcelDialog">
      <el-upload
        ref="uploadClass"
        action=""
        class="upload-demo"
        :file-list="classFileList"
        :before-upload="beforeUploadClass"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
        <div slot="tip" class="el-upload-list__item-name">{{classFileName}}</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
         <el-button @click="closeClassExcelDialog">取消</el-button>
         <el-button type="primary" @click="submitUploadClass()">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="上传学生宿舍excel" :visible.sync="domitoryExcelDialog">
      <el-upload
        ref="uploadDormitory"
        action="submitUploadDormitory"
        class="upload-demo"
        :file-list="domitoryFileList"
        :before-upload="beforeUploadDormitory"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
        <div slot="tip" class="el-upload-list__item-name">{{domitoryFileName}}</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
         <el-button @click="closeDormitoryExcelDialog">取消</el-button>
         <el-button type="primary" @click="submitUploadDormitory()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    created() {
      this.getTableData()
    },
    data() {
      return {
        sid:'',
        options1: [
          ],
        options4: [{
          value: '0',
          label: '未就业'
        }, {
          value: '1',
          label: '已就业'
        }],
        options5: [{
          value: '开发',
          label: '开发'
        }, {
          value: '测试',
          label: '测试'
        },{
          value:'实施',
          label:'实施'
        }],
        // 控制编辑用户对话框的展示和隐藏
        studentEditDialog: false,
        studentEditForm: {
          sNo: -1,
          name: '',
          school: '',
          clazz: '',
          dormitoryNo: '',
          firstEmployment:'',
          firstSalary: '',
          status: ''
        },
        jobTrackingDialog: false,
        jobTrackingData: [],
        tableData: [],
        form: {
          sId:-1,
          companyName:'',
          salary:'',
          type:''

        },
        infoAddDialog: false,
        //excel上传
        queryStr:'',
        page_no:1,
        pageSize:1,
        total:0,

        infoExcelDialog:false,
        classExcelDialog:false,
        domitoryExcelDialog:false,
        infoFileList:[],
        infoFileName:'',
        classFileList:[],
        classFileName:'',
        domitoryFileList:[],
        domitoryFileName:'',
      }
    },
    methods: {
      closeDormitoryExcelDialog(){
        this.domitoryExcelDialog = false
        this.$refs.uploadDormitory.clearFiles()
        this.domitoryFileName = ''
      },
      closeClassExcelDialog(){
        this.classExcelDialog = false
        this.$refs.uploadClass.clearFiles()
        this.classFileName = ''
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      delGroup() {
        var ids = this.sels.map(item => item.id).join()//获取所有选中行的id组成的字符串，以逗号分隔
      },

      // 展示编辑对话框
      async showStudentEditDialog(curUser) {
        // 先获取到当前用户的数据
        // 数据交给 studentEditForm 后，就会展示在编辑对话框中
        if(curUser.status =="已就业"){
          curUser.status =parseInt(1)
        }else if(curUser.status == '未就业'){
          curUser.status = parseInt(0)
        }
        this.studentEditForm.name = curUser.name
        this.studentEditForm.sNo = curUser.sNo
        this.studentEditForm.school = curUser.school
        this.studentEditForm.status =parseInt( curUser.status)
        this.studentEditForm.dormitoryNo = curUser.dormitoryNo
        this.studentEditForm.clazz = curUser.clazz.name
        // 打开用户编辑对话框
        this.studentEditDialog = true
        let res = await this.axios({
          url: '/api/v1/tutor/toUpdateStu',
          method: 'get',

        })
        let {status} = res
        let {data} = res.data

        if (status == 200) {
          this.options1 = data
        }
      },

      //确认修改
      editStudent() {

         this.$refs.studentEditForm.validate(async valid => {
          if (valid) {
            // 发送ajax请求

            let res = await this.axios.put(`/api/v1/tutor/updateStu/`, {
              sNo:this.studentEditForm.sNo,
              name:this.studentEditForm.name,
              school:this.studentEditForm.school,
              status:this.studentEditForm.status,
              dNumber:this.studentEditForm.dormitoryNo,
              cName:this.studentEditForm.clazz
            })
            let { code } = res.data
            if (code === 0) {
              this.studentEditDialog = false
              this.$refs.studentEditForm.resetFields()
              this.getTableData()
              this.$message.success('恭喜你，修改成功了')
            } else {
              this.$message.error('很遗憾，修改失败了')
            }
          } else {
            return false
          }
        })
      },

      //打开就业追踪
      async showJobTrackingDialog(cur) {
        this.jobTrackingDialog = true
        let res = await this.axios({
          url: '/api/v1/tutor/getWorkInfo',
          method: 'get',
          params: {
            s_id: cur.id,
          }
        })
        let {status} = res
        let {data} = res.data

        if (status == 200) {
          this.jobTrackingData = data
        }
        this.sid=cur.id
      },
      //添加就业跟踪
      showinfoAddDialog(row) {
        this.infoAddDialog = true
        this.jobTrackingDialog = false
        this.form.sId=this.sid
      },
      addinfo(){
        this.$refs.form.validate(async valid => {
          if (valid) {
            // 发送ajax请求
            let res = await this.axios.post(`/api/v1/tutor/addWorkInfo`, this.form)
            let { code } = res.data
            if (code === 0) {
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
            }
          } else {
            return false
          }
        })

      },
      //展示信息
      async getTableData() {
        let res = await this.axios({
          url: '/api/v1/tutor/toStuIndex',
          method: 'get',
          params: {
            page_no: this.page_no,
            key: this.queryStr,
          }
        })
        let {status} = res
        let {data} = res.data
        console.log(res)
        if (status == 200) {
          this.tableData = data.list
          this.total = data.total
          this.pageSize = data.pageSize
        }
      },
      //分页查询

      handleCurrentChange(val) {
        this.page_no = val
        this.getTableData()
      },

      //模糊查询
      search() {
        // 搜索的时候，让当前页变成1
        this.page_no = 1
        this.getTableData()
      },


      //改变就业状态
      changeStatus() {
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].status == 0) {
            this.tableData[i].status = "未就业"
          } else if (this.tableData[i].status == 1) {
            this.tableData[i].status = "已就业"
          }

        }
      },

      showInfoDialog(){
        this.infoExcelDialog = true
      },
      showDormitoryDialog(){
        this.domitoryExcelDialog= true
      },
      showClassDialog(){
        this.classExcelDialog = true
      },

      beforeUploadFile(file){
        this.files = file;
        const extension = file.name.split('.')[1] === 'xls'
        const extension2 = file.name.split('.')[1] === 'xlsx'
        const isLt2M = file.size / 1024 / 1024 < 5
        if (!extension && !extension2) {
          this.$message.warning('上传模板只能是 xls、xlsx格式!')
          return
        }
        if (!isLt2M) {
          this.$message.warning('上传模板大小不能超过 5MB!')
          return
        }

        this.infoFileName = file.name;
        return false // 返回false不会自动上传
      },


      submitUploadFile() {
        if(this.infoFileName == ""){
          this.$message.warning('请选择要上传的文件！')
          return false
        }
        let fileFormData = new FormData();
        fileFormData.append('file', this.files, this.fileName);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名
        let requestConfig = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }
        this.axios.post(`/api/v1/tutor/addStudents?file=`+this.files, fileFormData, requestConfig).then((res) => {
          console.log(res)
          if (res.data.code === 0) {
            this.$message({
              message: "导入成功",
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.infoExcelDialog = false
                this.$refs.uploadInfo.clearFiles()
                this.infoFileName = ''
              }
            })
            this.getTableData()
          } else {
            this.$message.error(res.data.msg)

          }
        })
      },


      beforeUploadDormitory(file){
        console.log(file,'文件');
        this.files = file;
        const extension = file.name.split('.')[1] === 'xls'
        const extension2 = file.name.split('.')[1] === 'xlsx'
        if (!extension && !extension2) {
          this.$message.warning('上传模板只能是 xls、xlsx格式!')
          return
        }
        this.domitoryFileName = file.name;
        return false
      },


      submitUploadDormitory() {
        if(this.domitoryFileName == ""){
          this.$message.warning('请选择要上传的文件！')
          return false
        }
        let fileFormData = new FormData();
        fileFormData.append('file', this.files, this.filename);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名

        let requestConfig = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }
        this.axios.post(`/api/v1/tutor/addStuDormitory?file=`+this.files, fileFormData, requestConfig).then((res) => {
          if (res.data.code === 0) {
            this.$message({
              message: res.data.data,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.domitoryExcelDialog = false
                this.$refs.uploadDormitory.clearFiles()
                this.domitoryFileName = ''
              }
            })
            this.getTableData()
          } else {
            this.$message.error(data.msg)
          }
        })

      },

      beforeUploadClass(file){
        console.log(file,'文件');
        this.files = file;
        const extension = file.name.split('.')[1] === 'xls'
        const extension2 = file.name.split('.')[1] === 'xlsx'
        if (!extension && !extension2) {
          this.$message.warning('上传模板只能是 xls、xlsx格式!')
          return
        }
        this.classFileName = file.name;
        return false
      },


      submitUploadClass() {
        if(this.classFileName == ""){
          this.$message.warning('请选择要上传的文件！')
          return false
        }
        let fileFormData = new FormData();
        fileFormData.append('file', this.files, this.filename);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名

        let requestConfig = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }
        this.axios.post(`/api/v1/tutor/addStuClass?file=`+this.files, fileFormData, requestConfig).then((res) => {
          if (res.data.code === 0) {
            this.$message({
              message: res.data.data,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.classExcelDialog = false
                this.$refs.uploadClass.clearFiles()
                this.classFileName = ''
              },
            })
            this.getTableData()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },

    },

    updated() {
      this.changeStatus();

    },


  }
</script>

<style>
  .user-breadcrumb {
    line-height: 40px;
    background-color: #d4dae0;
    font-size: 18px;
    padding-left: 10px;
  }
</style>
