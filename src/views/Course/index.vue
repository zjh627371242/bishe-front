<template>
  <div class="wrapper">
    <div class="search-form">
      <el-form ref="form" :model="form" :inline="true" label-width="120px">
        <el-form-item label="课程名称：">
          <el-input v-model="form.couse"></el-input>
        </el-form-item>
        <el-button type="primary" class="search">查询</el-button>
        <el-button class="reset">重置</el-button>
        <el-button
          type="primary"
          class="add"
          plain
          @click="openDialog({ title: '新增课程' })"
          >新增课程</el-button
        >
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="schoolYear" label="课程名称" align="center">
        </el-table-column>
        <el-table-column prop="classroom" label="课程类别" align="center">
        </el-table-column>
        <el-table-column prop="classType" label="课程类型" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="warning" plain @click="toEdit(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" plain @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :total="total"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="defaultParams.pageSize"
          :current-page="defaultParams.pageNum"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :title="title"
      :show-close="false"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      width="50%"
      top="50px"
    >
      <info
        :info="subData"
        @handleSubmit="handleSubmit"
        @handleCancel="closeDialog"
      />
    </el-dialog>
  </div>
</template>

<script>
import Info from "./components/info";
import tableMixin from "../../mixins/tableMixin";
import dialogMixin from "../../mixins/dialogMixin";

export default {
  components: { Info },
  mixins: [tableMixin, dialogMixin],
  data() {
    return {
      form: {},
      subData: {},
      tableData: [
        {
          teacherName: "张三",
          studentCount: "12",
          classType: "重开班",
          classroom: "一班",
          schoolYear: "2",
        },
      ],
    };
  },
  methods: {
    toEdit(row) {
      this.subData = row;
      this.openDialog({ title: "编辑课程" });
    },
    handleSubmit(params) {
      console.log(params);
    },
    handleDelete(row) {
      this.$confirm("确认删除该课程吗", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认删除",
        cancelButtonText: "取消",
      })
        .then(async () => {
          console.log("删除");
        })
        .catch((action) => {
          console.log("取消删除");
        });
    },
  },
};
</script>

<style lang="less" scoped>
.search-form {
  text-align: left;
}
</style>
