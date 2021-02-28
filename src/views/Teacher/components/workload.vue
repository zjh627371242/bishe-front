<template>
  <div class="wrapper">
    <el-form
      ref="form"
      :model="formInline"
      class="demo-form-inline"
      :rules="rules"
    >
      <el-form-item label="学年：" prop="schoolYear">
        <el-date-picker
          v-model="formInline.schoolYear"
          type="year"
          placeholder="选择年"
          format="yyyy"
          value-format="yyyy"
        >
        </el-date-picker>
        <el-form-item label="学期：" prop="schoolTerm">
          <el-select v-model="formInline.schoolTerm" placeholder="请选择">
            <el-option label="第一学期" value="1"> 第一学期</el-option>
            <el-option label="第二学期" value="2"> 第二学期</el-option>
          </el-select>
        </el-form-item>
      </el-form-item>
      <el-form-item label="理论教学总工作量：" prop="theoreticalWordloadTotal">
        <el-input
          v-model="formInline.theoreticalWordloadTotal"
          placeholder="请输入理论教学总工作量："
        ></el-input>
      </el-form-item>
      <el-form-item label="实践教学总工作量：" prop="practicalWordloadTotal">
        <el-input
          v-model="formInline.practicalWordloadTotal"
          placeholder="请输入实践教学总工作量："
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-area">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlePush('form')">添加</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {},
      rules: {
        schoolYear: [
          { required: true, message: "请选择学年", trigger: "blur" },
        ],
        schoolTerm: [
          { required: true, message: "请选择学期", trigger: "blur" },
        ],
        theoreticalWordloadTotal: [
          {
            required: true,
            message: "请输入理论课教学工作量",
            trigger: "blur",
          },
        ],
        practicalWordloadTotal: [
          { required: true, message: "请输入实践教学工作量", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handlePush(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("handlePush", this.formInline);
        }
      });
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
  },
};
</script>

<style lang="less" scoped></style>
