<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学业导师</el-breadcrumb-item>
      <el-breadcrumb-item>招聘信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入职位名/公司名/位置" v-model="queryStr" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="success" plain @click="showinfoAddDialog">添加招聘信息</el-button>
      </el-col>
      </el-row>


    <el-table :data="tableData" stripe>
      <el-table-column prop="id" label="编号" width="60">
      </el-table-column>
      <el-table-column prop="position" label="职业" width="120">
      </el-table-column>
      <el-table-column prop="salary" label="薪资" width="80">
      </el-table-column>
      <el-table-column prop="companyName" label="公司" width="210">
      </el-table-column>
      <el-table-column prop="location" label="位置" width="170">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
      </el-table-column>
       <el-table-column prop="createtime" label="发布时间" width="100">
      </el-table-column>
      <el-table-column prop="detail" label="描述" width="150">
      </el-table-column>
      <el-table-column label="操作" width="270">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showinfoEditDailog(scope.row)"></el-button>
          <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="delInfoById(scope.row.id)"></el-button>

          <el-button type="primary" plain size="mini"  @click="showJobTrackingDailog(scope.row)">查看已报名学生</el-button>

        </template>
      </el-table-column>
    </el-table>


    <!-- 添加招聘信息对话框 -->
    <el-dialog title="添加招聘信息" :visible.sync="infoAddDialog" @close="closeinfoAddDialog">
      <el-form :model="form"  ref="form">
        <el-form-item label="招聘企业">
          <el-input v-model="form.companyName" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="工作地址">
          <el-input v-model="form.location" placeholder="请输入工作地点"></el-input>
        </el-form-item>
        <el-form-item label="招聘职业">
          <el-input v-model="form.position" placeholder="请输入招聘职业"></el-input>
        </el-form-item>
        <el-form-item label="薪资">
          <el-input v-model="form.salary" placeholder="请输入薪资(不用区间)"></el-input>
        </el-form-item>
        <el-form-item label="招聘详情">
          <el-input type="textarea" v-model="form.detail"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="infoAddDialog = false">取 消</el-button>
        <el-button type="primary" @click="addInfo">立即发布</el-button>
      </div>

    </el-dialog>

    <el-dialog title="已报名学生信息" :visible.sync="jobTrackingDialog" >

      <el-table :data="jobTrackingData">
        <el-table-column property="name" label="姓名" width="70"></el-table-column>
        <el-table-column property="school" label="学校" width="120"></el-table-column>
        <el-table-column property="grade" label="班级" width="80"></el-table-column>

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
        <el-row :gutter="20" style="margin-top: -50px;">
          <el-col :span="6" push="16">
            <el-button ref="elbutton" plain  type="primary" @click="changestatus" style="margin-top: 10px;">{{infoEditForm.status}}</el-button>
          </el-col>
        </el-row>
        <el-form-item label="编号" style="display: none">
          <el-input :model="infoEditForm.id" ></el-input>
        </el-form-item>
        <el-form-item label="职业">
          <el-input v-model="infoEditForm.position" ></el-input>
        </el-form-item>
        <el-form-item label="薪资">
          <el-input v-model="infoEditForm.salary" ></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="infoEditForm.companyName" ></el-input>
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model="infoEditForm.location" ></el-input>
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="infoEditForm.detail" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="infoEditDialog = false">取 消</el-button>
        <el-button type="primary"  @click="updateInfo">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>

  export default {
    created() {

      this.getTableData()
    },



    data() {
      return {

        // 每页大小
        pageSize: 3,
        // 当前页码
        page_no: 1,
        // 总条数
        total: 0,
        jobTrackingData:[],
        // 搜索内容
        queryStr: '',
        form:{},
        tableData:[],
        jobTrackingDialog: false,

        infoAddDialog: false,
        infoEditDialog: false,
        infoEditForm: {
          id:'',
          position:'',
          salary:'',
          companyName:'',
          location:'',
          createtime:'',
          status:'正在招聘',
          detail: '急聘'
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
        this.$refs.form.resetFields()
      },
      async showJobTrackingDailog(curUser){
        // 打开对话框
        this.jobTrackingDialog = true

          let res = await this.axios({
            url: '/api/v1/tutor/getSignupStus',
            method: 'get',
            params: {
              p_id: curUser.id
            }
          })
          let {status} = res
          let {data} = res.data

          if (status == 200) {
            this.jobTrackingData = data.list
          }
        },

      async delInfoById(id) {

          try {
        await this.$confirm('你确定要删除这条信息吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          // 发送axios请求删除用户
          let res = await this.axios({
            url: '/api/v1/tutor/overPosition',
            method: 'put',
            params: {
              p_id:id
            }

          })
          let {status} = res
          if (status === 200) {
            this.$message.success('恭喜你，删除成功了')
            // 重新渲染
            if (this.tableData.length === 1 && this.page_no > 1) this.page_no--
            this.getTableData()
          } else {
            this.$message.danger('删除失败')
          }
        } catch (e) {
          this.$message.error('取消删除了')
        }
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
      //点击确定修改数据
      updateInfo(){
        this.$refs.infoEditForm.validate(async valid => {
          if (valid) {
            // 发送ajax请求
            let res = await this.axios.put(`/api/v1/tutor/updatePosition`, {
              id:this.infoEditForm.id,
              position:this.infoEditForm.position,
              salary:this.infoEditForm.salary,
              companyName:this.infoEditForm.companyName,
              location:this.infoEditForm.location,
              detail:this.infoEditForm.detail,
            })
            let { code } = res.data
            if (code === 0) {
              this.infoEditDialog = false
              this.$refs.infoEditForm.resetFields()
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

      // 关闭用户编辑对话框
      closeInfoEditDialog() {
        this.$refs.infoEditForm.resetFields()
      },

      async  changestatus(){
        this.infoEditForm.status="已结束"
        let res = await this.axios({
          url: '/api/v1/tutor/overPosition',
          method: 'put',
          params: {
            p_id:this.infoEditForm.id
          }

        })
        let {code} = res
        if (code == 0) {
          this.getTableData()
        }
      },

      async getTableData() {
        let res = await this.axios({
          url: '/api/v1/tutor/toPositionIndex',
          method: 'get',
          params: {
            page_no: this.page_no,
            key: this.queryStr,
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
        this.infoEditDialog = false
      },
      //分页查询

      handleCurrentChange(val) {
        this.page_no = val
        this.getTableData()
      },

      //模糊查询
      search() {
        // 搜索的时候，让当前页变成1
        this.page_no = 1
        this.getTableData()
      },
      //添加
      addInfo(){
        this.$refs.form.validate(async valid => {
            if (valid) {
              // 发送ajax请求
              let res = await this.axios.post(`/api/v1/tutor/addPosition`, this.form)
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
      changstatus1(){
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].status == 0) {
            this.tableData[i].status = "已结束"
          } else if (this.tableData[i].status == 1) {
            this.tableData[i].status = "正在招聘"
          }

        }
      },
      resetForm(formName)
      {
        if (this.$refs[formName]!==undefined) {
          this.$refs[formName].resetFields();
        }
      }

    },
    updated() {
      this.changstatus1()
      this.resetForm()
    },


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
