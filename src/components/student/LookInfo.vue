<template>
    <div>
      <el-row>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>学生</el-breadcrumb-item>
          <el-breadcrumb-item>查看招聘信息</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入职位名/公司名/位置" v-model="queryStr" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"  @click="search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-table :data="info" stripe>
        <el-table-column prop="companyName" label="公司名称" width="180">
        </el-table-column>
        <el-table-column prop="position" label="招聘职位" width="180">
        </el-table-column>
        <el-table-column prop="salary" label="薪资" width="120">
        </el-table-column>
        <el-table-column prop="location" label="工作位置" width="180">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
        </el-table-column>
        <el-table-column prop="createtime" label="创建时间" width="220">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini"@click="showDetail(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">

        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
      <el-dialog title="招聘详情" :visible.sync="infodetailDialog" @close="closeinfodetailDialog" width="95%">
            <el-table :data="t_class" stripe  size="middle" class="table">
              <el-table-column prop="id" label="公司编号" width="100" style="display: none">
              </el-table-column>
              <el-table-column prop="companyName" label="公司名称" width="130">
              </el-table-column>
              <el-table-column prop="position" label="招聘职位" width="130">
              </el-table-column>
              <el-table-column prop="salary" label="薪资" width="110">
              </el-table-column>
              <el-table-column prop="location" label="工作位置" width="130">
              </el-table-column>
              <el-table-column prop="status" label="状态" width="100">
              </el-table-column>
              <el-table-column prop="detail" label="细节" width="180">
              </el-table-column>
              <el-table-column prop="tuEmpNo" label="上传老师" width="100">
              </el-table-column>
              <el-table-column prop="createtime" label="创建时间" width="190">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" plain size="mini"  @click="signUp(scope.row.id)">点我报名</el-button>
                </template>
              </el-table-column>
          </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="infodetailDialog = false">确 定</el-button>

        </div>

      </el-dialog>


    </div>
</template>

<script>
  export default {
    name: 'LookInfo',
    created() {
      this.gettableData()
    },
    data() {
      return {
        queryStr: '',
        info: [],
        pageSize: 3,
        pageNum: 1,
        total: 0,
        infodetailDialog: false,
        t_class:[{
          id:'',
          position:'',
          salary:'',
          companyName:'',
          location:'',
          detail:'',
          createtime:'',
          tuEmpNo:'',
          status:''
        }]
       }
    },
    methods: {

      /*学生查询所有职位*/
      async gettableData() {

        let res = await this.axios({
          url: '/api/v1/student/findAllPosition',
          method: 'get',
          params: {
            pageNum: this.pageNum,
          }
        })
           let {code,data} = res.data
        if (code == 0) {
          for (let i=0;i<data.list.length;i++){
            data.list[i].createtime = this.timestampToTime(data.list[i].createtime)
          }
          this.info = data.list
          this.total = data.total
          this.pageSize = data.pageSize
         }
      },
      /*学生通过关键字查询职位*/
      async findPositionByKey() {
        let res = await this.axios({
          url: '/api/v1/student/findPositionByKey',
          method: 'get',
          params: {
            pageNum: this.pageNum,
            key:this.queryStr,
          }
        })
         let {code,data} = res.data
        console.log(res)
        if (code == 0) {
          this.info = data.list
          this.total = data.total
          this.pageSize = data.pageSize
        }
      },
      //分页查询
      handleCurrentChange(val) {
        this.pageNum = val
        this.key = ''
        this.findPositionByKey()
      },

      //模糊查询
      search() {
        // 搜索的时候，让当前页变成1
        this.pageNum = 1
        this.findPositionByKey()
      },
      /*查看招聘信息详情*/
      showDetail(detail){
        this.t_class[0].companyName=detail.companyName
        this.t_class[0].createtime = detail.createtime
        this.t_class[0].detail = detail.detail
        this.t_class[0].id = detail.id
        this.t_class[0].location = detail.location
        this.t_class[0].position=detail.position
        this.t_class[0].salary = detail.salary
        this.t_class[0].status = detail.status
        this.t_class[0].tuEmpNo = detail.tuEmpNo

        this.infodetailDialog = true;
      },
      /*关闭对话框*/
      closeinfodetailDialog(){
        this.infodetailDialog = false;
      },
      /*学生报名*/
      async signUp(id) {
        // 发送ajax请求
        let res = await this.axios({
          url: '/api/v1/student/studentSignupPosition',
          method: 'post',
          params: {
            p_id:id,
          }
        })
        console.log(res)
        let {code} = res.data
        if (code === 0) {
          this.$message.success(res.data.data)
        } else {
          this.$message.error(res.data.data)
        }
      },
      /*结束招聘*/
      change(){
        for (var i = 0; i < this.info.length; i++) {
          if (this.info[i].status == 1) {
            this.info[i].status = "已结束"
          } else if (this.info[i].status ==0 ) {
            this.info[i].status = "正在招聘"
          }

        }
      },
      timestampToTime(timer) {    //时间戳为10位需*1000，时间戳为13位的话不需乘1000在转成yymmdd
        let date = new Date(timer)
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m
        let d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        return y + '-' + m + '-' + d
      },
    },
    updated() {
      this.change()
    }
  }
</script>

<style scoped lang="less">
  .user-breadcrumb {
    line-height: 40px;
    background-color: #d4dae0;
    font-size: 18px;
    padding-left: 10px;
  }

  /*.el-row {
    margin-bottom: 2px;
    &:last-child {
      margin-bottom: 0;
    }
  }*/
  .el-col {
    border-radius: 4px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
  .type{
    color: #6666cc;
  }
  .salary{
    color: red;
  }
  .info{
    border: 1px solid #cccccc;
    line-height: 50px;
    height: 50px;
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .info:hover{

    background: #f5f5f5;
  }
  .info div{
    height: 50px;
    overflow: hidden;
  }
</style>
