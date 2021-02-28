<template>
  <div class="home">
    <el-container class="container">
      <el-header class="header">
        <div class="logo-container">
          <img src="../assets/logo.png" alt="" class="logo" />
        </div>
        <h2 class="title">高校教师管理系统</h2>
        <div class="exit">
          <el-button type="warning" plain round @click="exit"
            >退出登录</el-button
          >
        </div>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <el-menu
            router
            :default-active="currentPath"
            class="el-menu-vertical-demo"
          >
            <el-menu-item index="/home/task">
              <i class="el-icon-tickets"></i>
              <span slot="title">任务管理</span>
            </el-menu-item>
            <el-menu-item index="/home/work">
              <i class="el-icon-paperclip"></i>
              <span slot="title">工作管理</span>
            </el-menu-item>
            <el-menu-item index="/home/teacher">
              <i class="el-icon-info"></i>
              <span slot="title">教师管理</span>
            </el-menu-item>
            <el-menu-item index="/home/course">
              <i class="el-icon-edit"></i>
              <span slot="title">课程管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="wrapper">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      currentPath: "/home/task",
    };
  },
  components: {},
  methods: {
    exit() {
      this.$router.push("/login");
      sessionStorage.removeItem("isLogin");
      this.$message.success("退出成功");
    },
  },
  watch: {
    $route: {
      handler(val) {
        this.currentPath = val.path;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.home,
.container {
  height: 100%;
  /deep/.el-menu {
    height: 100%;
  }
}
.header {
  height: 80px !important;
  line-height: 80px;
  border-bottom: 1px solid #e6e6e6;
  .title {
    float: left;
    margin-left: 50px;
    color: #6d6565;
  }
  .logo-container {
    height: 100%;
    display: flex;
    overflow: hidden;
    align-items: center;
    overflow: hidden;
    float: left;
    .logo {
      width: 50px;
      height: 50px;
    }
  }
  .exit {
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
</style>
