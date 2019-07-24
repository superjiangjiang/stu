<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学业导师</el-breadcrumb-item>
      <el-breadcrumb-item>学时管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入学号/姓名" v-model="queryStr" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"   @click="search"></el-button>
        </el-input>
      </el-col>

     <el-col :span="4">
        <el-select v-model="list.school" v-if="list" filterable placeholder="请选择学校">
          <el-option
            v-for="item in optionschool"
            :key="item.value"
            :label="item.label"
            v-model="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="list.class" v-if="list" filterable placeholder="请选择班级">
          <el-option
            v-for="item in optionclass"
            :key="item.value"
            :label="item.label"
            v-model="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" :push="5">
        <el-button type="primary" plain @click="GoHistory">查看历史记录</el-button>
      </el-col>
    </el-row>

    <el-table :data="list" stripe v-if="showPunishDialog">
      <el-table-column prop="sNo" label="学号" width="150">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="150">
      </el-table-column>
      <el-table-column prop="school" label="学校" width="180">
      </el-table-column>
      <el-table-column prop="classHour" label="学时" width="180">
      </el-table-column>
      <el-table-column prop="cName" label="班级" width="150">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini"  @click="showRewardDialog(scope.row)">奖励</el-button>
          <el-button type="primary" plain size="mini"  @click="showPunishDialog(scope.row)">扣除</el-button>
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
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="page_no"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>


    <!-- 奖励对话框 -->
    <el-dialog title="奖励学时" :visible.sync="RewardDialog">
      <el-form :model="RewardForm" ref="RewardForm">
        <el-form-item prop="date" label="学号" label-width="120px" style="display: none">
          <el-input v-model="RewardForm.sId"></el-input>
        </el-form-item>
        <el-form-item prop="date" label="姓名" label-width="120px" style="display: none">
          <el-input v-model="RewardForm.sName"></el-input>
        </el-form-item>
        <el-form-item prop="number" label="原因" label-width="120px">
          <el-input v-model="RewardForm.reason"></el-input>
        </el-form-item>
        <el-form-item prop="detail" label="奖励学时数" label-width="120px">
          <el-input v-model="RewardForm.detail"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="RewardDialog = false">取 消</el-button>
        <el-button type="primary"  @click="rewardClick">确 定</el-button>
      </div>

    </el-dialog>

  <!--惩罚对话框-->

    <el-dialog title="扣除学时" :visible.sync="PunishDialog" >
      <el-form :model="PunishForm" ref="PunishForm">
        <el-form-item prop="date" label="学号" label-width="120px" style="display: none">
          <el-input v-model="PunishForm.sId"></el-input>
        </el-form-item>
        <el-form-item prop="date" label="姓名" label-width="120px" style="display: none">
          <el-input v-model="PunishForm.sName"></el-input>
        </el-form-item>
        <el-form-item label="扣除学时原因" prop="reason" label-width="120px">
          <el-select v-model="PunishForm.reason" placeholder="请选择" style="width: 100%;">
            <el-option v-for="item in items" :label="item.name" :key="item.id" v-model="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="扣除学时" prop="detail" label-width="120px">
          <el-select v-model="PunishForm.detail" placeholder="请选择" style="width: 100%;">
            <el-option v-for="item in scoreOption" :label="item.classHour"  :key="item.id" v-model="item.classHour"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="PunishDialog = false">取 消</el-button>
        <el-button type="primary" @click="punishClick">确 定</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'PeriodManager',
    created() {
       // 发送请求，获取数据
      this.getList()
    },
      data() {
        return {
          optionschool: [{
            value: '齐鲁工业大学',
            label: '齐鲁工业大学'
          }, {
            value: '科技',
            label: '科技'
          }, {
            value: '信息',
            label: '信息'
          }],
          optionclass: [{
            value: '基础1班',
            label: '基础1班'
          }, {
            value: '基础2班',
            label: '基础2班'
          }, {
            value: '骨干班',
            label: '骨干班'
          }, {
            value: '卓越班',
            label: '卓越班'
          }, {
            value: '实施班',
            label: '实施班'
          }],
          // 控制用户添加对话框的展示和隐藏
          RewardDialog: false,

          items:[],
          scoreOption:[],


          // 控制编辑用户对话框的展示和隐藏
          PunishDialog: false,
          RewardForm: {
            sId:-1,
            sName:-1,
            reason:'',
            detail:'',

          },
          PunishForm:{
            sName:-1,
            sId:-1,
            reason:'',
            detail:'',

          },

          list: [],
          //excel上传

          queryStr:'',
          page_no:1,
          pageSize:1,
          total:0,

        }
      },

      methods: {
        GoHistory(){
          this.$router.push({name:'periodhistory'})
        },
        // 展示奖励分数
        showRewardDialog(row) {

          this.RewardDialog = true
          this.RewardForm.sId=row.id
          this.RewardForm.sName = row.name
        },
        // 关闭对话框重置表单


        // 展示惩罚学时对话框
        async showPunishDialog(row) {
          this.PunishDialog = true
          this.RewardForm.sId=row.id
          this.RewardForm.sName = row.name
          let res = await this.axios({
            url: '/api/v1/tutor/getReduceHours',
            method: 'get',
          })

          let {status} = res
          let { data } = res.data
          if (status == 200) {
            this.items = data
            this.scoreOption = data
          }

        },




        //展示信息
        async getList() {
          let res = await this.axios({
            url: '/api/v1/tutor/toHoursIndex',
            method: 'get',
            params: {
              page_no:this.page_no,
              key:this.queryStr,
            }
          })

          let {status} = res
          let { data } = res.data
          if (status == 200) {
            this.list = data.list
            this.total = data.total
            this.pageSize = data.pageSize
          }
        },
        //分页查询

        handleCurrentChange(val) {
          this.page_no = val
          this.getList()
        },


        //模糊查询
        search() {
          // 搜索的时候，让当前页变成1
          this.page_no = 1
          this.getList()
        },

        //奖励学时
        rewardClick() {
          this.$refs.RewardForm.validate(async valid => {
            if (valid) {
              // 发送ajax请求
              let res = await this.axios.post(`/api/v1/tutor/editHours`, this.RewardForm)
              let { code } = res.data
              if (code === 0) {
                this.$message.success('恭喜你，添加成功了')
                // 清空表单的内容
                this.$refs.RewardForm.resetFields()
                // 关闭模态框
                this.RewardDialog = false
                // 重新渲染
                // 求最大的页码
                this.total++
                this.page_no = Math.ceil(this.total / this.pageSize)
                this.getList()
              } else {
                this.$message.error('添加失败了')
              }
            } else {
              return false
            }
          })
        },

        punishClick() {
          console.log(this.PunishForm.detail)
          console.log(this.PunishForm.reason)
          this.$refs.PunishForm.validate(async valid => {
            if (valid) {
              // 发送ajax请求
              let res = await this.axios.post(`/api/v1/tutor/addWorkInfo`, this.PunishForm)
              let { code } = res.data
              if (code === 0) {
                this.$message.success('恭喜你，惩罚成功了')
                // 清空表单的内容
                this.$refs.PunishForm.resetFields()
                // 关闭模态框
                this.RewardDialog = false
                // 重新渲染
                // 求最大的页码
                this.total++
                this.page_no = Math.ceil(this.total / this.pageSize)
                this.getList()
              } else {
                this.$message.error('惩罚失败了')
              }
            } else {
              return false
            }
          })
        },
      },
  }
</script>

<style scoped>
  .user-breadcrumb {
    line-height: 40px;
    background-color: #d4dae0;
    font-size: 18px;
    padding-left: 10px;
  }
  .h-m-select{
    margin-top: 10px ;
  }
</style>
