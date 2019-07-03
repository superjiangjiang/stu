<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生</el-breadcrumb-item>
      <el-breadcrumb-item>教师评价</el-breadcrumb-item>
      <el-breadcrumb-item>教师评价详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="head1">
      <el-col :span="24" >
        课程名称:线性代数I  <span>总评分:A</span>
      </el-col>
    </el-row>
    <el-row class="head2">
      <el-col :span="18">
        <div>评价指标（权重）</div>
      </el-col>
      <el-col :span="6">
        <div>评价选项</div>
      </el-col>
    </el-row>
    <el-row class="row">
      <el-col :span="18">
        <div>1.上课组织有条理，准备充分，讲解熟练，严格课堂纪律，通过考勤等促进学习。（20%）</div>
      </el-col>
      <el-col :span="6">
        <label><input @click="getRadioVal" type="radio" name="type" value="A">A</label>
        <label><input @click="getRadioVal" type="radio" name="type" value="B">B</label>
        <label><input @click="getRadioVal" type="radio" name="type" value="C">C</label>
        <label><input @click="getRadioVal" type="radio" name="type" value="D">D</label>
        <label><input @click="getRadioVal" type="radio" name="type" value="E">E</label>
       </el-col>
    </el-row>
    <el-row class="row">
      <el-col :span="18">
        <div>1.上课组织有条理，准备充分，讲解熟练，严格课堂纪律，通过考勤等促进学习。（20%）</div>
      </el-col>
      <el-col :span="6">
        <label><input @click="getRadioVal" type="radio" name="type" value="A">A</label>
        <label><input @click="getRadioVal" type="radio" name="type" value="B">B</label>
        <label><input @click="getRadioVal" type="radio" name="type" value="C">C</label>
        <label><input @click="getRadioVal" type="radio" name="type" value="D">D</label>
        <label><input @click="getRadioVal" type="radio" name="type" value="E">E</label>
      </el-col>
    </el-row>
    <el-row class="row">
    <el-col :span="18">
      <div>1.上课组织有条理，准备充分，讲解熟练，严格课堂纪律，通过考勤等促进学习。（20%）</div>
    </el-col>
    <el-col :span="6">
      <label><input @click="getRadioVal" type="radio" name="type" value="A">A</label>
      <label><input @click="getRadioVal" type="radio" name="type" value="B">B</label>
      <label><input @click="getRadioVal" type="radio" name="type" value="C">C</label>
      <label><input @click="getRadioVal" type="radio" name="type" value="D">D</label>
      <label><input @click="getRadioVal" type="radio" name="type" value="E">E</label>
    </el-col>
  </el-row>
    <el-row class="row">
      <el-col :span="18">
        <div>1.上课组织有条理，准备充分，讲解熟练，严格课堂纪律，通过考勤等促进学习。（20%）</div>
      </el-col>
      <el-col :span="6">
        <label><input @click="getRadioVal" type="radio" name="type" value="A">A</label>
        <label><input @click="getRadioVal" type="radio" name="type" value="B">B</label>
        <label><input @click="getRadioVal" type="radio" name="type" value="C">C</label>
        <label><input @click="getRadioVal" type="radio" name="type" value="D">D</label>
        <label><input @click="getRadioVal" type="radio" name="type" value="E">E</label>
      </el-col>
    </el-row>
    <el-row class="button">
      <el-col :span="6" :push="9">
        <el-button type="primary" size="mini">保存</el-button>
        <el-button type="primary" size="mini">关闭</el-button>
      </el-col>
    </el-row>





<!--
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="curPage" >
    </el-pagination>-->
  </div>
</template>

<script>
  export default {
    name: 'EvaluationDetail',
    created() {
    },



    data() {
      return {

      }
    },

    methods: {
      getRadioVal(event){
        const radioVal = event.target.value
        console.log(radioVal)
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
  .row{
    height: 40px;
    line-height: 40px;
    border: 1px solid #B3C1CD;
    border-top: none;
  }


  .head1{
    height: 40px;
     line-height: 40px;
     margin-top: 10px;
  }
  .head1 span {
   color: red;
  }
  .head2{
    height: 40px;
    background-color:#D4DAE0;
    border: 1px solid #B3C1CD;
    border-top: none;
    line-height: 40px;
  }
  .head2 div{
    text-align: center;
  }
  .button {
    margin-top: 5px;
  }
</style>
