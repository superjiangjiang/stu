<template>
    <div>

      <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>老师</el-breadcrumb-item>
        <el-breadcrumb-item>学校就业统计</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row :gutter="20">
         <el-col :span="6" :push="17" >
           <el-select v-model="value" placeholder="请选择">
             <el-option
               v-for="item in options"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
           </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="5"  >
        <div id="main" class="main" style="width: 700px;height: 500px;"></div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
      <el-col :span="5" >
        <div id="main1" style="width: 700px;height:500px;"></div>
      </el-col>
      </el-row>
    </div>
</template>

<script>
  import echarts from 'echarts'
    export default {
        name: "SchoolStatisticsEmployment",
      data () {
        return {
          options: [{
            value: '选项1',
            label: '本科'
          }, {
            value: '选项2',
            label: '专科'
          }],
          value: ''
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
                center: ['60%', '50%'],
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
        },
        drawZhu(){
          let myChart = echarts.init(document.getElementById('main1'));
           // 指定图表的配置项和数据
          let option = {
            legend: {},
            tooltip: {},
            title : {
              text: '学生就业薪资',
              subtext: '纯属虚构',
              x:'left'
            },
            dataset: {
              dimensions: ['salary', '软件开发', '实施运维', '软件测试'],
              source: [
                {salary: '2017', '软件开发': 4333, '实施运维': 3666.7, '软件测试': 3666},
                {salary: '2018', '软件开发': 3903.8, '实施运维': 3666.7, '软件测试': 3500},
                {salary: '2019', '软件开发': 5058.8, '实施运维': 4000, '软件测试': 4000}
                ]
            },
            xAxis: {type: 'category'},
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
              {type: 'bar'},
              {type: 'bar'},
              {type: 'bar'}
            ]
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }
      },
      //调用
      mounted(){
        this.$nextTick(function() {
          this.drawPie('main')
          this.drawZhu()
        })
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
