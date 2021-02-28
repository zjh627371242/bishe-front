<template>
  <div class="wrapper">
    <el-form ref="form" :model="formInline" label-width="140px" :rules="rules">
      <el-form-item label="教师名称:" prop="name">
        <el-input
          v-model="formInline.name"
          placeholder="请输入教师名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="职称:" prop="positionalTitle">
        <el-input
          v-model="formInline.positionalTitle"
          placeholder="请输入职称"
        ></el-input>
      </el-form-item>
      <el-form-item label="聘用形式:" prop="type">
        <el-select v-model="formInline.type" placeholder="请选择聘用形式">
          <el-option label="在编" value="editing">在编</el-option>
          <el-option label="外聘" value="engaged">外聘</el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="学期教学工作量:"
        style="text-align:left"
        prop="workloadTotalList"
      >
        <el-button type="primary" @click="openDialog">新增工作量</el-button>
      </el-form-item>
      <el-table :data="workloadTotalList" style="width: 100%" border="">
        <el-table-column
          prop="schoolTerm"
          label="学期"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="schoolYear"
          label="学年"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="theoreticalWordloadTotal"
          label="理论教学总工作量"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="practicalWordloadTotal"
          label="实践教学总工作量"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="danger" plain @click="handleDelete(scope)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
    <el-dialog
      width="50%"
      top="50px"
      :title="title"
      :show-close="false"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      append-to-body
    >
      <WorkLoad @handlePush="handlePush" @handleCancel="closeDialog" />
    </el-dialog>
  </div>
</template>

<script>
import DialogMixin from "@/mixins/dialogMixin";
import WorkLoad from "./workload";

export default {
  mixins: [DialogMixin],
  components: { WorkLoad },
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    const workloadTotalValidator = (rule, value, callback) => {
      if (this.workloadTotalList.length === 0) {
        callback(new Error("请添加教学工作量"));
      }
      callback();
    };
    return {
      rules: {
        type: [{ required: true, message: "请选择聘用形式", trigger: "blur" }],
        positionalTitle: [
          { required: true, message: "请输入职称", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入教师名称", trigger: "blur" }],
        workloadTotalList: [{ validator: workloadTotalValidator }],
      },
      formInline: {},
      teacherList: [],
      courseList: [],
      workloadTotalList: [],
    };
  },
  created() {
    if (this.info.id) {
      this.loadData();
    }
  },
  methods: {
    async loadData() {
      const res = await this.$api.teacher.detail({
        id: this.info.id,
      });
      if (res.code === 1) {
        this.formInline = res.data;
        this.workloadTotalList = this.formInline.workloadTotalList;
      } else this.$message.error(res.message);
    },
    onSubmit(formName, isAdd) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formInline.workloadTotalList = this.workloadTotalList;
          this.$emit("handleSubmit", this.formInline, isAdd);
        }
      });
    },
    handlePush(data) {
      this.workloadTotalList.push(data);
      this.closeDialog();
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    handleDelete(row) {
      this.$confirm("确认删除该工作量吗", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认删除",
        cancelButtonText: "取消",
      })
        .then(async () => {
          this.workloadTotalList.splice(row.$index, 1);
        })
        .catch((action) => {});
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
