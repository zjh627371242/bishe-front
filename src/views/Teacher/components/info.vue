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
        <el-input
          v-model="formInline.title"
          placeholder="请输入职称"
        ></el-input>
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
      <el-form-item label="学期教学工作量：" style="text-align:left">
        <el-button type="primary" @click="openDialog">新增工作量</el-button>
      </el-form-item>
      <el-table :data="workloadList" style="width: 100%" border="">
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
          prop="theoreticalWordload"
          label="理论教学工作量"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="practicalWordload"
          label="实践教学工作量"
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
      <el-button type="primary" @click="onSubmit('form')">保存</el-button>
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
      workloadList: [],
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
    handlePush(data) {
      this.workloadList.push(data);
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
          this.workloadList.splice(row.$index, 1);
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
