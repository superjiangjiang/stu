<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>教师</el-breadcrumb-item>
    <el-breadcrumb-item>课时管理</el-breadcrumb-item>
    <el-breadcrumb-item>课时详情</el-breadcrumb-item>
  </el-breadcrumb>

  <el-table
    :data="courseData"
    stripe>
    <el-table-column prop="date" label="授课日期" width="180">
    </el-table-column>
    <el-table-column prop="category" label="所教科目" width="180">
    </el-table-column>
    <el-table-column prop="name" label="课时名称" width="180">
    </el-table-column>
    <el-table-column prop="content" label="课时内容" width="300">
    </el-table-column>
    <el-table-column prop="all" label="总课时" width="80">
    </el-table-column>
    <el-table-column prop="state" label="状态" width="120">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showClassEditDailog(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="curPage" @current-change="changePage">
  </el-pagination>

  <el-dialog title="课时管理" :visible.sync="classEditDialog" @close="closeClassEditDialog">

    <el-form :model="classEditForm" :rules="classEditRules" ref="classEditForm">
      <el-form-item prop="date" label="授课日期" width="100">
        <el-input disabled  :value="classEditForm.date"></el-input>
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
</div>
</template>

<script>
  export default {
    name: 'StatisticsClassDetail',
    data() {
      return {
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
        }]
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

      // 关闭用户编辑对话框
      closeClassEditDialog() {
        this.$refs.classEditForm.resetFields()
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
</style>
