<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>管理员</el-breadcrumb-item>
        <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row class="content">

        <el-col :span="5" class="span">
          <el-button type="success" plain @click="showTypeAddDialog">添加班型</el-button>
          <el-table :data="tableGradeType" stripe size="middle" class="table">
            <el-table-column prop="type" label="班型" width="130">
            </el-table-column>
            <el-table-column  label="操作" width="130">
              <template slot-scope="scope">
                <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showTypeEditDailog(scope.row)"></el-button>
                <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="deltypeById(scope.row.id)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="5"  class="span">
          <el-button type="success" plain @click="showGradeAddDialog">添加班级</el-button>
          <el-table :data="tableGrade" stripe  size="middle" class="table">
            <el-table-column prop="grade" label="班级" width="130">
            </el-table-column>
            <el-table-column  label="操作" width="130">
              <template slot-scope="scope">
                <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showGradeEditDailog(scope.row)"></el-button>
                <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="delGradeById(scope.row.id)"></el-button>
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

      </el-row>


<!--      添加班型-->
      <el-dialog title="添加班型" :visible.sync="typeAddDialog" @close="closeTypeAddDialog">
        <el-form :model="typeAddForm"  ref="typeAddForm">
          <el-form-item prop="type" label="班型" label-width="120px">
            <el-input v-model="typeAddForm.gradeType" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="typeAddDialog = false">取 消</el-button>
          <el-button type="primary" >确 定</el-button>
        </div>

      </el-dialog>
<!--修改班型-->
      <el-dialog title="修改班型" :visible.sync="typeEditDialog" @close="closeTypeEditDialog">
        <el-form :model="typeEditForm"  ref="typeAddForm">
          <el-form-item prop="type" label="班型" label-width="120px">
            <el-input v-model="typeEditForm.type" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="typeEditDialog = false">取 消</el-button>
            <el-button type="primary" >确 定</el-button>
          </div>

      </el-dialog>


      <!--      添加班级-->
      <el-dialog title="添加班级" :visible.sync="gradeAddDialog" @close="closeGradeAddDialog">
        <el-form :model="gradeAddForm"  ref="typeAddForm">
          <el-form-item prop="type" label="班级" label-width="120px">
            <el-input v-model="gradeAddForm.grade" autocomplete="off"></el-input>
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
          <el-form-item prop="grade" label="班级" label-width="120px">
            <el-input v-model="gradeEditForm.grade" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="gradeEditDialog = false">取 消</el-button>
          <el-button type="primary" >确 定</el-button>
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
    </div>
</template>

<script>
  export default {
    name: 'InfoManager',
    data() {
      return {
        tableGradeType: [
          {type: "基础班"},
          {type: "骨干班"},
          {type: "卓越班"},
          {type: "实施班"},
          {type: "考研考公班"}
        ],
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
        // 班型添加
        typeAddDialog: false,
        typeAddForm: {
          gradeType: ''
        },
        // 班型编辑
        typeEditDialog: false,
        typeEditForm: {
          num: -1,
          type: ''
        },
        //班级添加
        gradeAddDialog: false,
        gradeAddForm: {
          grade: ''
        },

        // 班级编辑
        gradeEditDialog: false,
        gradeEditForm: {
          num: -1,
          grade: ''
        },

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
      // 展示班型添加对话框
      showTypeAddDialog() {

        this.typeAddDialog = true
      },
      // 关闭对话框重置表单
      closeTypeAddDialog() {
        // console.log('对话框关闭了')
        this.$refs.typeAddForm.resetFields()
      },
      //删除班型
      deltypeById(id) {
        // console.log(id)
        this.$confirm('确认删除该班型吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      },

      //修改班型
      // 展示编辑对话框
      showTypeEditDailog(curUser) {
        // console.log(curUser)
        // 先获取到当前用户的数据
        // 数据交给 userEditForm 后，就会展示在编辑对话框中
        for (const key in this.typeEditForm) {
          this.typeEditForm[key] = curUser[key]

        }

        // 打开编辑对话框
        this.typeEditDialog = true
      },

      // 关闭编辑对话框
      closeTypeEditDialog() {
        this.$refs.typeEditForm.resetFields()
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

      // 关闭用户编辑对话框
      closeGradeEditDialog() {
        this.$refs.gradeEditForm.resetFields()
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
    margin-right: 20px;
    &&:last-child{
      margin-right: 0;
    }
  }
  .table{
    margin-top: 15px;
  }

</style>
