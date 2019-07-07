<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>技术老师</el-breadcrumb-item>
      <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入学号" v-model="queryStr" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" ></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="success" plain @click="showscoreAddDialog">录入成绩</el-button>
      </el-col>
      <el-col :span="4">
        <!--    上传Excel-->
        <el-upload
          class="upload-demo"
          action="#"
          multiple
          :limit="3"

          :file-list="fileList">
          <el-button type="primary">点击上传</el-button>

        </el-upload>
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
      <el-table-column prop="number" label="学号" width="150">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="150">
      </el-table-column>
      <el-table-column prop="school" label="学校" width="180">
      </el-table-column>
      <el-table-column prop="class" label="班级" width="150">
      </el-table-column>
      <el-table-column prop="subject" label="科目" width="180">
      </el-table-column>
      <el-table-column prop="score" label="成绩" width="100">
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
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="curPage" >
    </el-pagination>




    <!-- 添加用户对话框 -->
    <el-dialog title="录入成绩" :visible.sync="scoreAddDialog" @close="closescoreAddDialog">
      <el-form :model="scoreAddForm" ref="scoreAddForm">
          <el-form-item prop="number" label="学号" label-width="120px">
          <el-input  v-model="scoreAddForm.number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="username" label="姓名" label-width="120px">
            <el-input  v-model="scoreAddForm.username" autocomplete="off"></el-input>
          </el-form-item>
        <el-form-item prop="school" label="学校" label-width="120px">
          <el-input v-model="scoreAddForm.school"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="class" label="班级" label-width="120px">
          <el-select  @change="chickvalue2"
                      v-model="scoreAddForm.class" filterable placeholder="请输入/请选择">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              v-model="item.value">
            </el-option>
          </el-select>

        </el-form-item>
          <el-form-item prop="subject" label="科目" label-width="120px">
              <el-select  @change="chickvalue"
                       v-model="scoreAddForm.subject" filterable placeholder="请输入/请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                v-model="item.value">
              </el-option>
            </el-select>

          </el-form-item>
          <el-form-item prop="score" label="成绩" label-width="120px">
            <el-input v-model="scoreAddForm.score"  autocomplete="off"></el-input>
          </el-form-item>
      </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="scoreAddDialog = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
          </div>

    </el-dialog>


    <!-- 编辑成绩对话框 -->
    <el-dialog title="修改成绩" :visible.sync="scoreEditDialog" @close="closescoreEditDailog">

      <el-form :model="scoreEditForm" :rules="userEditRules" ref="scoreEditForm">
        <el-form-item prop="number" label="学号" width="180">
          <el-input disabled  :value="scoreEditForm.number"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="姓名" width="180">
          <el-input disabled :value="scoreEditForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="school" label="学校" width="180">
          <el-input disabled :value="scoreEditForm.school"></el-input>
        </el-form-item>
        <el-form-item prop="class" label="班级" width="180">
          <el-input disabled :value="scoreEditForm.class"></el-input>
        </el-form-item>
        <el-form-item prop="subject" label="科目" width="180">

          <el-select  @change="chickvalue1"
                      v-model="scoreEditForm.subject" filterable placeholder="请输入/请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              v-model="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="score" label="成绩" width="180">
          <el-input  :value="scoreEditForm.score"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="scoreEditDialog = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>


  export default {
    created() {

    },

    data() {
      return {
        options: [{
          value: 'java基础',
          label: 'java基础'
        }, {
          value: '数据库',
          label: '数据库'
        }, {
          value: 'javaweb',
          label: 'javaweb'
        }, {
          value: 'ssm',
          label: 'ssm'
        }, {
          value: 'maven',
          label: 'maven'
        }],
        options1: [{
          value: '基础1班',
          label: '基础1班'
        }, {
          value: '基础2班',
          label: '基础2班'
        }, {
          value: '骨干班',
          label: '骨干班'
        }, {
          value: '卓越班',
          label: '卓越班'
        }, {
          value: '实施班',
          label: '实施班'
        }],
        userList: [],
        // 每页大小
        pageSize: 3,
        // 当前页码
        curPage: 1,
        // 总条数
        total: 0,

        // 控制用户添加对话框的展示和隐藏
        scoreAddDialog: false,
        scoreAddForm: {
          number:'',
          username: '',
          school: '',
          class: '',
          subject: '',
          score: ''
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

        // 控制编辑用户对话框的展示和隐藏
        scoreEditDialog: false,
        scoreEditForm: {
          number: -1,
          username: '',
          school: '',
          class: '',
          subject: '',
          score:''
        },
        tableData: [{
          number: '201603091071',
          username: '赵珂',
          school: '齐鲁工业大学',
          class: '基础班',
          subject:'数据结构',
          score:'98'
        },{
          number: '201603091071',
          username: '赵珂',
          school: '齐鲁工业大学',
          class: '基础班',
          subject:'数据结构',
          score:'98'
        },{
          number: '201603091071',
          username: '赵珂',
          school: '齐鲁工业大学',
          class: '基础班',
          subject:'数据结构',
          score:'98'
        },{
          number: '201603091071',
          username: '赵珂',
          school: '齐鲁工业大学',
          class: '基础班',
          subject:'数据结构',
          score:'98'
        },{
          number: '201603091071',
          username: '赵珂',
          school: '齐鲁工业大学',
          class: '基础班',
          subject:'数据结构',
          score:'98'
        }]
      //excel上传



      }
    },

    methods: {

      // 展示用户添加对话框
      showscoreAddDialog() {
        this.scoreAddDialog = true
      },
      // 关闭对话框重置表单
      closescoreAddDialog() {
        // console.log('对话框关闭了')
        this.$refs.scoreAddForm.resetFields()
      },

      // 添加用户


      // 根据用户id删除用户


      // 展示编辑对话框
      showScoreEditDailog(curUser) {
        // console.log(curUser)
        // 先获取到当前用户的数据
        // 数据交给 scoreEditForm 后，就会展示在编辑对话框中
        for (const key in this.scoreEditForm) {
          this.scoreEditForm[key] = curUser[key]
        }

        // 打开用户编辑对话框
        this.scoreEditDialog = true
      },

      // 关闭用户编辑对话框
      closescoreEditDailog() {
        this.$refs.scoreEditForm.resetFields()
      },

      chickvalue () {
        console.log(this.scoreAddForm.subject)
      },
      chickvalue1 () {
        console.log(this.scoreEditForm.subject)
      },

    chickvalue2 () {
      console.log(this.scoreAddForm.class)
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
