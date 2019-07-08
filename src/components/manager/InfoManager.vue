<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>管理员</el-breadcrumb-item>
        <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row class="content">
        <el-col :span="5"  class="span">
          <el-button type="success" plain @click="showGradeAddDialog">添加班级</el-button>
          <el-table :data="tableGrade" stripe  size="middle" class="table">
            <el-table-column prop="grade" label="班级" width="130">
            </el-table-column>

            <el-table-column  label="查看详情" width="100">
            <template slot-scope="scope">
              <el-button type="primary" plain size="mini"  @click="showDetail(scope.row)">详情</el-button>
            </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="6"  class="span">
          <el-button type="success" plain @click="showScoreAddDialog">添加学时扣分项</el-button>
          <el-table :data="tablePeriod" stripe  size="middle" class="table">
            <el-table-column prop="item" label="学时扣分项" width="100">
            </el-table-column>
            <el-table-column prop="score" label="扣除学时" width="80">
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
          <el-button type="success" plain @click="showCourseAddDialog">添加课程</el-button>
          <el-table :data="tableCourse" stripe  size="middle" class="table">
            <el-table-column prop="course" label="课程" width="130">
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
          <el-button type="success" plain @click="showRoomAddDialog">教室资源</el-button>
          <el-table :data="t_classroom" stripe size="middle" class="table">
            <el-table-column prop="Room_number" label="教室门牌号" width="100">
            </el-table-column>
            <el-table-column prop="Room_capacity" label="容量" width="50">
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
            <el-input v-model="gradeAddForm.grade" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="type" label="教室" label-width="120px">
            <el-input v-model="gradeAddForm.Room_id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="type" label="班级技术老师" label-width="120px">
            <el-input v-model="gradeAddForm.te_id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="type" label="班级学业导师" label-width="120px">
            <el-input v-model="gradeAddForm.tu_id" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="gradeAddDialog = false">取 消</el-button>
          <el-button type="primary" >确 定</el-button>
        </div>

      </el-dialog>

      <!--修改班级-->
      <el-dialog title="修改班级" :visible.sync="gradeEditDialog" @close="closeGradeEditDialog">
        <el-form :model="gradeEditForm"  ref="gradeEditForm">
            <el-form-item prop="type" label="班级名称" label-width="120px">
              <el-input v-model="gradeEditForm.Name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="type" label="教室" label-width="120px">
              <el-input v-model="gradeEditForm.Room_id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="type" label="班级技术老师" label-width="120px">
              <el-input v-model="gradeEditForm.te_id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="type" label="班级学业导师" label-width="120px">
              <el-input v-model="gradeEditForm.tu_id" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="gradeEditDialog = false">取 消</el-button>
          <el-button type="primary" >确 定</el-button>
        </div>

      </el-dialog>
<!--显示详情-->
      <el-dialog title="班级详情" :visible.sync="gradeDetailDialog" @close="closeGradeDetailDialog">



        <el-table :data="t_class" stripe  size="middle" class="table">
          <el-table-column prop="Name" label="班级名称" width="100">
          </el-table-column>
          <el-table-column prop="Room_id" label="教室" width="100">
          </el-table-column>
          <el-table-column prop="te_id" label="班级技术老师" width="120">
          </el-table-column>
          <el-table-column prop="tu_id" label="班级学业导师" width="120">
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
            <el-input v-model="scoreAddForm.score" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="score" label="扣分数目" label-width="120px">
            <el-input v-model="scoreAddForm.num" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="scoreAddDialog = false">取 消</el-button>
          <el-button type="primary" >确 定</el-button>
        </div>

      </el-dialog>

<!--      修改学分扣分项-->

      <el-dialog title="修改学时扣分项" :visible.sync="scoreEditDialog" @close="closeScoreEditDialog">
        <el-form :model="scoreEditForm"  ref="scoreEditForm">
          <el-form-item prop="score" label="学时扣分项" label-width="120px">
            <el-input v-model="scoreEditForm.item" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="score" label="扣分数目" label-width="120px">
            <el-input v-model="scoreEditForm.score" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="scoreEditDialog = false">取 消</el-button>
          <el-button type="primary" >确 定</el-button>
        </div>

      </el-dialog>


<!--      添加课程-->

      <el-dialog title="添加课程" :visible.sync="courseAddDialog" @close="closeCourseAddDialog">
        <el-form :model="courseAddForm"  ref="courseAddForm">
          <el-form-item prop="courseAddForm" label="添加课程" label-width="120px">
            <el-input v-model="courseAddForm.score" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="courseAddDialog = false">取 消</el-button>
          <el-button type="primary" >确 定</el-button>
        </div>

      </el-dialog>

