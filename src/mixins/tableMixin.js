export default {
  data() {
    return {
      loading: false,
      defaultParams: {
        page: 1,
        limit: 10,
      },
      total: 0,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.defaultParams.limit = val;
      this.loadData()
    },
    handleCurrentChange(val) {
      this.defaultParams.page = val;
      this.loadData()
    },
    reset() {
      this.defaultParams = {
        page: 1,
        limit: 10
      }
      this.searchForm = {};
      this.loadData(true);
    },
  }
};
