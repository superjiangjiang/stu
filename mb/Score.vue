<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生</el-breadcrumb-item>
      <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入用户名" v-model="queryStr" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="queryUserList"></el-button>
        </el-input>
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
    <el-table :data="userList" stripe>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180">
      </el-table-column>
      <el-table-column prop="mobile" label="电话" width="180">
      </el-table-column>
      <el-table-column label="用户状态">
        <!-- scope.row 表示当前行的数据 -->
        <template slot-scope="scope">
          <!--
            v-model 用来绑定数据
            active-color="#409EFF" 启用时的颜色
            inactive-color="#C0CCDA" 禁用时的颜色
           -->
          <el-switch v-model="scope.row.mg_state" @change="changeUserState(scope.row.id, scope.row.mg_state)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showUserEditDailog(scope.row)"></el-button>
          <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="delUserById(scope.row.id)"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini" @click="showUserAssignDialog">分配角色</el-button>
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
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="curPage" @current-change="changePage">
    </el-pagination>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="userAddDialog" @close="closeUserAddDialog">
      <el-form :model="userAddForm" :rules="userAddRules" ref="userAddForm">
        <el-form-item prop="username" label="用户名" label-width="120px">
          <el-input v-model="userAddForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" label-width="120px">
          <el-input v-model="userAddForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" label-width="120px">
          <el-input v-model="userAddForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机" label-width="120px">
          <el-input v-model="userAddForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userAddDialog = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="userEditDialog" @close="closeUserEditDialog">
      <el-form :model="userEditForm" :rules="userEditRules" ref="userEditForm">
        <el-form-item prop="username" label="用户名" label-width="120px">
          <el-input disabled :value="userEditForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" label-width="120px">
          <el-input v-model="userEditForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机" label-width="120px">
          <el-input v-model="userEditForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 给用户分配角色 -->
    <el-dialog title="分配角色" :visible.sync="userAssignDialog">
      <el-form :model="userAssignForm">
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="userAssignForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色列表" label-width="120px">
          <el-select v-model="userAssignForm.roles" placeholder="请选择角色">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userAssignDialog = false">取 消</el-button>
        <el-button type="primary" @click="userAssignDialog = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// import axios from 'axios'

export default {
  created() {
    // console.log('axios: ', this.$http === axios)

    // 发送请求，获取数据
    this.getUserList()
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
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      userAddRules: {
        username: [
          { required: true, message: '用户名为必填项', trigger: 'blur' },
          {
            min: 3,
            max: 6,
            message: '用户名长度在 3 到 6 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '密码为必填项', trigger: 'blur' },
          {
            min: 3,
            max: 6,
            message: '密码长度在 3 到 6 个字符',
            trigger: 'blur'
          }
        ]
      },

      // 控制编辑用户对话框的展示和隐藏
      userEditDialog: false,
      userEditForm: {
        id: -1,
        username: '',
        email: '',
        mobile: ''
      },
      userEditRules: {
        mobile: [
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机号码格式不正确',
            // 如果需要在值改变或者失去焦点的时候，都触发验证，可以传递两个
            // trigger: 'change, blur'

            // 当前值改变，就会触发
            trigger: 'change'
          }
        ]
      },

      // 分配角色
      userAssignDialog: false,
      userAssignForm: {
        // 用户id
        id: -1,
        // 用户角色id
        rid: -1,
        // 用户名
        username: '',
        // 角色列表
        roles: []
      }
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
    /**
     * 分页获取数据
     * 参数 cruPage 表示当前点击的页码
     */
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
    delUserById(id) {
      // console.log(id)
      this.$confirm('确认删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })},

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
    /**
     * 展示用户分配角色对话框
     */
    showUserAssignDialog() {
      this.userAssignDialog = true
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
