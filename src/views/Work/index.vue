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
          <el-input v-model="searchForm.teacher"></el-input>
        </el-form-item>
        <el-form-item label="课程名称：">
          <el-input v-model="searchForm.couse"></el-input>
        </el-form-item>
        <el-button type="primary" class="search">查询</el-button>
        <el-button class="reset" @click="reset">重置</el-button>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column
          prop="schoolYear"
          label="教师名称"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="classroom"
          label="职称"
          align="center"
          width="80"
        >
        </el-table-column>
        <el-table-column prop="classType" label="学年学期" align="center">
        </el-table-column>
        <el-table-column
          prop="studentCount"
          label="理论课教学工作量"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="teacherName"
          label="实践课教学工作量"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="teacherName"
          label="实践课教学工作量"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="teacherName"
          label="学期的总教学工作量"
          align="center"
          width="160"
        >
        </el-table-column>
        <el-table-column prop="teacherName" label="课程数量" align="center">
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
  </div>
</template>

<script>
import tableMixin from "../../mixins/tableMixin";

export default {
  mixins: [tableMixin],
  data() {
    return {
      searchForm: {},
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
    reset() {
      this.searchForm = {};
    },
  },
};
</script>

<style lang="less" scoped>
.search-form {
  text-align: left;
}
</style>
