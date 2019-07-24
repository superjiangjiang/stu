<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生</el-breadcrumb-item>
      <el-breadcrumb-item>查看成绩</el-breadcrumb-item>
    </el-breadcrumb>


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
    <el-table :data="tableData" stripe style="margin-top: 20px;">
      <el-table-column prop="student.sNo" label="学号" width="180">
      </el-table-column>
      <el-table-column prop="student.name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="student.grade" label="年级" width="180">
      </el-table-column>
      <el-table-column prop="student.school" label="学校" width="180">
      </el-table-column>
      <el-table-column prop="course.name" label="科目" width="180">
      </el-table-column>
      <el-table-column prop="grade" label="成绩" width="180">
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

  </div>
</template>

<script>
import axios from 'axios'

export default {
  created(){
    this.gettableData()
  },

  data(){
    return{
      tableData: [],
      pageSize:3,
      pageNum:1,
      total:0,
      }
  },
  methods: {
      /*学生查看成绩*/
      async gettableData() {
        let res = await this.axios({
          url: '/api/v1/student/findStudentGrade',
          method: 'get',
          params: {
            pageNum:this.pageNum,
           }
        })
        let {status} = res

        let { data } = res.data
        console.log(data.list)
         if (status == 200) {
          this.tableData = data.list
          this.total = data.total
          this.pageSize = data.pageSize
        }
      },
      /*分页查询*/
      handleCurrentChange(val) {
        this.pageNum = val
        this.gettableData()
      },
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
