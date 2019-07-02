<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>教师</el-breadcrumb-item>
      <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入学号" v-model="queryStr" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" ></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" plain @click="showUserAddDialog">录入成绩</el-button>
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
      <el-table-column prop="number" label="学号" width="200">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="200">
      </el-table-column>
      <el-table-column prop="grade" label="年级" width="200">
      </el-table-column>
      <el-table-column prop="subject" label="科目" width="200">
      </el-table-column>
      <el-table-column prop="score" label="成绩" width="200">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showUserEditDailog(scope.row)"></el-button>
          <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="delUserById(scope.row.id)"></el-button>

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
    <el-dialog title="录入成绩" :visible.sync="userAddDialog" @close="closeUserAddDialog">
      <el-form :model="userAddForm" :rules="userAddRules" ref="userAddForm">
          <el-form-item prop="number" label="学号" label-width="120px">
          <el-input  v-model="userAddForm.number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="username" label="姓名" label-width="120px">
            <el-input  v-model="userAddForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="class" label="班级" label-width="120px">
            <el-input v-model="userAddForm.class"  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="subject" label="科目" label-width="120px">
            <el-input v-model="userAddForm.subject"  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="score" label="成绩" label-width="120px">
            <el-input v-model="userAddForm.score"  autocomplete="off"></el-input>
          </el-form-item>
      </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="userAddDialog = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
          </div>

    </el-dialog>


    <!-- 编辑用户对话框 -->
    <el-dialog title="修改成绩" :visible.sync="userEditDialog" @close="closeUserEditDialog">

      <el-form :model="userEditForm" :rules="userEditRules" ref="userEditForm">
        <el-form-item prop="number" label="学号" width="180">
          <el-input disabled  :value="userEditForm.number"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="姓名" width="180">
          <el-input  :value="userEditForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="grade" label="年级" width="180">
          <el-input  :value="userEditForm.grade"></el-input>
        </el-form-item>
        <el-form-item prop="subject" label="科目" width="180">
          <el-input  :value="userEditForm.subject"></el-input>
        </el-form-item>
        <el-form-item prop="score" label="成绩" width="180">
          <el-input  :value="userEditForm.score"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userEditDialog = false">取 消</el-button>
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
        userList: [],
        // 每页大小
        pageSize: 3,
        // 当前页码
        curPage: 1,
        // 总条数
        total: 0,
        // 搜索内容
        queryStr: '',

        // 控制用户添加对话框的展示和隐藏
        userAddDialog: false,
        userAddForm: {
          number:'',
          username: '',
          class: '',
          subject: '',
          score: ''
        },
        userAddRules: {
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
        userEditDialog: false,
        userEditForm: {
          number: -1,
          username: '',
          grade: '',
          subject: '',
          score:''
        },
        tableData: [{
          number: '201603091071',
          username: '赵珂',
          grade: '计科软件外包(16-2)',
          subject:'数据结构',
          score:'98'
        }, {
          number: '201603091071',
          username: '赵珂',
          grade: '计科软件外包(16-2)',
          subject:'数据结构',
          score:'98'
        },{
          number: '201603091071',
          username: '赵珂',
          grade: '计科软件外包(16-2)',
          subject:'数据结构',
          score:'98'
        },{
          number: '201603091071',
          username: '赵珂',
          grade: '计科软件外包(16-2)',
          subject:'数据结构',
          score:'98'
        },{
          number: '201603091071',
          username: '赵珂',
          grade: '计科软件外包(16-2)',
          subject:'数据结构',
          score:'98'
        },{
          number: '201603091071',
          username: '赵珂',
          grade: '计科软件外包(16-2)',
          subject:'数据结构',
          score:'98'
        },{
          number: '201603091071',
          username: '赵珂',
          grade: '计科软件外包(16-2)',
          subject:'数据结构',
          score:'98'
        },{
          number: '201603091071',
          username: '赵珂',
          grade: '计科软件外包(16-2)',
          subject:'数据结构',
          score:'98'
        },{
          number: '201603091071',
          username: '赵珂',
          grade: '计科软件外包(16-2)',
          subject:'数据结构',
          score:'98'
        },{
          number: '201603091071',
          username: '赵珂',
          grade: '计科软件外包(16-2)',
          subject:'数据结构',
          score:'98'
        }]


      }
    },

    methods: {
      // 获取用户列表数据
      // curPage = 1 给参数添加默认值
      /* getUserList(curPage = 1) {
        this.$http
          .get('/student', {
            params: {
              // 当前页
              pagenum: curPage,
              // 每页展示多少条数据
              pagesize: 3,
              // 查询条件
              query: this.queryStr || ''
            }
            // 将 token 作为请求头，传递给服务器接口
            // 这样，才能正确的调用这个接口
            // headers: {
            //   Authorization: localStorage.getItem('token')
            // }
          })
          .then(res => {
            console.log('请求成功:', res)
            const { data, meta } = res.data
            if (meta.status === 200) {
              // 获取数据成功
              this.userList = data.student
              this.total = data.total
              this.curPage = data.pagenum
            }
          })
      }, */

      // 展示用户添加对话框
      showUserAddDialog() {
        this.userAddDialog = true
      },
      // 关闭对话框重置表单
      closeUserAddDialog() {
        // console.log('对话框关闭了')
        this.$refs.userAddForm.resetFields()
      },

      // 添加用户


      // 根据用户id删除用户


      // 展示编辑对话框
      showUserEditDailog(curUser) {
        // console.log(curUser)
        // 先获取到当前用户的数据
        // 数据交给 userEditForm 后，就会展示在编辑对话框中
        for (const key in this.userEditForm) {
          this.userEditForm[key] = curUser[key]
        }

        // 打开用户编辑对话框
        this.userEditDialog = true
      },

      // 关闭用户编辑对话框
      closeUserEditDialog() {
        this.$refs.userEditForm.resetFields()
      },

      // 点击确定按钮，修改用户数据



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
