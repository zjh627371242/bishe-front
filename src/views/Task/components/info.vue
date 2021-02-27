<template>
  <div class="wrapper">
    <el-form ref="form" :model="formInline" label-width="120px" :rules="rules">
      <el-form-item label="教师名称：">
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
      <el-form-item label="学年学期：">
        <el-row>
          <el-col :span="12">
            <el-date-picker
              class="date"
              v-model="formInline.couse"
              type="year"
              placeholder="选择学年"
            >
            </el-date-picker>
          </el-col>
          <el-col :span="12">
            <el-select v-model="formInline.teacherId" placeholder="请选择学期">
              <el-option label="一" value="1">第一学期 </el-option>
              <el-option label="二" value="2">第二学期 </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="课程名称：">
        <el-select v-model="formInline.teacherId" placeholder="请选择课程">
          <el-option
            v-for="item in courseList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="授课班级">
        <el-input
          v-model="formInline.couse"
          placeholder="请输入授课班级"
        ></el-input>
      </el-form-item>
      <el-form-item label="班级类型">
        <el-select v-model="formInline.teacherId" placeholder="请选择班级类型">
          <el-option label="开新班" value="newClass">开新班 </el-option>
          <el-option label="重复班" value="repeatClass">重复班 </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教学语言">
        <el-select v-model="formInline.teacherId" placeholder="请选择教学语言">
          <el-option label="中文" value="china">中文 </el-option>
          <el-option label="英语" value="english">英语 </el-option>
          <el-option label="双语" value="bilingual">双语 </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级人数">
        <el-input
          v-model="formInline.couse"
          placeholder="请输入班级人数"
        ></el-input>
      </el-form-item>
      <el-form-item label="课程计划学时数">
        <el-input
          v-model="formInline.couse"
          placeholder="请输入计划学时数"
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
