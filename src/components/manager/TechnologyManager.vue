<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员</el-breadcrumb-item>
      <el-breadcrumb-item>技术老师管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入技术老师编号" v-model="queryStr" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"  @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="success" plain @click="showinfoAddDialog">添加技术老师</el-button>
       </el-col>
    </el-row>

    <el-table :data="tableData" stripe>
      <el-table-column prop="id" label="技术老师id" width="180" >
      </el-table-column>
      <el-table-column prop="empNo" label="技术老师编号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="技术老师姓名" width="150">
      </el-table-column>
      <el-table-column prop="sex" label="技术老师性别" width="100">
      </el-table-column>
      <el-table-column prop="skills" label="擅长的技术" width="220">
      </el-table-column>
      <el-table-column prop="workingSeniority" label="工作年限" width="100">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showScoreEditDailog(scope.row)"></el-button>
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

    <el-dialog title="添加技术老师" :visible.sync="infoAddDialog" @close="closeinfoAddDialog">
      <el-form :model="form"  ref="form">

        <el-form-item label="技术老师编号">
          <el-input v-model="form.empNo" placeholder="请输入技术老师编号"></el-input>
        </el-form-item>
        <el-form-item label="技术老师姓名">
          <el-input v-model="form.name" placeholder="请输入技术老师姓名"></el-input>
        </el-form-item>
        <el-form-item label="技术老师性别">
          <el-select
                     v-model="form.sex" filterable placeholder="请输入/请选择技术老师性别" >
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
          <el-input v-model="form.workingSeniority" placeholder="请输入工作年限"></el-input>
        </el-form-item>



      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="infoAddDialog = false">取 消</el-button>
        <el-button type="primary" @click="addTeacher">立即添加</el-button>
      </div>

    </el-dialog>


    <!-- 编辑技术老师信息对话框 -->
    <el-dialog title="修改技术老师信息" :visible.sync="teteacherEditDialog" @close="closescoreEditDailog">

      <el-form :model="teteacherEditFrom" ref="teteacherEditFrom">
        <el-form-item prop="id" label="技术老师id" width="180">
          <el-input disabled  v-model="teteacherEditFrom.id"></el-input>
        </el-form-item>
        <el-form-item prop="empNo" label="技术老师编号" width="180">
          <el-input disabled  v-model="teteacherEditFrom.empNo"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="技术老师姓名" width="180">
          <el-input  v-model="teteacherEditFrom.name"></el-input>
        </el-form-item>

        <el-form-item prop="sex" label="技术老师性别" width="180">

          <el-select
                      v-model="teteacherEditFrom.sex" filterable placeholder="请输入/请选择技术老师性别">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              v-model="item.value">
            </el-option>
          </el-select>
        </el-form-item>

       <el-form-item prop="skills" label="擅长的技术" width="180">
          <el-input v-model="teteacherEditFrom.skills"></el-input>
        </el-form-item>
        <el-form-item prop="workingSeniority" label="工作年限" width="180">
          <el-input v-model="teteacherEditFrom.workingSeniority"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="teteacherEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="edit" >确 定</el-button>
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
      this.getTableData()
    },



    data() {
      return {
        queryStr:'',
        page_no:1,
        pageSize:1,
        total:0,
        options1: [{
          value: '1',
          label: '男'
        }, {
          value: '0',
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
        form: {
          empNo: '',
          name: '',
          sex: '',
          skills:'',
          workingSeniority: ''
        },
        form1: {
          empNo: '',
          name: '',
          sex: '',
          time: ''
        },

        infoAddDialog: false,
        teteacherEditDialog: false,
        teteacherEditFrom: {
          id:-1,
          empNo:-1,
          name: '',
          sex: '',
          skills:'',
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
        // console.log('对话框关闭了')
        this.$refs.form.resetFields()
      },


      //添加技术老师
      addTeacher(){

        this.$refs.form.validate(async valid => {
          if (valid) {
            // 发送ajax请求
            let res = await this.axios.post(`/api/v1/admin/insert_technicalTeacher`, this.form)
            let { code } = res.data
            if (code === 0) {
              this.$message.success('恭喜你，添加成功了')
              // 清空表单的内容
              this.$refs.form.resetFields()
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

      showScoreEditDailog(curUser) {
        for (const key in this.teteacherEditFrom) {
          this.teteacherEditFrom[key] = curUser[key]
        }
        // 打开用户编辑对话框
        this.teteacherEditDialog = true
      },

      // 关闭用户编辑对话框
      closescoreEditDailog() {
        this.$refs.teteacherEditFrom.resetFields()
      },

      async delStuById(id) {
        // console.log(id)
        try {
          await this.$confirm('你确定要删除该老师吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          let res = await this.axios.delete(`/api/v1/admin/delete_technicalTeacher?id=${id}`)
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
          url: '/api/v1/admin/select_technicalTeacher_list',
          method: 'get',
          params: {
            pageNo: this.page_no,
            key:this.queryStr,
          }
        })
        let {status} = res
        let {data} = res.data

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

      //修改信息
      edit(){
        this.$refs.teteacherEditFrom.validate(async valid => {
          if (valid) {
            // 发送ajax请求

            let res = await this.axios.put(`/api/v1/admin/update_technicalTeacher`, {
              id:this.teteacherEditFrom.id,
              name:this.teteacherEditFrom.name,
              sex:this.teteacherEditFrom.sex,
              skills:this.teteacherEditFrom.skills,
              workingSeniority:this.teteacherEditFrom.workingSeniority,
            })
            let { code } = res.data
            if (code === 0) {
              this.teteacherEditDialog = false
              this.$refs.teteacherEditFrom.resetFields()
              this.getTableData()
              this.$message.success('恭喜你，修改成功了')
            } else {
              this.$message.error('很遗憾，修改失败了')
            }
          } else {
            return false
          }
        })
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
