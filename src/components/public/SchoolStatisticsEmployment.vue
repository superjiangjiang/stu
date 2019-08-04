<template>
    <div>

      <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>公共</el-breadcrumb-item>
        <el-breadcrumb-item>学校就业统计</el-breadcrumb-item>
      </el-breadcrumb>

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
      created(){
          this.getInfo()
        this.getSalary()
      },
      data () {
        return {
          zhuDate:[],
          pieDataType:[],
          pieData:[],
          series:[],
        }
      },
      methods:{
        drawPie(id,dataType,pieDate){
          this.charts = echarts.init(document.getElementById(id))
          this.charts.setOption({
            title : {
              text: '学生就业率统计',
              subtext: '',
              x:'center'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: dataType
            },
            series : [
              {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['60%', '50%'],
                data:pieDate,
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
        drawZhu(zhuDate){
          let myChart = echarts.init(document.getElementById('main1'));
           // 指定图表的配置项和数据
          let option = {
            legend: {},
            tooltip: {},
            title : {
              text: '学生就业薪资',
              subtext: '',
              x:'left'
            },
            dataset: {
              dimensions: ['time','开发','测试','实施'],
              source: zhuDate
            },
            xAxis: {type: 'category'},
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series:[
              {type: 'bar'},
              {type: 'bar'},
              {type: 'bar'}
            ]
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        },

        async getInfo() {
          let res = await this.axios({
            url: '/api/v1/common/get_all_student_per',
            method: 'get',

          })
          let {status} = res
          let {data} = res.data
          data=JSON.parse(JSON.stringify(data).replace(/type/g, 'name'))
          data=JSON.parse(JSON.stringify(data).replace(/num/g, 'value'))
          console.log(data)
          if(status ==200){
            this.pieData = data
            for (var i in data) {
              this.pieDataType.push(data[i].name)
            }
            this.drawPie('main',this.pieDataType,this.pieData)
          }

        },
        async getSalary() {
          let res = await this.axios({
            url: '/api/v1/common/get_all_student_sal',
            method: 'get',

          })

          let {status} = res
          let {data} = res.data
          console.log(res)
          if(status ==200){

            for(let i=0; i<Object.keys(data).length;i++){
              for (let j=0;j<data[Object.keys(data)[i]].length;j++){
                data[Object.keys(data)[i]][j]=JSON.parse(JSON.stringify(data[Object.keys(data)[i]][j]).replace(/avg_sal/g, `${data[Object.keys(data)[i]][j].type}`))
                delete data[Object.keys(data)[i]][j].type
                data[Object.keys(data)[i]][0]=Object.assign(data[Object.keys(data)[i]][0],data[Object.keys(data)[i]][j])
                data[Object.keys(data)[i]][0].time=Object.keys(data)[i]

              }
              this.zhuDate.push(data[Object.keys(data)[i]][0])
            }
            this.drawZhu(this.zhuDate)
            console.log(this.zhuDate)
          }


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
</style>
