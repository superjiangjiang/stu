<template>
  <div id="main" style="width: 600px;height: 400px;"></div>
  </template>
<script>
  import echarts from 'echarts'
    export default {
        name: "ClassEmploymentRate",

      data () {
        return {
          charts: '',
          opinion:['男','女'],
          opinionData:[
            {value:335, name:'男'},
            {value:310, name:'女'},

          ]
        }
      },
      methods:{
        drawPie(id){
          this.charts = echarts.init(document.getElementById(id))
          this.charts.setOption({
            title : {
              text: '某站点用户访问来源',
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
                center: ['50%', '60%'],
                data:[
                  {value:335, name:'直接访问'},
                  {value:310, name:'邮件营销'},
                  {value:234, name:'联盟广告'},
                  {value:135, name:'视频广告'},
                  {value:1548, name:'搜索引擎'}
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
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
