<template>
  <div class="wrapper">
    <el-form ref="form" :model="formInline" label-width="140px" :rules="rules">
      <el-form-item label="教师名称：">
        <el-input
          v-model="formInline.name"
          placeholder="请输入教师名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="职称：">
        <el-input v-model="formInline.name" placeholder="请输入职称"></el-input>
      </el-form-item>
      <el-form-item label="聘用形式：">
        <el-select v-model="formInline.teacherId" placeholder="请选择聘用形式">
          <el-option
            v-for="item in courseList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学期教学工作量：">
        <el-input
          v-model="formInline.name"
          placeholder="请输入教师名称"
        ></el-input>
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
        telephone: [
          { required: true, message: "请输入收货手机号", trigger: "blur" },
        ],
        address: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        consignee: [{ required: true, message: "请输入昵称", trigger: "blur" }],
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
