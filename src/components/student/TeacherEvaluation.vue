<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生</el-breadcrumb-item>
      <el-breadcrumb-item>教师评价</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="tableData" stripe>
      <el-table-column prop="number" label="序号" width="50">
      </el-table-column>
      <el-table-column prop="coursenumber" label="课程编号" width="100">
      </el-table-column>
      <el-table-column prop="coursename" label="课程名称" width="180">
      </el-table-column>
      <el-table-column prop="teacher" label="授课教师" width="100">
      </el-table-column>
      <el-table-column prop="category" label="评教类别" width="100">
      </el-table-column>
      <el-table-column prop="totalscore" label="总评分" width="100">
      </el-table-column>
      <el-table-column prop="isevaluation" label="已评" width="100">
      </el-table-column>
      <el-table-column prop="issubmit" label="是否提交" width="100">
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button plain size="mini" @click="godetail()" >评价</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="curPage" >
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'TeacherEvaluation',
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

        tableData: [{
          number: '1',
          coursenumber: 'B09t012',
          coursename: 'java基础',
          teacher:'赵老师',
          category:'实训课',
          totalscore:'0',
          isevaluation: '否',
          issubmit:'否'
        },{
          number: '1',
          coursenumber: 'B09t012',
          coursename: 'java基础',
          teacher:'赵老师',
          category:'实训课',
          totalscore:'0',
          isevaluation: '否',
          issubmit:'否'
        },{
          number: '1',
          coursenumber: 'B09t012',
          coursename: 'java基础',
          teacher:'赵老师',
          category:'实训课',
          totalscore:'0',
          isevaluation: '否',
          issubmit:'否'
        },{
          number: '1',
          coursenumber: 'B09t012',
          coursename: 'java基础',
          teacher:'赵老师',
          category:'实训课',
          totalscore:'0',
          isevaluation: '否',
          issubmit:'否'
        },{
          number: '1',
          coursenumber: 'B09t012',
          coursename: 'java基础',
          teacher:'赵老师',
          category:'实训课',
          totalscore:'0',
          isevaluation: '否',
          issubmit:'否'
        },{
          number: '1',
          coursenumber: 'B09t012',
          coursename: 'java基础',
          teacher:'赵老师',
          category:'实训课',
          totalscore:'0',
          isevaluation: '否',
          issubmit:'否'
        },{
          number: '1',
          coursenumber: 'B09t012',
          coursename: 'java基础',
          teacher:'赵老师',
          category:'实训课',
          totalscore:'0',
          isevaluation: '否',
          issubmit:'否'
        },{
          number: '1',
          coursenumber: 'B09t012',
          coursename: 'java基础',
          teacher:'赵老师',
          category:'实训课',
          totalscore:'0',
          isevaluation: '否',
          issubmit:'否'
        }]
      }
    },

    methods: {
      godetail(){
        console.log("haha")
        this.$route.push({name:"evaluationdetail"})
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
