<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学业导师</el-breadcrumb-item>
      <el-breadcrumb-item>招聘信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入编号" v-model="queryStr" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="success" plain @click="showinfoAddDialog">添加招聘信息</el-button>
      </el-col>
      <el-col :span="4" :push="12">
        <el-button type="primary" plain>查看历史记录</el-button>
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
      <el-table-column prop="num" label="编号" width="60">
      </el-table-column>
      <el-table-column prop="job" label="职业" width="120">
      </el-table-column>
      <el-table-column prop="salary" label="薪资" width="80">
      </el-table-column>
      <el-table-column prop="company" label="公司" width="220">
      </el-table-column>
      <el-table-column prop="location" label="位置" width="180">
      </el-table-column>
      <el-table-column prop="people" label="招聘人数" width="80">
      </el-table-column>
      <el-table-column prop="time" label="发布时间" width="100">
      </el-table-column>
      <el-table-column label="操作" width="270">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showinfoEditDailog(scope.row)"></el-button>
          <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="delInfoById(scope.row.id)"></el-button>

          <el-button type="primary" plain size="mini"  @click="showJobTrackingDailog(scope.row)">查看已报名学生</el-button>

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

    <!-- 添加招聘信息对话框 -->
    <el-dialog title="添加招聘信息" :visible.sync="infoAddDialog" @close="closeinfoAddDialog">
      <el-form :model="form"  ref="infoAddForm">
        <el-form-item label="招聘企业">
          <el-input v-model="form.company" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="工作地址">
          <el-input v-model="form.location" placeholder="请输入工作地点"></el-input>
        </el-form-item>
        <el-form-item label="招聘人数">
          <el-input v-model="form.people"  placeholder="请输入招聘人数"></el-input>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="招聘职业">
          <el-input v-model="form.job" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="薪资">
          <el-input v-model="form.salary" placeholder="请输入最低工资"></el-input>
        </el-form-item>


        <el-form-item label="招聘详情">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="infoAddDialog = false">取 消</el-button>
        <el-button type="primary">立即发布</el-button>
      </div>

    </el-dialog>

    <el-dialog title="已报名学生信息" :visible.sync="jobTrackingDialog" @close="closeJobTrackingDialog">

      <el-table :data="jobTrackingData">
        <el-table-column property="name" label="姓名" width="70"></el-table-column>
        <el-table-column property="school" label="学校" width="120"></el-table-column>
        <el-table-column property="class" label="班级" width="80"></el-table-column>
        <el-table-column property="position" label="职位" width="120"></el-table-column>
        <el-table-column property="salary" label="薪资" width="70"></el-table-column>
        <el-table-column property="company" label="公司名" width="180"></el-table-column>
      </el-table>
      <el-row :gutter="20" >
        <el-col :span="6" push="10">
          <el-button  plain size="mini" type="primary" @click="showJobTrackingDailog(scope.row)">点我下载excel</el-button>
        </el-col>
      </el-row>
    </el-dialog>



    <!-- 编辑招聘信息对话框 -->
    <el-dialog  title="修改招聘信息" :visible.sync="infoEditDialog" @close="closeInfoEditDialog">
      <el-form :model="infoEditForm"  ref="infoEditForm">
        <el-form-item label="编号">
          <el-input v-model="infoEditForm.num" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="职业">
          <el-input v-model="infoEditForm.job" ></el-input>
        </el-form-item>
        <el-form-item label="薪资">
          <el-input v-model="infoEditForm.salary" ></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="infoEditForm.company" ></el-input>
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model="infoEditForm.location" ></el-input>
        </el-form-item>
        <el-form-item label="招聘人数">
          <el-input v-model="infoEditForm.people" ></el-input>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="infoEditForm.desc" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="infoEditDialog = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button>
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
      // this.getUserList()
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

        tableData:[{
          num:1,
          job:'java工程师',
          salary:'13000',
          company:'山东省农智信息科技有限公司',
          location:'山东省济南市历城区',
          people:30,
          time:'2019-7-4'

        }],
        form: {
          num:1,
          job:'',
          salary:'',
          company:'',
          location:'',
          people:'',
          time:'',
          desc: ''
        },
        jobTrackingData: [{
          name: '宋阳阳',
          school: '齐鲁工业大学',
          class: '基础1班',
          position: '前端工程师',
          salary: 5000,
          company:'杭州虞美人公司'
        },{
          name: '宋阳阳',
          school: '齐鲁工业大学',
          class: '基础1班',
          position: '前端工程师',
          salary: 5000,
          company:'杭州虞美人公司'
        }, {
          name: '宋阳阳',
          school: '齐鲁工业大学',
          class: '基础1班',
          position: '前端工程师',
          salary: 5000,
          company:'杭州虞美人公司'
        }, {
          name: '宋阳阳',
          school: '齐鲁工业大学',
          class: '基础1班',
          position: '前端工程师',
          salary: 5000,
          company:'杭州虞美人公司'
        }],
        jobTrackingDialog: false,

        infoAddDialog: false,
        infoEditDialog: false,
        infoEditForm: {
          num:-1,
          job:'',
          salary:'',
          company:'',
          location:'',
          people:'',
          time:'',
          desc: ''
        },

      }
    },

    methods: {
      // 展示用户添加对话框
      showinfoAddDialog() {
        this.infoAddDialog = true
      },
      // 关闭对话框重置表单
      closeinfoAddDialog() {
        // console.log('对话框关闭了')
        this.$refs.infoAddForm.resetFields()
      },
      showJobTrackingDailog(curUser){
        // 打开用户编辑对话框
        this.jobTrackingDialog = true
      },
      // 点击确定按钮，修改用户数据
      closeJobTrackingDialog() {
      },
      delInfoById(id) {
        // console.log(id)
        this.$confirm('确认删除该信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      },
      // 展示编辑对话框
      showinfoEditDailog(curUser) {
        // console.log(curUser)
        // 先获取到当前用户的数据
        // 数据交给 userinfoEditForm 后，就会展示在编辑对话框中
        for (const key in this.infoEditForm) {
          this.infoEditForm[key] = curUser[key]
        }


        // 打开用户编辑对话框
        this.infoEditDialog = true
      },

      // 关闭用户编辑对话框
      closeInfoEditDialog() {
        this.$refs.userinfoEditForm.resetFields()
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
