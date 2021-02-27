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
    },
    handleCurrentChange(val) {
      this.defaultParams.page = val;
    },
    reset() {
      this.defaultParams = {
        page: 1,
        limit: 10,
      }
      this.searchForm = {};
      this.loadData(true);
    },
  },
  watch: {
    defaultParams: {
      handler(val) {
        console.log(123)
        this.loadData()
      },
      deep: true
    }
  }
};
