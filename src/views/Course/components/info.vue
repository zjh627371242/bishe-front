<template>
  <div class="wrapper">
    <el-form ref="form" :model="formInline" label-width="100px" :rules="rules">
      <el-form-item label="课程名称：" prop="name">
        <el-input
          v-model="formInline.name"
          placeholder="请输入课程名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="课程类别：" prop="category">
        <el-select v-model="formInline.category" placeholder="请选择课程类别">
          <el-option label="理论课" value="theory"> </el-option>
          <el-option label="实践课" value="practice"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程类型：" prop="type">
        <el-select v-model="formInline.type" placeholder="请选择课程类型">
          <el-option label="公共必修课" value="compulsory"> </el-option>
          <el-option label="公共选修课" value="elective"> </el-option>
          <el-option label="专业课" value="major"> </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div class="btn-area">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="onSubmit('form')">保存</el-button>
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
        name: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择课程类型", trigger: "blur" }],
        category: [
          { required: true, message: "请选择课程类别 ", trigger: "blur" },
        ],
      },
      formInline: {},
      teacherList: [],
      courseList: [],
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("handleSubmit", this.formInline);
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
