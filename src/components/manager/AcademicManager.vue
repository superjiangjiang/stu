<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员</el-breadcrumb-item>
      <el-breadcrumb-item>学业导师管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入导师编号" v-model="queryStr" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"  @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="success" plain @click="showinfoAddDialog">添加学业导师</el-button>
      </el-col>
    </el-row>

    <el-table :data="tableData" stripe>
      <el-table-column prop="id" label="导师id" width="180">
      </el-table-column>
      <el-table-column prop="empNo" label="导师编号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="导师姓名" width="150">
      </el-table-column>
      <el-table-column prop="sex" label="导师性别" width="100">
      </el-table-column>
       <el-table-column prop="workingSeniority" label="工作年限" width="100">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showteacherEditDailog(scope.row)"></el-button>
          <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="delStuById(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="page_no"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>


    <el-dialog title="添加学业导师" :visible.sync="infoAddDialog" @close="closeinfoAddDialog">
      <el-form :model="form1"  ref="form1">
        <el-form-item label="导师编号">
          <el-input v-model="form1.empNo" placeholder="请输入导师编号"></el-input>
        </el-form-item>
        <el-form-item label="导师姓名">
          <el-input v-model="form1.name" placeholder="请输入导师姓名"></el-input>
        </el-form-item>
        <el-form-item label="导师姓别">
          <el-select
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
          <el-input v-model="form1.workingSeniority" placeholder="请输入工作年限"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="infoAddDialog = false">取 消</el-button>
        <el-button type="primary" @click="addTeacher">立即添加</el-button>
      </div>

    </el-dialog>



    <!-- 编辑导师信息对话框 -->
    <el-dialog title="修改导师信息" :visible.sync="teacherEditDialog" @close="closeteacherEditDailog">

      <el-form :model="teacherEditForm"  ref="teacherEditForm">
        <el-form-item prop="id" label="导师ID" width="180">
          <el-input disabled  :value="teacherEditForm.id"></el-input>
        </el-form-item>
        <el-form-item prop="empNo" label="导师编号" width="180">
          <el-input disabled  :value="teacherEditForm.empNo"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="导师姓名" width="180">
          <el-input  :value="teacherEditForm.name"></el-input>
        </el-form-item>

        <el-form-item prop="sex" label="导师性别" width="180">

          <el-select
                      v-model="teacherEditForm.sex" filterable placeholder="请输入/请选择导师性别">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              v-model="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="workingSeniority" label="工作年限" width="180">
          <el-input :value="teacherEditForm.workingSeniority"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="teacherEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="editTeacher">确 定</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
  export default {
    name: 'TeacherManager',
    created() {
      this.getTableData()
    },
    data() {
      return {
        queryStr:'',
        page_no:1,
        pageSize:1,
        total:0,
        options2: [{
          value: '1',
          label: '男'
        }, {
          value: '2',
          label: '女'
        }],
        options3: [{
          value: '1',
          label: '男'
        }, {
          value: '0',
          label: '女'
        }],

        tableData:[],

        form1: {
          empNo: '',
          name: '',
          sex: '',
          workingSeniority: ''
        },

        infoAddDialog: false,

        teacherEditDialog: false,
        teacherEditForm: {
          id:-1,
          empNo: -1,
          name: '',
          sex: '',
          workingSeniority: ''
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
        this.$refs.form1.resetFields()
      },

      showteacherEditDailog(curUser) {
        for (const key in this.teacherEditForm) {
          this.teacherEditForm[key] = curUser[key]
        }
        // 打开用户编辑对话框
        this.teacherEditDialog = true
      },

      // 关闭用户编辑对话框
      closeteacherEditDailog() {
        this.$refs.teacherEditForm.resetFields()
      },


      async delStuById(id) {
        try {
          await this.$confirm('你确定要删除该老师吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          // 发送axios请求删除用户
          let res = await this.axios.delete(`/api/v1/admin/delete_tutor?id=${id}`)
          if (res.data.code == 0) {
            this.$message.success('恭喜你，删除成功了')
            // 重新渲染
            if (this.tableData.length === 1 && this.page_no > 1) this.page_no--
            this.getTableData()
          } else {
            this.$message.danger('删除用户失败')
          }
        } catch (e) {
          this.$message.error('取消删除了')
        }

      },

      //展示信息

      async getTableData() {
        let res = await this.axios({
          url: '/api/v1/admin/select_tutor_list',
          method: 'get',
          params: {
            pageNo: this.page_no,
            key:this.queryStr,
          }
        })
        let {status} = res
        let {data} = res.data
        console.log(res)
        if (status == 200) {
          this.tableData = data.list
          this.total = data.total
          this.pageSize = data.pageSize
        }
      },

      handleCurrentChange(val) {
        this.page_no = val
        this.getTableData()
      },

      search() {
        // 搜索的时候，让当前页变成1
        this.page_no = 1
        this.getTableData()
      },

      //添加老师
      addTeacher(){
        this.$refs.form1.validate(async valid => {
          if (valid) {
            // 发送ajax请求
            let res = await this.axios.post(`/api/v1/admin/insert_tutor`, this.form1)
            let { code } = res.data
            if (code === 0) {
              this.$message.success('恭喜你，添加成功了')
              // 清空表单的内容
              this.$refs.form1.resetFields()
              // 关闭模态框
              this.infoAddDialog = false
              // 重新渲染
              // 求最大的页码
              this.total++
              this.current = Math.ceil(this.total / this.pageSize)
              this.getTableData()
            } else {
              this.$message.error('添加失败了')
            }
          } else {
            return false
          }
        })
      },

      //修改老师信息
      editTeacher(){

        this.$refs.teacherEditForm.validate(async valid => {


          if (valid) {
            if(this.teacherEditForm.sex == '男'){
              this.teacherEditForm.sex =1
            }else if(this.teacherEditForm.sex =='女'){
              this.teacherEditForm.sex = 0
            }
            // 发送ajax请求
            let res = await this.axios.put(`/api/v1/admin/update_tutor`, {
              id:this.teacherEditForm.id,
              name:this.teacherEditForm.name,
              sex:this.teacherEditForm.sex,
              skills:this.teacherEditForm.skills,
              workingSeniority:this.teacherEditForm.workingSeniority,
            })
            let { code } = res.data
            if (code === 0) {
              this.teacherEditDialog = false
              this.$refs.teacherEditForm.resetFields()
              this.getTableData()
              this.$message.success('恭喜你，修改成功了')
            } else {
              this.$message.error('很遗憾，修改失败了')
            }
          } else {
            return false
          }
        })
      },
      change(){
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].sex == 1) {
            this.tableData[i].sex = "男"
          } else if (this.tableData[i].sex ==0 ) {
            this.tableData[i].sex = "女"
          }

        }
      }


    },
    updated() {
      this.change()
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
