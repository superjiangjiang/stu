<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>技术老师</el-breadcrumb-item>
      <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入学号/姓名/学校/课程名/班级id"v-model="queryStr" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="success" plain @click="showscoreAddDialog">录入成绩</el-button>
      </el-col>
    </el-row>

    <!--
      el-table 表格组件
        data 用来给表格组件提供数据
        stripe 添加改属性后，启用隔行变色效果
      el-table-column 表格中的每一列
        label 每一列的标题名称
        width 每一列的宽度
        prop 表示数据中的属性名（字段名称）
    userList = [
      {}, {}, {}
    ]
     -->
    <el-table :data="tableData" stripe>
      <el-table-column prop="student.sNo" label="学号" width="150">
      </el-table-column>
      <el-table-column prop="student.name" label="姓名" width="150">
      </el-table-column>
      <el-table-column prop="student.school" label="学校" width="180">
      </el-table-column>
      <el-table-column prop="student.clazz.name" label="年级" width="150">
      </el-table-column>
      <el-table-column prop="course.name" label="科目" width="180">
      </el-table-column>
      <el-table-column prop="grade" label="成绩" width="100">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showScoreEditDailog(scope.row)"></el-button>
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
      :current-page="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>


    <!-- 添加用户对话框 -->
    <el-dialog title="录入成绩" :visible.sync="scoreAddDialog" @close="closescoreAddDialog">
      <el-form :model="scoreAddForm" ref="scoreAddForm">
        <el-form-item prop="stuNo" label="学号" label-width="120px">
          <el-input  v-model="scoreAddForm.stuNo" autocomplete="off" @blur="findinfo"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名" label-width="120px">
          <el-input disabled :value="scoreAddForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="school" label="学校" label-width="120px">
          <el-input disabled :value="scoreAddForm.school"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="clazz" label="班级" label-width="120px">
          <el-input disabled :value="scoreAddForm.clazz"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="crId" label="科目" label-width="120px">
          <el-select  @change="chickvalue"
                      v-model="scoreAddForm.crId" filterable placeholder="请输入/请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              v-model="item.id">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item prop="grade" label="成绩" label-width="120px">
          <el-input v-model="scoreAddForm.grade"  autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="scoreAddDialog = false">取 消</el-button>
        <el-button type="primary" @click="addScore">确 定</el-button>
      </div>

    </el-dialog>


    <!-- 编辑成绩对话框 -->
    <el-dialog title="修改成绩" :visible.sync="scoreEditDialog" @close="closescoreEditDailog">

      <el-form :model="scoreEditForm" ref="scoreEditForm">
        <el-form-item prop="stuNo" label="学号" width="180">
          <el-input disabled  v-model="scoreEditForm.stuNo"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名" width="180">
          <el-input disabled v-model="scoreEditForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="school" label="学校" width="180">
          <el-input disabled v-model="scoreEditForm.school"></el-input>
        </el-form-item>
        <el-form-item prop="clazz" label="班级" width="180">
          <el-input disabled v-model="scoreEditForm.clazz"></el-input>
        </el-form-item>
        <el-form-item prop="crId" label="科目" width="180">
          <el-select  @change="chickvalue1"
                      v-model="scoreEditForm.crId" filterable placeholder="请输入/请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              v-model="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="grade" label="成绩" width="180">
          <el-input  v-model="scoreEditForm.grade"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="scoreEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="editScore">确 定</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    created() {
      this.getTableData()
    },
    data() {
      return {
        options: [],
        queryStr: "",
        userList: [],
        // 每页大小
        pageSize: 3,
        // 当前页码
        pageNum: 1,
        // 总条数
        total: 0,
        fileList:[],
        // 控制添加对话框的展示和隐藏
        scoreAddDialog: false,
        scoreAddForm: {
          stuNo: '',
          name: '',
          school: '',
          clazz: '',
          crId: '',
          grade: ''
        },
        scoreAddRules: {
          username: [
            { required: true, message: '姓名为必填项', trigger: 'blur' },
            {
              min: 2,
              max: 4,
              message: '姓名长度在 2 到 4 个字符',
              trigger: 'blur'
            }
          ]
        },
        // 控制编辑对话框的展示和隐藏
        scoreEditDialog: false,
        scoreEditForm: {
          sId: -1,
          stuNo: -1,
          name: '',
          school: '',
          clazz: '',
          crId: -1,
          grade: -1
        },
        tableData: []
        //excel上传
      }
    },
    methods: {
      //根据学生学号\学生名字\学校\课程名字\班级id 查询多个成绩或者几个成绩
      async getTableData() {
        let res = await this.axios.post('/api/v1/technical_teacher/get_grade_info',
          {
          //  pageNum: this.pageNum,
            stuNo:this.queryStr.replace(/\s*!/g,""),
             stuName:this.queryStr.replace(/\s*!/g,""),
              school:this.queryStr.replace(/\s*!/g,""),
             courseName:this.queryStr.replace(/\s*!/g,""),
             clazzId: this.queryStr.replace(/\s*!/g,""),
          })
        let {data} = res
        if (data.code === 0) {
          let {list} = data.data
          this.tableData = list
          this.total = data.data.total
          this.pageSize = data.data.pageSize
        }
      },
      /*根据学生学号查学校，名字，班级*/
      async findinfo(){
        let res = await this.axios({
          url: `/api/v1/technical_teacher/get_basic_student`,
          method: 'get',
          params: {
            stuNo: this.scoreAddForm.stuNo
          }
        })
        let {data,code} = res.data
        if (code === 0) {
          this.scoreAddForm.name = data.name
          this.scoreAddForm.school = data.school
          this.scoreAddForm.clazz = data.grade
        }
      },
      /*查询所有课程*/
      async findcourse(){
        let res = await this.axios({
          url: '/api/v1/technical_teacher/get_all_course',
          method: 'get',
          params: {
            key: ''
          }
        })
        let {data,code} = res.data
        if (code === 0) {
          this.options = res.data.data
        }
      },
      /*模糊查询*/
      search() {
        this.pageNum=1
        // 搜索的时候，让当前页变成1
        this.getTableData()
      },
      // 展示用户添加对话框
      showscoreAddDialog() {
        this.findcourse()
        this.scoreAddDialog = true
      },
      // 关闭对话框重置表单
      closescoreAddDialog() {
        // console.log('对话框关闭了')
        this.$refs.scoreAddForm.resetFields()
      },
      // 添加成绩
      async addScore(){
        this.$refs.scoreAddForm.validate(async valid => {
          if (valid) {
            // 发送ajax请求
            let res = await this.axios.post(`/api/v1/technical_teacher/insert_grade`, this.scoreAddForm)
            let { code } = res.data
            if (code === 0) {
              this.$message.success('恭喜你，添加成功了')
              // 清空表单的内容
              this.$refs.scoreAddForm.resetFields()
              // 关闭模态框
              this.scoreAddDialog = false
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
      // 展示编辑对话框
      async showScoreEditDailog(curUser) {
        this.findcourse()
        this.scoreEditForm.crId = curUser.course.id
        this.scoreEditForm.grade =curUser.grade
        this.scoreEditForm.stuNo = parseInt(curUser.student.sNo)
        this.scoreEditForm.name = curUser.student.name
        this.scoreEditForm.school = curUser.student.school
        this.scoreEditForm.clazz = curUser.student.clazz.name
        this.scoreEditForm.sId =  curUser.student.id
        this.scoreEditDialog = true
      },
      // 修改学生成绩
      async editScore(){
        let res = await this.axios.post('/api/v1/technical_teacher/modify_grade',
          {sId:this.scoreEditForm.sId,
            crId:this.scoreEditForm.crId,
            grade:this.scoreEditForm.grade
          }
        )
        console.log(res.data.code)
        if (res.data.code === 0) {
          this.scoreEditDialog = false
          this.$refs.scoreEditForm.resetFields()
          this.getTableData()
          this.$message.success('恭喜你，修改成功了')
        } else {
          this.$message.error('很遗憾，修改失败了')
        }
      },
      // 关闭用户编辑对话框
      closescoreEditDailog() {
        this.$refs.scoreEditForm.resetFields()
      },
      /*添加对话框中的下拉框值变化了*/
      chickvalue () {},
      /*编辑对话框中的下拉框值变化了*/
      chickvalue1(){
        console.log(this)
      },
      /*点击分页按钮触发*/
      handleCurrentChange(val) {
        this.pageNum = val
        this.getTableData()
      }
    }
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
