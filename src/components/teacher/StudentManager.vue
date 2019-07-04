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
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"

          list-type="picture">
          <el-button type="primary">点击上传excel文件</el-button>


        </el-upload>
      </el-col>
    </el-row>

    <el-table :data="tableData" stripe>
      <el-table-column prop="number" label="学号" width="120">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="school" label="学校" width="150">
      </el-table-column>
      <el-table-column prop="class" label="班级" width="80">
      </el-table-column>
      <el-table-column prop="dormitory" label="宿舍" width="150">
      </el-table-column>
      <el-table-column prop="employment" label="就业状态" width="80">
      </el-table-column>
      <el-table-column prop="unit" label="首次就业单位" width="180">
      </el-table-column>
      <el-table-column prop="salary" label="薪资" width="100">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showUserEditDailog(scope.row)"></el-button>
          <el-button type="primary" plain size="mini" @click="showJobTrackingDailog(scope.row)">就业追踪</el-button>
        </template>
      </el-table-column>
    </el-table>

  <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="curPage" >
    </el-pagination>


    <!-- 编辑用户对话框 -->
    <el-dialog title="学生管理" :visible.sync="userEditDialog" @close="closeUserEditDialog">

      <el-form :model="userEditForm" :rules="userEditRules" ref="userEditForm">
        <el-form-item prop="number" label="学号" width="100">
          <el-input disabled  :value="userEditForm.number"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名" width="100">
          <el-input  :value="userEditForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="school" label="学校" width="100">
          <el-input  :value="userEditForm.school"></el-input>
        </el-form-item>
        <el-form-item prop="school" label="班级" width="100">
          <el-input  :value="userEditForm.class"></el-input>
        </el-form-item>
        <el-form-item prop="dormitory" label="宿舍" width="100">
          <el-input  :value="userEditForm.dormitory"></el-input>
        </el-form-item>
        <el-form-item prop="employment" label="就业" width="100">
          <el-input  :value="userEditForm.employment"></el-input>
        </el-form-item>

        <el-form-item prop="unit" label="首次就业单位" width="100">
          <el-input  :value="userEditForm.unit"></el-input>
        </el-form-item>
        <el-form-item prop="salary" label="薪资" width="100">
          <el-input  :value="userEditForm.salary"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userEditDialog = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="就业追踪" :visible.sync="jobTrackingDialog" @close="closeJobTrackingDialog">
        <el-table :data="jobTrackingData">
          <el-table-column property="time" label="就业时间" width="120"></el-table-column>
          <el-table-column property="name" label="姓名" width="80"></el-table-column>
          <el-table-column property="company" label="公司" width="250"></el-table-column>
          <el-table-column property="salary" label="薪水" idth="100"></el-table-column>
          <el-table-column property="position" label="职位" idth="150"></el-table-column>
        </el-table>
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

        // 控制编辑用户对话框的展示和隐藏
        userEditDialog: false,
        userEditForm: {
          number: -1,
          name: '',
          school: '',
          class: '',
          dormitory:'',
          employment:'',
          unit: '',
          salary: ''
        },
        jobTrackingDialog: false,
        jobTrackingData: [{
          time: '第一次就业',
          name: '宋阳阳',
          company: '济南市睿德信息技术有限公司',
          salary: '13000',
          position: 'java开发'
        }, {
          time: '第二次就业',
          name: '宋阳阳',
          company: '济南市睿德信息技术有限公司',
          salary: '13000',
          position: 'java开发'
        },{
          time: '第三次就业',
          name: '宋阳阳',
          company: '济南市睿德信息技术有限公司',
          salary: '13000',
          position: 'java开发'
        }],

        tableData: [{
          number: '201603091071',
          name: '赵珂',
          school: '齐鲁工业大学',
          class:'基础一班',
          dormitory:'25号楼1单元604',
          employment:'未就业',
          unit: '济南市睿德信息技术有限公司',
          salary: 13000
        },{
          number: '201603091071',
          name: '赵珂',
          school: '齐鲁工业大学',
          class:'基础一班',
          dormitory:'25号楼1单元604',
          employment:'未就业',
          unit: '济南市睿德信息技术有限公司',
          salary: 13000
        },{
          number: '201603091071',
          name: '赵珂',
          school: '齐鲁工业大学',
          class:'基础一班',
          dormitory:'25号楼1单元604',
          employment:'未就业',
          unit: '济南市睿德信息技术有限公司',
          salary: 13000
        },{
          number: '201603091071',
          name: '赵珂',
          school: '齐鲁工业大学',
          class:'基础一班',
          dormitory:'25号楼1单元604',
          employment:'未就业',
          unit: '济南市睿德信息技术有限公司',
          salary: 13000
        },{
          number: '201603091071',
          name: '赵珂',
          school: '齐鲁工业大学',
          class:'基础一班',
          dormitory:'25号楼1单元604',
          employment:'未就业',
          unit: '济南市睿德信息技术有限公司',
          salary: 13000
        },{
          number: '201603091071',
          name: '赵珂',
          school: '齐鲁工业大学',
          class:'基础一班',
          dormitory:'25号楼1单元604',
          employment:'未就业',
          unit: '济南市睿德信息技术有限公司',
          salary: 13000
        }]
        //excel上传


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

      showJobTrackingDailog(curUser){

        // 打开用户编辑对话框
        this.jobTrackingDialog = true
      },
      // 点击确定按钮，修改用户数据

      closeJobTrackingDialog() {

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
