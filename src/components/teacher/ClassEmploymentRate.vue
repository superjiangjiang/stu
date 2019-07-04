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
        name: "ClassEmploymentRate",

      data () {
        return {
        }
      },
      methods:{
        drawPie(id){
          this.charts = echarts.init(document.getElementById(id))
          this.charts.setOption({
            title : {
              text: '老师所带学生就业率',
              subtext: '纯属虚构',
              x:'center'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['国内开发','对日开发','软件测试','软件实施','软件销售','计算机相关','非计算机类']
            },
            series : [
              {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['60%', '45%'],
                data:[
                  {value:335, name:'国内开发'},
                  {value:310, name:'对日开发'},
                  {value:234, name:'软件测试'},
                  {value:135, name:'软件实施'},
                  {value:1548, name:'软件销售'},
                  {value:135, name:'计算机相关'},
                  {value:1548, name:'非计算机类'}

                ],
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
      //调用
      mounted(){
        this.$nextTick(function() {
          this.drawPie('main')
        })
      }
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
