<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>管理员</el-breadcrumb-item>
        <el-breadcrumb-item>教师管理</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row :gutter="20">
         <el-col :span="8">
          <el-button type="success" plain @click="showinfoAddDialog">添加技术老师</el-button>
           <el-button type="success" plain @click="showinfoAddDialog1">添加学业导师</el-button>
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

      <el-dialog title="添加学业导师" :visible.sync="infoAddDialog1" @close="closeinfoAddDialog1">
        <el-form :model="form1"  ref="infoAddForm1">
          <el-form-item label="导师编号">
            <el-input v-model="form1.empno" placeholder="请输入导师编号"></el-input>
          </el-form-item>
          <el-form-item label="导师姓名">
            <el-input v-model="form1.name" placeholder="请输入导师姓名"></el-input>
          </el-form-item>
          <el-form-item label="导师姓别">
            <el-select @change="chickvalue2"
                       v-model="form1.sex" filterable placeholder="请输入/请选择导师性别" >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                v-model="item.value">
              </el-option>
            </el-select>
          </el-form-item>
         <el-form-item label="工作年限">
            <el-input v-model="form1.time" placeholder="请输入工作年限"></el-input>
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="infoAddDialog1 = false">取 消</el-button>
          <el-button type="primary">立即发布</el-button>
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
        options2: [{
          value: '男1',
          label: '男1'
        }, {
          value: '男2',
          label: '男2'
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
      chickvalue1 () {
        console.log(this.form.sex)
      },
      chickvalue2 () {
        console.log(this.form1.sex)
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
