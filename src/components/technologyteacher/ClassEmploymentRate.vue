<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>老师</el-breadcrumb-item>
      <el-breadcrumb-item>所带学生就业率</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20" class="el-row">
      <el-col :span="5"  >
        <div id="main" style="width: 800px;height: 600px;"></div>
      </el-col>
    </el-row>
  </div>


</template>
<script>
  import echarts from 'echarts'
  export default {
    created(){
      this.getTableData()
    },
    name: "ClassEmploymentRate",
    data () {
      return {
        nameData:[],
        pieData: []
      }
    },
    methods:{
      async getTableData() {
        let res = await this.axios({
          url: '/api/v1/technical_teacher/get_student_pre_work',
          method: 'get',
        })
        console.log(res)
       let {data} = res.data
        let {code} = res.data
         if (code == 0) {
          for(let i=0; i<Object.keys(data).length;i++){
              let obj = {value:data[Object.keys(data)[i]],name:Object.keys(data)[i]}
              this.pieData.push(obj)
             this.nameData.push(Object.keys(data)[i])

           }
           this.drawPie()
            }
      },
      drawPie(){
        console.log(this.num)
        this.charts = echarts.init(document.getElementById("main"))
        this.charts.setOption({
          title : {
            text: '老师所带学生就业率',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.nameData
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['60%', '45%'],
              data:this.pieData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      }
    },
  }



</script>

<style scoped>
  .el-row {
    margin-top: 40px;
  }
  .user-breadcrumb {
    line-height: 40px;
    background-color: #d4dae0;
    font-size: 18px;
    padding-left: 10px;
  }
</style>

