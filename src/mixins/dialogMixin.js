export default {
  data() {
    return {
      dialogVisible: false,
      title: "信息",
    };
  },
  methods: {
    openDialog(params) {
      const { title } = params;
      this.dialogVisible = true;
      this.title = title;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
  },
};
