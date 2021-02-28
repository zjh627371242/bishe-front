<template>
  <div class="wrapper">
    <div class="search-form">
      <el-form
        ref="form"
        :model="searchForm"
        :inline="true"
        label-width="120px"
      >
        <el-form-item label="教师名称：">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-button type="primary" class="search" @click="handleSearch"
          >查询</el-button
        >
        <el-button class="reset" @click="reset">重置</el-button>
        <el-button
          type="primary"
          class="add"
          plain
          @click="openDialog({ title: '新增任务' })"
          >新增任务</el-button
        >
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="schoolYear" label="学年" align="center">
        </el-table-column>
        <el-table-column prop="schoolTerm" label="学期" align="center">
        </el-table-column>
        <el-table-column prop="course.name" label="课程名称" align="center">
        </el-table-column>
        <el-table-column prop="classroom" label="授课班级" align="center">
        </el-table-column>
        <el-table-column prop="classType" label="班级类型" align="center">
          <template slot-scope="scope">
            <span>{{ classroomTypeMap[scope.row.classType] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="studentCount" label="班级人数" align="center">
        </el-table-column>
        <el-table-column prop="name" label="教师" align="center">
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
          :page-size="defaultParams.limit"
          :current-page="defaultParams.page"
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
      searchForm: {},
      subData: {},
      tableData: [],
      classroomTypeMap: {
        "newClass": "开新班",
        "repeatClass": "重复班"
      },
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    handleSearch() {
      this.loadData(true);
    },
    async loadData(isSearch) {
      isSearch && (this.defaultParams.page = 1);
      const res = await this.$api.task.list(
        Object.assign({}, this.searchForm, this.defaultParams)
      );
      if (res.code == 1) {
        this.total = res.data.total;
        this.tableData = res.data.records;
      }
    },
    toEdit(row) {
      this.subData = row;
      this.openDialog({ title: "编辑任务" });
    },
    async handleSubmit(params, isAdd) {
      const res = await this.$api.task[isAdd ? "save" : "update"](params);
      console.log(res)
      if (res.code === 1) {
        this.$message.success(res.message);
        this.closeDialog();
        this.searchForm = {};
        this.loadData(isAdd);
      } else this.$message.error(res.message);
    },
    handleDelete(row) {
      this.$confirm("确认删除该任务吗", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认删除",
        cancelButtonText: "取消",
      })
        .then(async () => {
          const res = await this.$api.task.delete({
            id: row.id,
          });
          if (res.code === 1) {
            this.$message.success(res.message);
            this.closeDialog();
            this.searchForm = {};
            this.loadData(true);
          } else this.$message.error(res.message);
        })
        .catch((action) => {});
    },
  },
};
</script>

<style lang="less" scoped>
.search-form {
  text-align: left;
}
</style>
