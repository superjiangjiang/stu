<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>教师</el-breadcrumb-item>
    <el-breadcrumb-item>课时管理</el-breadcrumb-item>
    <el-breadcrumb-item>课时详情</el-breadcrumb-item>
  </el-breadcrumb>

  <el-row :gutter="20">
    <el-col :span="6">
      <el-input placeholder="请输入编号" v-model="queryStr" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-col>
    <el-col :span="2">
      <el-button type="success" plain @click="showinfoAddDialog">添加课时</el-button>
    </el-col>

  </el-row>

  <el-table
    :data="courseData"
    stripe>
    <el-table-column prop="date" label="授课日期" width="150">
    </el-table-column>
    <el-table-column prop="category" label="所教科目" width="180">
    </el-table-column>
    <el-table-column prop="name" label="课时名称" width="180">
    </el-table-column>
    <el-table-column prop="content" label="课时内容" width="300">
    </el-table-column>
    <el-table-column prop="all" label="总课时" width="80">
    </el-table-column>
    <el-table-column prop="state" label="状态" width="100">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showClassEditDailog(scope.row)"></el-button>
        <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="delInfoById(scope.row.id)"></el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="curPage" @current-change="changePage">
  </el-pagination>

  <el-dialog title="课时管理" :visible.sync="classEditDialog" @close="closeClassEditDialog">

    <el-form :model="classEditForm" :rules="classEditRules" ref="classEditForm">
      <el-form-item prop="date" label="授课日期" width="100">
         <el-date-picker type="date" placeholder="选择日期" v-model="classEditForm.date" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item prop="category" label="所教科目" width="100">
        <el-input  :value="classEditForm.category"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="课时名称" width="100">
        <el-input  :value="classEditForm.name"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="课时内容" width="100">
        <el-input  :value="classEditForm.content"></el-input>
      </el-form-item>
      <el-form-item prop="all" label="总课时" width="100">
        <el-input  :value="classEditForm.all"></el-input>
      </el-form-item>
      <el-form-item prop="state" label="状态" width="100">
        <el-input  :value="classEditForm.state"></el-input>
      </el-form-item>
  </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="classEditDialog = false">取 消</el-button>
      <el-button type="primary" >确 定</el-button>
    </div>
  </el-dialog>

  <el-dialog title="添加课时" :visible.sync="infoAddDialog" @close="closeinfoAddDialog">
    <el-form :model="form"  ref="infoAddForm">
      <el-form-item label="授课日期">
         <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="所教科目">
        <el-input v-model="form.category" placeholder="请输入所教科目"></el-input>
      </el-form-item>
      <el-form-item label="课时名称">
        <el-input v-model="form.name"  placeholder="请输入课时名称"></el-input>
      </el-form-item>
       <el-form-item label="课时内容">
        <el-input v-model="form.content" placeholder="请输入课时内容"></el-input>
      </el-form-item>
      <el-form-item label="总课时">
          <el-input v-model="form.all" placeholder="请输入总课时"></el-input>
       </el-form-item>
      <el-form-item label="状态">
          <el-input v-model="form.state" placeholder="请输入状态"></el-input>
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
    name: 'StatisticsClassDetail',
    data() {
      return {
        form: {
          date: '',
          category: '',
          name: '',
          content: '',
          all:'',
          state:''
        },

        infoAddDialog: false,

        classEditDialog: false,
        classEditForm: {
          date: '',
          category: '',
          name: '',
          content: '',
          all:'',
          state:''
        },
        courseData: [{
          date: '2018-06-24',
          category: 'java基础',
          name: '环境搭建',
          content: '1.掌握环境搭建的步骤及常见问题\n' +
            '2.理解为什么进行环境搭建\n' +
            '3.掌握记事本编写JAVA程序的编译和执行过程\n' +
            '理解JDK,JRE,JVM的概念和他们的关系',
          all:1,
          state: '已授课'
        },{
          date: '2016-06-25',
          category: 'java基础',
          name: '数据类型及运算',
          content: '1.数据类型\n' +
            '2.变量、常量\n' +
            '基本运算',
          all:1,
          state: '已授课'
        },{
          date: '2016-06-25',
          category: 'java基础',
          name: '数据类型及运算',
          content: '1.数据类型\n' +
            '2.变量、常量\n' +
            '基本运算',
          all:1,
          state: '已授课'
        },{
          date: '2018-07-10',
          category: 'java基础',
          name: '多线程技术',
          content: '1.线程的重要概念\n' +
            '2.线程的创建及启动\n' +
            '3.线程同步\n' +
            '线程间通信',
          all:1,
          state: '未授课'
        },
        ]
      }
    },
    methods: {

      // 展示编辑对话框
      showClassEditDailog(curUser) {
        // console.log(curUser)
        // 先获取到当前用户的数据
        // 数据交给 userEditForm 后，就会展示在编辑对话框中
        for (const key in this.classEditForm) {
          this.classEditForm[key] = curUser[key]
        }

        // 打开用户编辑对话框
        this.classEditDialog = true
      },

      // 关闭编辑对话框
      closeClassEditDialog() {
        this.$refs.classEditForm.resetFields()
      },
      delInfoById(id) {
        // console.log(id)
        this.$confirm('确认删除该信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      },

      // 展示添加对话框
      showinfoAddDialog() {
        this.infoAddDialog = true
      },
      // 关闭对话框重置表单
      closeinfoAddDialog() {
        // console.log('对话框关闭了')
        this.$refs.infoAddForm.resetFields()
      },

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
</style>
