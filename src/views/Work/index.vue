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
        <el-button type="primary" class="search" @click="handleSearch">查询</el-button>
        <el-button class="reset" @click="reset">重置</el-button>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column
          prop="teacherName"
          label="教师名称"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="positionalTitle"
          label="职称"
          align="center"
          width="80"
        >
        </el-table-column>
        <el-table-column prop="schoolYear" label="学年" align="center">
        </el-table-column>
        <el-table-column prop="schoolTerm" label="学期" align="center">
        </el-table-column>
        <el-table-column
          prop="theoreticalWordloadTotal"
          label="理论课教学总工作量"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="practicalWordloadTotal"
          label="实践课教学总工作量"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="classNum" label="课程数量" align="center">
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
      ],
    };
  },
  created(){
    this.loadData();
  },
  methods: {
    handleSearch(){
      this.loadData(true)
    },
    async loadData(isSearch){
      isSearch &&( this.defaultParams.page = 1);
      const res = await this.$api.workloadTotal.list(
        Object.assign({}, this.searchForm, this.defaultParams)
      );
      if (res.code == 1) {
        this.total = res.data.total;
        this.tableData = res.data.records;
      }
    }
  },
};
</script>

<style lang="less" scoped>
.search-form {
  text-align: left;
}
</style>