<!--      修改课程-->

      <el-dialog title="修改课程" :visible.sync="courseEditDialog" @close="closeCourseEditDialog">
        <el-form :model="courseEditForm"  ref="courseEditForm">
          <el-form-item prop="courseAddForm" label="学时扣分项" label-width="120px">
            <el-input v-model="courseEditForm.course" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="courseEditDialog = false">取 消</el-button>
          <el-button type="primary" >确 定</el-button>
        </div>

      </el-dialog>
      <!--      添加教室资源-->
      <el-dialog title="添加教室" :visible.sync="roomAddDialog" @close="closeRoomAddDialog">
        <el-form :model="roomAddForm"  ref="typeAddForm">
          <el-form-item prop="type" label="教室门牌号" label-width="120px">
            <el-input v-model="roomAddForm.gradeType" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="type" label="容量" label-width="120px">
            <el-input v-model="roomAddForm.gradeType" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="roomAddDialog = false">取 消</el-button>
          <el-button type="primary" >确 定</el-button>
        </div>

      </el-dialog>
      <!--修改教室资源-->
      <el-dialog title="修改教室资源" :visible.sync="roomEditDialog" @close="closeRoomEditDialog">
        <el-form :model="roomEditForm"  ref="roomAddForm">
          <el-form-item prop="type" label="教室号" label-width="120px">
            <el-input v-model="roomEditForm.Room_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="type" label="容量" label-width="120px">
            <el-input v-model="roomEditForm.Room_capacity" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="roomEditDialog = false">取 消</el-button>
          <el-button type="primary" >确 定</el-button>
        </div>

      </el-dialog>

    </div>
</template>

<script>
  export default {
    name: 'InfoManager',
    data() {
      return {

        tableGrade: [
          {grade: "基础1班"},
          {grade: "基础2班"},
          {grade: "骨干1班"},
          {grade: "卓越1班"},
          {grade: "实施1班"},
          {grade: "考研考公班"}
        ],
        tablePeriod: [
          {item: '请假一天', score: '5'},
          {item: '请假上午', score: '5'},
          {item: '请假下午', score: '5'},
          {item: '请假晚自习', score: '5'},
          {item: '请病假', score: '5'},
          {item: '旷课', score: '5'},
          {item: '早退', score: '5'},
        ],
        tableCourse: [
          {course: 'Java基础'},
          {course: '数据库'},
          {course: 'JDBC'},
          {course: 'Java基础'},
          {course: 'Java基础'},
          {course: 'Java基础'},
          {course: 'Java基础'},
          {course: 'Java基础'},
          {course: 'Java基础'},
          {course: 'Java基础'},

        ],
        t_classroom: [
          {Room_number: "310",Room_capacity:'80'},
          {Room_number: "310",Room_capacity:'80'},
          {Room_number: "310",Room_capacity:'80'},
          {Room_number: "310",Room_capacity:'80'},
          {Room_number: "310",Room_capacity:'80'},
          {Room_number: "310",Room_capacity:'80'},
          {Room_number: "310",Room_capacity:'80'},
          {Room_number: "310",Room_capacity:'80'},
          {Room_number: "310",Room_capacity:'80'}
        ],
        t_class:[
          {Name:"基础一班",Room_id:'310',te_id:"赵曰侠",tu_id:'刘丹丹'},
        ],
        // 教室资源添加
        roomAddDialog: false,
        roomAddForm: {
          Room_number: '',
          Room_capacity:''
        },
        // 教室资源编辑
        roomEditDialog: false,
        roomEditForm: {
          num: -1,
          Room_number: '',
          Room_capacity:''
        },
        //班级添加
        gradeAddDialog: false,
        gradeAddForm: {
          Name:'',
          Room_id:'',
          te_id:'',
          tu_id:''
        },

        // 班级编辑
        gradeEditDialog: false,
        gradeEditForm: {
          num: -1,
          Name:'',
          Room_id:'',
          te_id:'',
          tu_id:''
        },

        //
        // 班级详情
        gradeDetailDialog:false,
        //学时扣分项添加
        scoreAddDialog: false,
        scoreAddForm: {
          item: '',
          score: ''
        },
        //修改学时扣分项
        scoreEditDialog: false,
        scoreEditForm: {
          item: '',
          score: ''
        },
      //增加课程
        courseAddDialog: false,
        courseAddForm: {
          course:''
        },
        courseEditDialog: false,
        courseEditForm: {
          course:''
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
      delRoomById(id) {
        // console.log(id)
        this.$confirm('确认删除该班型吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          room: 'warning'
        })
      },

      //修改教室资源
      // 展示编辑对话框
      showRoomEditDailog(curUser) {
        // console.log(curUser)
        // 先获取到当前用户的数据
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
      delGradeById(id) {
        // console.log(id)
        this.$confirm('确认删除该班级吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      },

      //编辑班级
      showGradeEditDailog(curUser) {
        // console.log(curUser)
        // 先获取到当前用户的数据
        // 数据交给 userEditForm 后，就会展示在编辑对话框中
        for (const key in this.gradeEditForm) {
          this.gradeEditForm[key] = curUser[key]

        }

        // 打开编辑对话框
        this.gradeEditDialog = true
      },

      // 关闭编辑对话框
      closeGradeEditDialog() {
        this.$refs.gradeEditForm.resetFields()
      },

      //班级详情
      showDetail(){
        this.gradeDetailDialog = true;
      },
      closeGradeDetailDialog(){
        this.gradeDetailDialog = false;

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
    delScoreById(id) {
      // console.log(id)
      this.$confirm('确认删除该项目吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    },
      //修改扣分项
      // 展示编辑对话框
      showScoreEditDailog(curUser) {
        // console.log(curUser)
        // 先获取到当前用户的数据
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
      //删除扣分项
      delCourseById(id) {
        // console.log(id)
        this.$confirm('确认删除该项目吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      },


      //修改课程
      // 展示编辑对话框
      showCourseEditDailog(curUser) {
        // console.log(curUser)
        // 先获取到当前用户的数据
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
