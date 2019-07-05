<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学业导师</el-breadcrumb-item>
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
          <el-button type="primary">点击上传excel</el-button>


        </el-upload>
      </el-col>
      <el-col :span="4" :push="10">
        <el-button type="primary" plain>查看历史记录</el-button>
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
      <el-table-column label="宿舍" width="150">
        <template slot-scope="scope">
         {{dormitory}}
        </template>
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
    <el-dialog title="学生管理" :visible.sync="studentEditDialog" @close="closestudentEditDialog">

      <el-form :model="studentEditForm"  ref="studentEditForm">
        <el-form-item prop="number" label="学号" width="100">
          <el-input disabled  :value="studentEditForm.number"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名" width="100">
          <el-input  :value="studentEditForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="school" label="学校" width="100">
          <el-input  :value="studentEditForm.school"></el-input>
        </el-form-item>
        <el-form-item prop="class" label="班级" width="100">
          <el-select @change="chickvalue1"
                     v-model="studentEditForm.class" filterable placeholder="请输入/请选择" >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              v-model="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="dormitory" label="宿舍" width="100">


          <el-select @change="chickvalue2"
                     v-model="studentEditForm.dormitory1" filterable placeholder="请输入/请选择宿舍楼" >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              v-model="item.value">
            </el-option>
          </el-select>
          <el-select @change="chickvalue3"
                     v-model="studentEditForm.dormitory2" filterable placeholder="请输入/请选择单元" >
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              v-model="item.value">
            </el-option>
          </el-select>
          <el-input  :value="studentEditForm.dormitory3" style="width: 150px;" placeholder="请输入宿舍号"></el-input>
        </el-form-item>
        <el-form-item prop="employment" label="就业" width="100">
          <el-select @change="chickvalue4"
                     v-model="studentEditForm.employment" filterable placeholder="请输入/请选择" >
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              v-model="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="unit" label="首次就业单位" width="100">
          <el-input  :value="studentEditForm.unit"></el-input>
        </el-form-item>
        <el-form-item prop="salary" label="薪资" width="100">
          <el-input  :value="studentEditForm.salary"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="studentEditDialog = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="就业追踪" :visible.sync="jobTrackingDialog" @close="closeJobTrackingDialog">
      <el-table :data="jobTrackingData">
        <el-table-column property="time" label="就业追踪" width="120"></el-table-column>
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
        options1: [{
          value: '基础1班',
          label: '基础1班'
        }, {
          value: '骨干班',
          label: '骨干班'
        }],
        options2: [{
          value: '25号楼',
          label: '25号楼'
        }, {
          value: '24号楼',
          label: '24号楼'
        }],
        options3: [{
          value: '1单元',
          label: '1单元'
        }, {
          value: '2单元',
          label: '2单元'
        }],
        options4: [{
          value: '未就业',
          label: '未就业'
        }, {
          value: '已就业',
          label: '已就业'
        }],
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
        studentEditDialog: false,
        studentEditForm: {
          number: -1,
          name: '',
          school: '',
          class: '',
          dormitory: '',
          dormitory1:'',
          dormitory2:'',
          dormitory3:'',
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
          class:'基础1班',
          dormitory: '',
          dormitory1:'25号楼',
          dormitory2:'3单元',
          dormitory3:'901',
          employment:'未就业',
          unit: '济南市睿德信息技术有限公司',
          salary: 13000
        },{
          number: '201603091071',
          name: '十一月',
          school: '齐鲁工业大学',
          class:'基础1班',
          dormitory: '',
          dormitory1:'21号楼',
          dormitory2:'2单元',
          dormitory3:'401',
          employment:'已就业',
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
        // 数据交给 studentEditForm 后，就会展示在编辑对话框中
        for (const key in this.studentEditForm) {
          this.studentEditForm[key] = curUser[key]
        }
        // 打开用户编辑对话框
        this.studentEditDialog = true
      },
      // 关闭用户编辑对话框
      closestudentEditDialog() {
        this.$refs.studentEditForm.resetFields()
      },
      showJobTrackingDailog(curUser){
        // 打开用户编辑对话框
        this.jobTrackingDialog = true
      },
      // 点击确定按钮，修改用户数据
      closeJobTrackingDialog() {
      },
      chickvalue1 () {
        console.log(this.studentEditForm.class)
      },
      chickvalue2 () {
        console.log(this.studentEditForm.dormitory1)
      },
      chickvalue3 () {
        console.log(this.studentEditForm.dormitory2)
      },
      chickvalue4 () {
        console.log(this.studentEditForm.employment)
      }
    },
    computed:{
      dormitory: function () {

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
