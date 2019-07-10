<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员</el-breadcrumb-item>
      <el-breadcrumb-item>技术老师管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-button type="success" plain @click="showinfoAddDialog">添加技术老师</el-button>
       </el-col>
    </el-row>

    <el-table :data="tableData" stripe>
      <el-table-column prop="empno" label="导师编号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="导师姓名" width="150">
      </el-table-column>
      <el-table-column prop="sex" label="导师性别" width="100">
      </el-table-column>
      <el-table-column prop="skills" label="擅长的技术" width="220">
      </el-table-column>
      <el-table-column prop="time" label="工作年限" width="100">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showScoreEditDailog(scope.row)"></el-button>
          <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="delStuById(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="curPage" >
    </el-pagination>


    <el-dialog title="添加技术老师" :visible.sync="infoAddDialog" @close="closeinfoAddDialog">
      <el-form :model="form"  ref="infoAddForm">
        <el-form-item label="导师编号">
          <el-input v-model="form.empno" placeholder="请输入导师编号"></el-input>
        </el-form-item>
        <el-form-item label="导师姓名">
          <el-input v-model="form.name" placeholder="请输入导师姓名"></el-input>
        </el-form-item>
        <el-form-item label="导师性别">
          <el-select @change="chickvalue1"
                     v-model="form.sex" filterable placeholder="请输入/请选择导师性别" >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              v-model="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="擅长的技术">
          <el-input v-model="form.skills" placeholder="请输入擅长的技术"></el-input>
        </el-form-item>
        <el-form-item label="工作年限">
          <el-input v-model="form.time" placeholder="请输入工作年限"></el-input>
        </el-form-item>



      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="infoAddDialog = false">取 消</el-button>
        <el-button type="primary">立即发布</el-button>
      </div>

    </el-dialog>


    <!-- 编辑导师信息对话框 -->
    <el-dialog title="修改导师信息" :visible.sync="scoreEditDialog" @close="closescoreEditDailog">

      <el-form :model="scoreEditForm" :rules="userEditRules" ref="scoreEditForm">
        <el-form-item prop="empno" label="导师编号" width="180">
          <el-input disabled  :value="scoreEditForm.empno"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="导师姓名" width="180">
          <el-input  :value="scoreEditForm.name"></el-input>
        </el-form-item>

        <el-form-item prop="sex" label="导师性别" width="180">

          <el-select  @change="chickvalue1"
                      v-model="scoreEditForm.sex" filterable placeholder="请输入/请选择导师性别">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              v-model="item.value">
            </el-option>
          </el-select>
        </el-form-item>

       <el-form-item prop="skills" label="擅长的技术" width="180">
          <el-input :value="scoreEditForm.skills"></el-input>
        </el-form-item>
        <el-form-item prop="time" label="工作年限" width="180">
          <el-input :value="scoreEditForm.time"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="scoreEditDialog = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
  export default {
    name: 'TeacherManager',
    created() {
      // console.log('axios: ', this.$http === axios)

      // 发送请求，获取数据
      // this.getUserList()
    },



    data() {
      return {
        options1: [{
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
        }],
        options3: [{
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
        }],
        userList: [],

        tableData:[{
          empno: '20160309',
          name: '宋阳阳',
          sex: '女',
          skills:'java',
          time: '3'
        },{
          empno: '20160309',
          name: 'syy',
          sex: '男',
          skills:'java',
          time: '4'
        },{
          empno: '20160309',
          name: '宋阳阳',
          sex: '女',
          skills:'java',
          time: '3'
        },{
          empno: '20160309',
          name: '宋阳阳',
          sex: '女',
          skills:'java',
          time: '3'
        }],
        form: {
          empno: '',
          name: '',
          sex: '',
          skills:'',
          time: ''
        },
        form1: {
          empno: '',
          name: '',
          sex: '',
          time: ''
        },

        infoAddDialog: false,
        infoAddDialog1: false,
        scoreEditDialog: false,
        scoreEditForm: {
          empno: -1,
          name: '',
          sex: '',
          skills:'',
          time: ''
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
      showinfoAddDialog1() {
        this.infoAddDialog1 = true
      },
      // 关闭对话框重置表单
      closeinfoAddDialog1() {
        // console.log('对话框关闭了')
        this.$refs.infoAddForm1.resetFields()
      },

      showScoreEditDailog(curUser) {
        for (const key in this.scoreEditForm) {
          this.scoreEditForm[key] = curUser[key]
        }
        // 打开用户编辑对话框
        this.scoreEditDialog = true
      },

      // 关闭用户编辑对话框
      closescoreEditDailog() {
        this.$refs.scoreEditForm.resetFields()
      },
      chickvalue1 () {
        console.log(this.form.sex)
      },
      chickvalue2 () {
        console.log(this.form1.sex)
      },

      delStuById(id) {
        // console.log(id)
        this.$confirm('确认删除该导师吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })},
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
