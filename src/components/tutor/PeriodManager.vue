<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员</el-breadcrumb-item>
      <el-breadcrumb-item>学时管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入学号" v-model="queryStr" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" ></el-button>
        </el-input>
      </el-col>

      <el-col :span="4">
        <el-select  @change="chickvalue1"
                    v-model="tableData.school" filterable placeholder="请选择学校">
          <el-option
            v-for="item in optionschool"
            :key="item.value"
            :label="item.label"
            v-model="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select  @change="chickvalue2"
                    v-model="tableData.class" filterable placeholder="请选择班级">
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
    <el-table :data="tableData" stripe>
      <el-table-column prop="number" label="学号" width="150">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="150">
      </el-table-column>
      <el-table-column prop="school" label="学校" width="180">
      </el-table-column>
      <el-table-column prop="class" label="班级" width="150">
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
<!--    <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="curPage" >-->
<!--    </el-pagination>-->
    <el-pagination
      layout="prev, pager, next"
      :total="50">
    </el-pagination>



    <!-- 奖励对话框 -->
    <el-dialog title="奖励学时" :visible.sync="RewardDialog" @close="closeRewardDialog">
      <el-form :model="RewardForm" ref="scoreAddForm">
        <el-form-item prop="date" label="时间" label-width="120px">
            <el-date-picker type="date" placeholder="选择日期" v-model="RewardForm.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item prop="number" label="原因" label-width="120px">
          <el-input v-model="RewardForm.reason"></el-input>
        </el-form-item>
        <el-form-item prop="number" label="奖励学时数" label-width="120px">
          <el-input v-model="RewardForm.score"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="RewardDialog = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>

    </el-dialog>

  <!--惩罚对话框-->

    <el-dialog title="扣除学时" :visible.sync="PunishDialog" @close="closePunishDialog">
      <el-form :model="PunishForm" ref="PunishForm">
        <el-form-item label="时间"  label-width="65px">
          <el-date-picker type="date" placeholder="选择日期" v-model="PunishForm.date" style="width: 100%;"></el-date-picker>

        </el-form-item>
        <el-form-item label="扣除学时原因" prop="typeId" label-width="120px">
          <el-select v-model="PunishForm.reason" placeholder="请选择" style="width: 100%;">
            <el-option v-for="item in items" :label="item.reason" :value="item.id" :key="item.index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="扣除学时" prop="typeId" label-width="120px">
          <el-select v-model="PunishForm.reason" placeholder="请选择" style="width: 100%;">
            <el-option v-for="item in scoreOption" :label="item.score" :value="item.id" :key="item.index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="PunishDialog = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'PeriodManager',
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
          queryStr:"",
          userList: [],
          // 每页大小
          pageSize: 3,
          // 当前页码
          curPage: 1,
          // 总条数
          total: 0,

          // 控制用户添加对话框的展示和隐藏
          RewardDialog: false,
          PunishForm:{
            reasons:''
          },
          items:[{reason:'请假一天',id:'1'},{reason:'请假半天',id:'2'},{reason:'旷课',id:'3'},{reason:'早退',id:'4'}],
          scoreOption:[{score:'5',id:'1'},{score:'2',id:'2'},{score:'3',id:'3'},{score:'4',id:'4'}],


          // 控制编辑用户对话框的展示和隐藏
          PunishDialog: false,
          RewardForm: {

            date:'',
            reason:'',
            score:''

          },
          PunishForm:{
            date:'',
            reason:'',
            score:''
          },

          tableData: [{
            number: '201603091071',
            username: '赵珂',
            school: '齐鲁工业大学',
            class: '基础班',

          },{
            number: '201603091071',
            username: '赵珂',
            school: '齐鲁工业大学',
            class: '基础班',

          },{
            number: '201603091071',
            username: '赵珂',
            school: '齐鲁工业大学',
            class: '基础班',

          },{
            number: '201603091071',
            username: '赵珂',
            school: '齐鲁工业大学',
            class: '基础班',

          },{
            number: '201603091071',
            username: '赵珂',
            school: '齐鲁工业大学',
            class: '基础班',

          }]
          //excel上传



        }
      },

      methods: {
        GoHistory(){
          this.$router.push({name:'periodhistory'})
        },
        // 展示奖励分数
        showRewardDialog() {
          this.RewardDialog = true
        },
        // 关闭对话框重置表单
        closeRewardDialog() {

          this.$refs.RewardDialog.resetFields()
        },

        // 添加用户


        // 根据用户id删除用户
        delStuById(id) {
          // console.log(id)
          this.$confirm('确认删除该用户吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })},

        // 展示编辑对话框
        showPunishDialog(curUser) {
          // console.log(curUser)
          // 先获取到当前用户的数据
          // 数据交给 scoreEditForm 后，就会展示在编辑对话框中
          for (const key in this.scoreEditForm) {
            this.PunishForm[key] = curUser[key]
          }

          // 打开用户编辑对话框
          this.PunishDialog = true
        },

        // 关闭用户编辑对话框
        closePunishDialog() {
          this.$refs.scoreEditForm.resetFields()
        },

        chickvalue1 () {
          console.log(this.tableData.school)
        },
        chickvalue2 () {
          console.log(this.tableData.class)
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
  .h-m-select{
    margin-top: 10px ;
  }
</style>
