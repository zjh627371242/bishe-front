<template>
  <div class="wrapper">
    <el-form ref="form" :model="formInline" label-width="130px" :rules="rules">
      <el-form-item label="教师名称：" prop="teacherId">
        <el-select v-model="formInline.teacherId" placeholder="请选择教师名称">
          <el-option
            v-for="item in teacherList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学年学期：" prop="schoolYear">
        <el-row>
          <el-col :span="12">
            <el-date-picker
              class="date"
              v-model="formInline.schoolYear"
              type="year"
              placeholder="选择学年"
              format="yyyy"
              value-format="yyyy"
            >
              >
            </el-date-picker>
          </el-col>
          <el-col :span="12">
            <el-select v-model="formInline.schoolTerm" placeholder="请选择学期">
              <el-option label="第一学期" value="1">第一学期 </el-option>
              <el-option label="第二学期" value="2">第二学期 </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="课程名称：" prop="courseId">
        <el-select v-model="formInline.courseId" placeholder="请选择课程">
          <el-option
            v-for="item in courseList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="授课班级" prop="classroom">
        <el-input
          v-model="formInline.classroom"
          placeholder="请输入授课班级"
        ></el-input>
      </el-form-item>
      <el-form-item label="班级类型" prop="classType">
        <el-select v-model="formInline.classType" placeholder="请选择班级类型">
          <el-option label="开新班" value="newClass">开新班 </el-option>
          <el-option label="重复班" value="repeatClass">重复班 </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教学语言" prop="language">
        <el-select v-model="formInline.language" placeholder="请选择教学语言">
          <el-option label="中文" value="china">中文 </el-option>
          <el-option label="英语" value="english">英语 </el-option>
          <el-option label="双语" value="bilingual">双语 </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级人数" prop="studentCount">
        <el-input
          v-model="formInline.studentCount"
          placeholder="请输入班级人数"
        ></el-input>
      </el-form-item>
      <el-form-item label="课程计划学时数" prop="classHours">
        <el-input
          v-model="formInline.classHours"
          placeholder="请输入计划学时数"
        ></el-input>
      </el-form-item>
    </el-form>

    <div class="btn-area">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="onSubmit('form', false)" v-if="info.id"
        >保存</el-button
      >
      <el-button type="primary" @click="onSubmit('form', true)" v-else
        >新增</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      rules: {
        teacherId: [
          { required: true, message: "请选择选择教师", trigger: "blur" },
        ],
        classHours: [
          { required: true, message: "请输入学时数", trigger: "blur" },
        ],
        studentCount: [
          { required: true, message: "请输入班级人数", trigger: "blur" },
        ],
        language: [{ required: true, message: "请选择教学语言", trigger: "blur" }],
        classType: [{ required: true, message: "请选择班级类型", trigger: "blur" }],
        classroom: [{ required: true, message: "请输入授课班级", trigger: "blur" }],
        schoolYear: [
          { required: true, message: "请选择学期学年", trigger: "blur" },
        ],
        courseId: [{ required: true, message: "请选择课程", trigger: "blur" }],
      },
      formInline: {},
      teacherList: [],
      courseList: [],
    };
  },
  created() {
    this.loadTeacher();
    this.loadCourse();
    if (this.info.id) {
      this.loadData();
    }
  },
  methods: {
    async loadData() {
      const res = await this.$api.task.getOne({
        id: this.info.id,
      });
      if (res.code === 1) {
        this.formInline = res.data;
        this.formInline.schoolTerm = res.data.schoolTerm.toString();
        this.formInline.schoolYear = res.data.schoolYear.toString();
      } else this.$message.error(res.message);
    },
    async loadTeacher() {
      const res = await this.$api.teacher.getTeacherList();
      if (res.code === 1) {
        this.teacherList = res.data;
      }
    },
    async loadCourse() {
      const res = await this.$api.course.getCourseList();
      if (res.code === 1) {
        this.courseList = res.data;
      }
    },
    onSubmit(formName, isAdd) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("handleSubmit", this.formInline, isAdd);
        }
      });
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  /deep/.el-input,
  /deep/.el-select {
    width: 100%;
  }
}
</style>
