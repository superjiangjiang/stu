<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>老师</el-breadcrumb-item>
        <el-breadcrumb-item>学时管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :span="5"><div class="grid-content bg-purple">
          <el-select :default-active="$route.path" @change="chickvalue"
                     v-model="searchValue" filterable placeholder="请输入/请选择" class="h-m-select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              v-model="item.value">
            </el-option>
          </el-select>
        </div></el-col>
        <el-col :span="24">
          <!--操作按钮-->
        </el-col>
        <el-col :span="24">
          <!--列表-->
        </el-col>
        <el-col :span="24">
          <!--列表底部内容-->
        </el-col>
      </el-row>
      <el-row>
        <router-view>
        </router-view>
      </el-row>

    </div>
</template>

<script>
  export default {
    name: 'PeriodManager',
    data () {
      return {
        options: [{
          value: '选项0',
          label: '保密设置'
        }, {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }, {
          value: '/home',
          label: '首页'
        }],
        searchValue: ''
      }
    },
    methods: {
      handleClick () {
        alert('button click')
      },
      chickvalue () {
        console.log(this.searchValue)
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

  .h-m-select{
    margin-top: 10px ;
  }

</style>
