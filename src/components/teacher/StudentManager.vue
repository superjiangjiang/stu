<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>教师</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入学号" v-model="queryStr" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" ></el-button>
        </el-input>
      </el-col>

      <el-col :span="4">

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
      <el-table-column prop="name" label="姓名" width="200">
      </el-table-column>
      <el-table-column prop="school" label="学校" width="200">
      </el-table-column>
      <el-table-column prop="class" label="班级" width="200">
      </el-table-column>
      <el-table-column prop="dormitory" label="宿舍" width="200">
      </el-table-column>
      <el-table-column prop="employment" label="就业状态" width="200">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showUserEditDailog(scope.row)"></el-button>
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



    <!--    上传Excel-->
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture">
      <el-button size="small" type="primary">点击上传excel文件</el-button>


    </el-upload>



    <!-- 编辑用户对话框 -->
    <el-dialog title="学生管理" :visible.sync="userEditDialog" @close="closeUserEditDialog">

      <el-form :model="userEditForm" :rules="userEditRules" ref="userEditForm">
        <el-form-item prop="number" label="学号" width="180">
          <el-input disabled  :value="userEditForm.number"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名" width="180">
          <el-input  :value="userEditForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="school" label="学校" width="180">
          <el-input  :value="userEditForm.school"></el-input>
        </el-form-item>
        <el-form-item prop="school" label="班级" width="180">
          <el-input  :value="userEditForm.class"></el-input>
        </el-form-item>
        <el-form-item prop="dormitory" label="宿舍" width="180">
          <el-input  :value="userEditForm.dormitory"></el-input>
        </el-form-item>
        <el-form-item prop="employment" label="就业" width="180">
          <el-input  :value="userEditForm.employment"></el-input>
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


        // 控制编辑用户对话框的展示和隐藏
        userEditDialog: false,
        userEditForm: {
          number: -1,
          name: '',
          school: '',
          class: '',
          dormitory:'',
          employment:''
        },
        tableData: [{
          number: '201603091071',
          name: '赵珂',
          school: '齐鲁工业大学',
          class:'基础一班',
          dormitory:'25号楼1单元604',
          employment:'未就业'
        }, {
          number: '201603091071',
          name: '赵珂',
          school: '齐鲁工业大学',
          class:'基础一班',
          dormitory:'25号楼1单元604',
          employment:'未就业'
        }, {
          number: '201603091071',
          name: '赵珂',
          school: '齐鲁工业大学',
          class:'基础一班',
          dormitory:'25号楼1单元604',
          employment:'未就业'
        }, {
          number: '201603091071',
          name: '赵珂',
          school: '齐鲁工业大学',
          class:'基础一班',
          dormitory:'25号楼1单元604',
          employment:'未就业'
        }, {
          number: '201603091071',
          name: '赵珂',
          school: '齐鲁工业大学',
          class:'基础一班',
          dormitory:'25号楼1单元604',
          employment:'未就业'
        }, {
          number: '201603091071',
          name: '赵珂',
          school: '齐鲁工业大学',
          class:'基础一班',
          dormitory:'25号楼1单元604',
          employment:'未就业'
        }, {
          number: '201603091071',
          name: '赵珂',
          school: '齐鲁工业大学',
          class:'基础一班',
          dormitory:'25号楼1单元604',
          employment:'未就业'
        }],
        //excel上传
        fileList: [
          {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
          {name: 'food2.jpeg',url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],



      }
    },

    methods: {
      //excel 上传
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
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
