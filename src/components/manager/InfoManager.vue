<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>管理员</el-breadcrumb-item>
        <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row class="content">
        <el-col :span="5"  class="span">
            <el-input placeholder="请输入班级名称" v-model="queryStr" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"  @click="search"></el-button>
            </el-input>
          <el-button type="success" plain @click="showGradeAddDialog">添加班级</el-button>
          <el-table :data="tableGrade" stripe  size="middle" class="table">
            <el-table-column prop="name" label="班级" width="130">
            </el-table-column>

            <el-table-column  label="查看详情" width="100">
            <template slot-scope="scope">
              <el-button type="primary" plain size="mini"  @click="showDetail(scope.row)">详情</el-button>
            </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="6"  class="span">
          <el-input placeholder="请输入学时扣分项" v-model="periodQueryStr" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"  @click="periodSearch"></el-button>
          </el-input>
          <el-button type="success" plain @click="showScoreAddDialog">添加学时扣分项</el-button>
          <el-table :data="tablePeriod" stripe  size="middle" class="table">
            <el-table-column prop="name" label="学时扣分项" width="100">
            </el-table-column>
            <el-table-column prop="classHour" label="扣除学时" width="80">
            </el-table-column>
            <el-table-column label="操作" width="130">
              <template slot-scope="scope">
                <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showScoreEditDailog(scope.row)"></el-button>
                <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="delScoreById(scope.row.id)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="5"  class="span">
          <el-input placeholder="请输入课程名称" v-model="courseQueryStr" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"  @click="courseSearch"></el-button>
          </el-input>
          <el-button type="success" plain @click="showCourseAddDialog">添加课程</el-button>
          <el-table :data="tableCourse" stripe  size="middle" class="table">
            <el-table-column prop="name" label="课程" width="130">
            </el-table-column>
            <el-table-column  label="操作" width="130">
              <template slot-scope="scope">
                <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showCourseEditDailog(scope.row)"></el-button>
                <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="delCourseById(scope.row.id)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="6" class="span">
          <el-input placeholder="请输入教室门牌号" v-model="classRoomQueryStr" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"  @click="classRoomSearch"></el-button>
          </el-input>
          <el-button type="success" plain @click="showRoomAddDialog">教室资源</el-button>
          <el-table :data="t_classroom" stripe size="middle" class="table">
            <el-table-column prop="roomNumber" label="教室门牌号" width="100">
            </el-table-column>
            <el-table-column prop="roomCapacity" label="容量" width="50">
            </el-table-column>
            <el-table-column  label="操作" width="130">
              <template slot-scope="scope">
                <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showRoomEditDailog(scope.row)"></el-button>
                <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="delRoomById(scope.row.id)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>




      <!--      添加班级-->
      <el-dialog title="添加班级" :visible.sync="gradeAddDialog" @close="closeGradeAddDialog">
        <el-form :model="gradeAddForm"  ref="gradeAddForm">
          <el-form-item prop="type" label="班级名称" label-width="120px">
            <el-input v-model="gradeAddForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="type" label="教室" label-width="120px">
            <el-input v-model="gradeAddForm.roomName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="type" label="班级技术老师" label-width="120px">
            <el-select
                       v-model="gradeAddForm.teId" filterable placeholder="请选择班级技术老师" >
              <el-option
                v-for="item in options1"
                :key="item.id"
                :label="item.name"
                v-model="item.id">
              </el-option>
            </el-select>

          </el-form-item>
          <el-form-item prop="type" label="班级学业导师" label-width="120px">
            <el-select
                       v-model="gradeAddForm.tuId" filterable placeholder="请选择班级学业导师" >
              <el-option
                v-for="item in options2"
                :key="item.id"
                :label="item.name"
                v-model="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="type" label="课程" label-width="120px">
            <el-checkbox-group v-model="gradeAddForm.crId" @change="handleCheckedCoursesChange">
              <el-checkbox v-for="course in courseOptions" :label="course.id" :key="course.id">{{course.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="gradeAddDialog = false">取 消</el-button>
          <el-button type="primary" @click="addGrade">确 定</el-button>
        </div>

      </el-dialog>

      <!--修改班级-->
      <el-dialog title="修改班级" :visible.sync="gradeEditDialog" @close="closeGradeEditDialog">
        <el-form :model="gradeEditForm"  ref="gradeEditForm">
            <el-form-item prop="type" label="班级名称" label-width="120px">
              <el-input v-model="gradeEditForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="type" label="教室" label-width="120px">
              <el-input v-model="gradeEditForm.roomName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="type" label="班级技术老师" label-width="120px">
             <el-select
                         v-model="gradeEditForm.teId" filterable placeholder="请选择班级技术老师" >
                <el-option
                  v-for="item in options1"
                  :key="item.id"
                  :label="item.name"
                  v-model="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="type" label="班级学业导师" label-width="120px">
               <el-select
                         v-model="gradeEditForm.tuId" filterable placeholder="请选择班级技术老师" >
                <el-option
                  v-for="item in options2"
                  :key="item.id"
                  :label="item.name"
                  v-model="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          <el-form-item prop="type" label="课程" label-width="120px">
            <el-checkbox-group v-model="gradeEditForm.crId" @change="handleCheckedCoursesChange">
              <el-checkbox v-for="course in courseOptions" :label="course.name" :key="course.id" >{{course.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="gradeEditDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateGrade" >确 定</el-button>
        </div>

      </el-dialog>
<!--显示详情-->
      <el-dialog title="班级详情" :visible.sync="gradeDetailDialog" @close="closeGradeDetailDialog">
        <el-table :data="t_class" stripe  size="middle" class="table">
          <el-table-column prop="name" label="班级名称" width="100">
          </el-table-column>
          <el-table-column prop="roomName" label="教室" width="100">
          </el-table-column>
          <el-table-column prop="teaName" label="班级技术老师" width="120">
          </el-table-column>
          <el-table-column prop="tuName" label="班级学业导师" width="120">
          </el-table-column>
          <el-table-column prop="crId" label="已选课程" width="120">
        </el-table-column>
          <el-table-column label="操作" width="130">
            <template slot-scope="scope">
              <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showGradeEditDailog(scope.row)"></el-button>
              <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="delGradeById(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <div slot="footer" class="dialog-footer">
          <el-button @click="gradeDetailDialog = false">确 定</el-button>

        </div>

      </el-dialog>

<!--添加学时扣分项-->
      <el-dialog title="添加学时扣分项" :visible.sync="scoreAddDialog" @close="closeScoreAddDialog">
        <el-form :model="scoreAddForm"  ref="scoreAddForm">
          <el-form-item prop="score" label="学时扣分项" label-width="120px">
            <el-input v-model="scoreAddForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="score" label="扣分数目" label-width="120px">
            <el-input v-model="scoreAddForm.classHour" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="scoreAddDialog = false">取 消</el-button>
          <el-button type="primary" @click="addPeriod">确 定</el-button>
        </div>

      </el-dialog>

<!--      修改学分扣分项-->

      <el-dialog title="修改学时扣分项" :visible.sync="scoreEditDialog" @close="closeScoreEditDialog">
        <el-form :model="scoreEditForm"  ref="scoreEditForm">
          <el-form-item prop="id" label="id" label-width="120px" style="display: none;">
            <el-input v-model="scoreEditForm.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="score" label="学时扣分项" label-width="120px">
            <el-input v-model="scoreEditForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="score" label="扣分数目" label-width="120px">
            <el-input v-model="scoreEditForm.classHour" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="scoreEditDialog = false">取 消</el-button>
          <el-button type="primary" @click="updatePeriod">确 定</el-button>
        </div>

      </el-dialog>


<!--      添加课程-->

      <el-dialog title="添加课程" :visible.sync="courseAddDialog" @close="closeCourseAddDialog">
        <el-form :model="courseAddForm"  ref="courseAddForm">
          <el-form-item prop="courseAddForm" label="添加课程" label-width="120px">
            <el-input v-model="courseAddForm.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="courseAddDialog = false">取 消</el-button>
          <el-button type="primary" @click="addCourse" >确 定</el-button>
        </div>

      </el-dialog>

<!--      修改课程-->

      <el-dialog title="修改课程" :visible.sync="courseEditDialog" @close="closeCourseEditDialog">
        <el-form :model="courseEditForm"  ref="courseEditForm">
          <el-form-item prop="courseAddForm" label="id" label-width="120px" style="display: none;">
            <el-input v-model="courseEditForm.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="courseAddForm" label="课程名称" label-width="120px">
            <el-input v-model="courseEditForm.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="courseEditDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateCourse">确 定</el-button>
        </div>

      </el-dialog>
      <!--      添加教室资源-->
      <el-dialog title="添加教室" :visible.sync="roomAddDialog" @close="closeRoomAddDialog">
        <el-form :model="roomAddForm"  ref="roomAddForm">
          <el-form-item prop="type" label="教室门牌号" label-width="120px">
            <el-input v-model="roomAddForm.roomNumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="type" label="容量" label-width="120px">
            <el-input v-model="roomAddForm.roomCapacity" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="roomAddDialog = false">取 消</el-button>
          <el-button type="primary" @click="addroom" >确 定</el-button>
        </div>

      </el-dialog>
      <!--修改教室资源-->
      <el-dialog title="修改教室资源" :visible.sync="roomEditDialog" @close="closeRoomEditDialog">
        <el-form :model="roomEditForm"  ref="roomEditForm">
          <el-form-item prop="type" label="id" label-width="120px"  style="display: none">
            <el-input v-model="roomEditForm.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="type" label="教室号" label-width="120px">
            <el-input v-model="roomEditForm.roomNumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="type" label="容量" label-width="120px">
            <el-input v-model="roomEditForm.roomCapacity" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="roomEditDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateRoom">确 定</el-button>
        </div>

      </el-dialog>

    </div>
</template>

<script>
  export default {
    name: 'InfoManager',
    created(){
      this.getTableCourse()
      this.getTablePeriod()
      this.getTableClassroom()
      this.getClassInfo()
      this.getSelection1()
      this.getSelection2()
    },

    data() {
      return {



        courseQueryStr:'',
        periodQueryStr:'',
        classRoomQueryStr:'',
        queryStr:'',
        options1: [],
        options2: [],
        // checkedCourse:[],
        courseOptions:[],
        tableGrade: [

        ],
        tablePeriod: [

        ],
        tableCourse: [

        ],
        t_classroom: [

        ],
        t_class:[{
          name:'',
          roomName:'',
          tuName:'',
          teaName:'',
          crId:''
        }],
        // 教室资源添加
        roomAddDialog: false,
        roomAddForm: {
          roomNumber: '',
          roomCapacity:''
        },
        // 教室资源编辑
        roomEditDialog: false,
        roomEditForm: {
          id: -1,
          roomNumber: '',
          roomCapacity:''
        },
        //班级添加
        gradeAddDialog: false,
        gradeAddForm: {
          name:'',
          roomName:'',
          teId:'',
          tuId:'',
          crId:[]
        },

        // 班级编辑
        gradeEditDialog: false,
        gradeEditForm: {
          id: -1,
          name:'',
          roomName:'',
          tuId:'',
          teId:'',
          crId:''
        },

        //
        // 班级详情
        gradeDetailDialog:false,
        //学时扣分项添加
        scoreAddDialog: false,
        scoreAddForm: {
          name: '',
          classHour: ''
        },
        //修改学时扣分项
        scoreEditDialog: false,
        scoreEditForm: {
          id:-1,
          name: '',
          classHour: ''
        },
      //增加课程
        courseAddDialog: false,
        courseAddForm: {
          name:'',

        },
        courseEditDialog: false,
        courseEditForm: {
          id:-1,
          name:''
        },
      }

    },
    methods: {

      // 展示教室资源添加对话框
      showRoomAddDialog() {

        this.roomAddDialog = true
      },
      // 关闭对话框重置表单
      closeRoomAddDialog() {
        // console.log('对话框关闭了')
        this.$refs.roomAddForm.resetFields()
      },
      //删除教室资源
      async delRoomById(id) {
        // console.log(id)
        try {
          await this.$confirm('你确定要删除该教室吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          let res = await this.axios.delete(`/api/v1/admin/delete_classroom?id=${id}`)
          if (res.data.code == 0) {
            this.$message.success('恭喜你，删除成功了')
            // 重新渲染
            this.getTableClassroom()
          } else {
            this.$message.danger('删除 失败')
          }
        } catch (e) {
          this.$message.error('取消删除了')
        }
      },

      //修改教室资源
      // 展示编辑对话框
      showRoomEditDailog(curUser) {
        // console.log(curUser)
        // 先获取到当前 的数据
        // 数据交给 userEditForm 后，就会展示在编辑对话框中
        for (const key in this.roomEditForm) {
          this.roomEditForm[key] = curUser[key]

        }

        // 打开编辑对话框
        this.roomEditDialog = true
      },

      // 关闭编辑对话框
      closeRoomEditDialog() {
        this.$refs.roomEditForm.resetFields()
      },

      //添加班级
      showGradeAddDialog() {

        this.gradeAddDialog = true
      },
      // 关闭对话框重置表单
      closeGradeAddDialog() {
        // console.log('对话框关闭了')
        this.$refs.gradeAddForm.resetFields()
      },
      //删除班级
      async delGradeById(id) {
        try {
          await this.$confirm('你确定要删除该班级吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          let res = await this.axios.delete(`/api/v1/admin/delete_class?id=${id}`)
          if (res.data.code == 0) {
            this.$message.success('恭喜你，删除成功了')
            // 重新渲染
            this.gradeDetailDialog = false
            this.getClassInfo()
          } else {
            this.$message.danger('删除失败')
          }
        } catch (e) {
          this.$message.error('取消删除了')
        }
      },

      //编辑班级
      showGradeEditDailog(curUser) {
        // 先获取到当前 的数据
        this.gradeEditForm.teId=curUser.teaName
        this.gradeEditForm.tuId=curUser.tuName
        this.gradeEditForm.crId = (curUser.crId).split(',')
        this.gradeEditForm.roomName=curUser.roomName
        this.gradeEditForm.name=curUser.name
        this.gradeEditForm.id=curUser.id

        // 打开编辑对话框
        this.gradeEditDialog = true
      },

      // 关闭编辑对话框
      closeGradeEditDialog() {
        this.$refs.gradeEditForm.resetFields()
      },

      //班级详情
      showDetail(detail){
        this.t_class[0].name=detail.name
        this.t_class[0].roomName = detail.roomName
        this.t_class[0].teaName = detail.teaName
        this.t_class[0].tuName = detail.tuName
        this.t_class[0].id = detail.id
        this.t_class[0].crId = (detail.crId).join(',')
        this.gradeDetailDialog = true;
      },
      closeGradeDetailDialog(){
        this.gradeDetailDialog = false;

      },


      handleCheckedCoursesChange(value) {
        let checkedCount = value.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.courseOptions.length;
      },


    //  添加扣分项
    showScoreAddDialog() {

      this.scoreAddDialog = true
    },
    // 关闭对话框重置表单
    closeScoreAddDialog() {
      // console.log('对话框关闭了')
      this.$refs.scoreAddForm.resetFields()
    },
    //删除扣分项
    async delScoreById(id) {
      // console.log(id)
      try {
        await this.$confirm('你确定要删除该项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        let res = await this.axios.delete(`/api/v1/admin/delete_reduceHour?id=${id}`)
        if (res.data.code == 0) {

          this.$message.success('恭喜你，删除成功了')
          // 重新渲染
          this.getTablePeriod()
        } else {
          this.$message.danger('删除失败')
        }
      } catch (e) {
        this.$message.error('取消删除了')
      }
    },
      //修改扣分项
      // 展示编辑对话框
      showScoreEditDailog(curUser) {
        // console.log(curUser)
        // 先获取到当前 的数据
        // 数据交给 userEditForm 后，就会展示在编辑对话框中
        for (const key in this.scoreEditForm) {
          this.scoreEditForm[key] = curUser[key]

        }

        // 打开编辑对话框
        this.scoreEditDialog = true
      },

      // 关闭编辑对话框
      closeScoreEditDialog() {
        this.$refs.typeEditForm.resetFields()
      },



      //添加课程
      showCourseAddDialog() {

        this.courseAddDialog = true
      },
      // 关闭对话框重置表单
      closeCourseAddDialog() {
        // console.log('对话框关闭了')
        this.$refs.courseAddForm.resetFields()
      },
      //删除课程
      async delCourseById(id) {
        // console.log(id)
        try {
          await this.$confirm('你确定要删除该课程吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          // 发送axios请求删除课程
          let res = await this.axios.delete(`/api/v1/admin/delete_course?id=${id}`)
          if (res.data.code == 0) {
            this.$message.success('恭喜你，删除成功了')
            // 重新渲染
            this.getTableCourse()
          } else {
            this.$message.danger('删除失败')
          }
        } catch (e) {
          this.$message.error('取消删除了')
        }
      },


      //修改课程
      // 展示编辑对话框
      showCourseEditDailog(curUser) {
        // console.log(curUser)
        // 先获取到当前 的数据
        // 数据交给 userEditForm 后，就会展示在编辑对话框中
        for (const key in this.courseEditForm) {
          this.courseEditForm[key] = curUser[key]

        }

        // 打开编辑对话框
        this.courseEditDialog = true
      },

      // 关闭编辑对话框
      closeCourseEditDialog() {
        this.$refs.courseEditForm.resetFields()
      },



      //展示课程信息

      async getTableCourse() {
        let res = await this.axios({
          url: '/api/v1/admin/select_course_list',
          method: 'get',
          params: {
            key:this.courseQueryStr,
          }
        })
        let {status} = res
        let {data} = res.data
        if (status == 200) {
          this.tableCourse = data
          this.courseOptions = data
        }
      },

      courseSearch() {
        this.getTableCourse()
      },
      //添加课程信息
      addCourse(){
        this.$refs.courseAddForm.validate(async valid => {
          if (valid) {
            // 发送ajax请求
            let res = await this.axios.post(`/api/v1/admin/insert_course`, this.courseAddForm)
            let { code } = res.data
            if (code === 0) {
              this.$message.success('恭喜你，添加成功了')
              // 清空表单的内容
              this.courseAddForm.name = ''
              // 关闭模态框
              this.courseAddDialog = false
              // 重新渲染
              // 求最大的页码
              this.total++
              this.current = Math.ceil(this.total / this.pageSize)
              this.getTableCourse()
            } else {
              this.$message.error('添加失败了')
            }
          } else {
            return false
          }
        })
      },
      //修改课程信息
      updateCourse(){

        this.$refs.courseEditForm.validate(async valid => {
          if (valid) {
            // 发送ajax请求

            let res = await this.axios.put(`/api/v1/admin/update_course`, {
              id:this.courseEditForm.id,
              name:this.courseEditForm.name
            })
            let { code } = res.data
            if (code === 0) {
              this.courseEditDialog = false
              this.$refs.courseEditForm.resetFields()
              this.getTableCourse()
              this.$message.success('恭喜你，修改成功了')
            } else {
              this.$message.error('很遗憾，修改失败了')
            }
          } else {
            return false
          }
        })
      },

      //展示扣分详情信息
      async getTablePeriod() {
        let res = await this.axios({
          url: '/api/v1/admin/select_reduceHour_list',
          method: 'get',
          params: {
            key:this.periodQueryStr,
          }
        })
        // console.log(res)
        let {status} = res
        let {data} = res.data

        if (status == 200) {
          this.tablePeriod = data
        }
      },
      periodSearch() {
        this.getTablePeriod()
      },
      //添加新扣分项
      addPeriod(){
        this.$refs.scoreAddForm.validate(async valid => {
          if (valid) {
            // 发送ajax请求
            let res = await this.axios.post(`/api/v1/admin/insert_reduceHour`, this.scoreAddForm)
            let { code } = res.data
            if (code === 0) {
              this.$message.success('恭喜你，添加成功了')
              // 清空表单的内容
              this.scoreAddForm.name = this.scoreAddForm.classHour = ''
              // 关闭模态框
              this.scoreAddDialog = false
              // 重新渲染
              // 求最大的页码
              this.getTablePeriod()
            } else {
              this.$message.error('添加失败了')
            }
          } else {
            return false
          }
        })
      },
      //修改扣分项
      updatePeriod(){

        this.$refs.scoreEditForm.validate(async valid => {
          if (valid) {
            // 发送ajax请求

            let res = await this.axios.put(`/api/v1/admin/update_reduceHour`, {
              id:this.scoreEditForm.id,
              name:this.scoreEditForm.name,
              classHour:this.scoreEditForm.classHour
            })
            let { code } = res.data
            if (code === 0) {
              this.scoreEditDialog = false
              this.$refs.scoreEditForm.resetFields()
              this.getTablePeriod()
              this.$message.success('恭喜你，修改成功了')
            } else {
              this.$message.error('很遗憾，修改失败了')
            }
          } else {
            return false
          }
        })
      },

      //展示教室详情
      async getTableClassroom() {
        let res = await this.axios({
          url: '/api/v1/admin/select_classroom_list',
          method: 'get',
          params: {
            key:this.classRoomQueryStr,
          }
        })
        // console.log(res)
        let {status} = res
        let {data} = res.data

        if (status == 200) {
          this.t_classroom = data
        }
      },
      classRoomSearch() {
        this.getTableClassroom()
      },
      //添加教室
      addroom(){
        this.$refs.roomAddForm.validate(async valid => {
          if (valid) {
            // 发送ajax请求
            let res = await this.axios.post(`/api/v1/admin/insert_classroom`, this.roomAddForm)
            let { code } = res.data
            if (code === 0) {
              this.$message.success('恭喜你，添加成功了')
              // 清空表单的内容
              this.roomAddForm.roomNumber = this.roomAddForm.roomCapacity = ''
              // 关闭模态框
              this.roomAddDialog = false
              // 重新渲染
              // 求最大的页码
              this.getTableClassroom()
            } else {
              this.$message.error('添加失败了')
            }
          } else {
            return false
          }
        })
      },
      //修改教室
      updateRoom(){

        this.$refs.gradeEditForm.validate(async valid => {
          if (valid) {
            // 发送ajax请求

            let res = await this.axios.put(`/api/v1/admin/update_class`, {
              id:this.gradeEditForm.id,
              name:this.gradeEditForm.name,
              roomName:this.gradeEditForm.roomName,
              tuId:this.gradeEditForm.tuId,
              teId:this.gradeEditForm.teId
            })
            let { code } = res.data
            if (code === 0) {
              this.roomEditDialog = false
              this.$refs.roomEditForm.resetFields()
              this.getTableClassroom()
              this.$message.success('恭喜你，修改成功了')
            } else {
              this.$message.error('很遗憾，修改失败了')
            }
          } else {
            return false
          }
        })
      },


      //展示班级信息
      async getClassInfo() {
        let res = await this.axios({
          url: '/api/v1/admin/select_class_list',
          method: 'get',
          params: {
            key:this.queryStr,
          }
        })
        console.log(res)
        let {status} = res
        let {data} = res.data

        if (status == 200) {
          this.tableGrade = data
          this.t_class.course = this.checkedCourse
        }
      },
      search(){
        this.getClassInfo()
      },

      addGrade(){
        this.$refs.gradeAddForm.validate(async valid => {
          if (valid) {
            // 发送ajax请求
            let res = await this.axios.post(`/api/v1/admin/insert_class`, this.gradeAddForm)
            let { code } = res.data
            if (code === 0) {
              this.$message.success('恭喜你，添加成功了')
              // 清空表单的内容
              this.gradeAddForm.name = this.gradeAddForm.roomName = this.gradeAddForm.teId = this.gradeAddForm.tuId=this.gradeAddForm.crId =''
              // 关闭模态框
              this.gradeAddDialog = false
              // 重新渲染
              this.getClassInfo()
            } else {
              this.$message.error('添加失败了')
            }
          } else {
            return false
          }
        })
      },
      updateGrade(){
        this.$refs.gradeEditForm.validate(async valid => {
          if (valid) {
            // 发送ajax请求

            let res = await this.axios.put(`/api/v1/admin/update_class`, {
              id:this.gradeEditForm.id,
              name:this.gradeEditForm.name,
              roomName:this.gradeEditForm.roomName,
              tuId:this.gradeEditForm.tuId,
              teId:this.gradeEditForm.teId,
              crId:this.gradeEditForm.crId
            })
            let { code } = res.data
            if (code === 0) {
              this.gradeEditDialog = false
              this.$refs.gradeEditForm.resetFields()
              this.getClassInfo()
              this.$message.success('恭喜你，修改成功了')
            } else {
              this.$message.error('很遗憾，修改失败了')
            }
          } else {
            return false
          }
        })
      },

      async getSelection1() {
        let res = await this.axios({
          url: 'api/v1/admin/select_technicalTeacher_all',
          method: 'get',

        })

        let {status} = res
        let {data} = res.data

        if (status == 200) {
          this.options1 = data
        }
      },


      async getSelection2() {
        let res = await this.axios({
          url: 'api/v1/admin/select_tutor_all',
          method: 'get',

        })
        console.log(res)
        let {status} = res
        let {data} = res.data

        if (status == 200) {
          this.options2 = data
        }
      },
    },


  }
</script>

<style scoped lang="less">
.content{
  margin-top: 15px;
}
  .span{
    margin-right: 10px;
    &&:last-child{
      margin-right: 0;
    }
  }
  .table{
    margin-top: 15px;
  }

</style>
