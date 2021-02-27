<template>
  <div class="wrapper">
    <div class="search-form">
      <el-form
        ref="form"
        :model="searchForm"
        :inline="true"
        label-width="120px"
      >
        <el-form-item label="课程名称：">
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
          @click="openDialog({ title: '新增课程' })"
          >新增课程</el-button
        >
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="name" label="课程名称" align="center">
        </el-table-column>
        <el-table-column prop="category" label="课程类别" align="center">
          <template slot-scope="scope">
            <span>{{ categoryMap[scope.row.category] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="课程类型" align="center">
          <template slot-scope="scope">
            <span>{{ typeMap[scope.row.type] }}</span> </template
          >type
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
      categoryMap: {
        theory: "理论课",
        practice: "实践课",
      },
      typeMap: {
        compulsory: "公共必修课",
        elective: "公共选修课",
        major: "专业课",
      },
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData(isSearch) {
      isSearch &&( this.defaultParams.page = 1);
      const res = await this.$api.course.list(
        Object.assign({}, this.searchForm, this.defaultParams)
      );
      if (res.code == 1) {
        this.total = res.data.total;
        this.tableData = res.data.records;
      }
    },
    toEdit(row) {
      this.subData = row;
      this.openDialog({ title: "编辑课程" });
    },
    async handleSubmit(params,isAdd) {
      console.log(isAdd)
      if(isAdd){
        const res = await this.$api.course.add(params);
      if (res.code === 1) {
        this.$message.success(res.message);
        this.closeDialog();
        this.searchForm = {};
        this.loadData(isAdd);
      } else this.$message.error(res.message);
      }else{
      const res = await this.$api.course.edit(params);
      if (res.code === 1) {
        this.$message.success(res.message);
        this.closeDialog();
        this.searchForm = {};
        this.loadData(isAdd);
      } else this.$message.error(res.message);
      }
      
    },
    handleSearch() {
      this.loadData(true);
    },
    handleDelete(row) {
      this.$confirm("确认删除该课程吗", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认删除",
        cancelButtonText: "取消",
      })
        .then(async () => {
          const res = await this.$api.course.delete({
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
