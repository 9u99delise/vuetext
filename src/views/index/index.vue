<template>
  <el-container class="myflex">
    <el-header class="index_head">
      <div class="left">
        <i
          @click="isCollapse = !isCollapse"
          class="icon_head"
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        ></i>
        <img src="../../assets/index_logo.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img :src="avatar" alt />
        <span class="userhi">{{ username }},您好</span>
        <el-button size="mini" type="primary" @click="indexLogout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <!-- 左侧导航 -->
        <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-menu-item index="1">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>Main</el-main>
      <!-- 右侧内容 -->
    </el-container>
  </el-container>
</template>
<script>
import { info, logout } from "@/api/index.js";
import { removeToken } from "@/utils/token.js";
export default {
  data() {
    return {
      avatar: "",
      username: "",
      isCollapse: false
    };
  },
  created() {
    info().then(res => {
      window.console.log(res);
      this.avatar = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
      window.console.log(this.avatar);
      this.username = res.data.data.username;
    });
  },
  methods: {
    indexLogout() {
      this.$confirm("您确定要退出账号吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          logout().then(res => {
            // window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("退出成功!");
              //清除本地token
              removeToken();
              //跳转登陆页面
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>
<style lang="less">
.myflex {
  width: 100%;
  height: 100%;
}
.index_head {
  height: 60px;
  color: #636363;
  background: #fff;
  box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  display: flex;
  justify-content: space-between;
  .icon_head {
    font-size: 24px;
  }
}
.el-aside {
  background-color: #fff;
  box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  border-right: solid 1px #e6e6e6;
  .el-menu{
    border-right:none;
  }
  .el-menu-item {
    color: #686a6e;
    font-weight: bold;
    font-size: 14px;
  }
}
.el-main {
  background-color: #f8f8f8;
}
.left {
  display: flex;
  align-items: center;
  img {
    width: 33px;
    height: 28px;
    margin: 0 10px;
  }
  span {
    font-size: 22px;
    color: #49a1ff;
  }
}
.right {
  display: flex;
  align-items: center;
  img {
    width: 34px;
    height: 34px;
    border-radius: 20px;
  }
  .userhi {
    font-size: 14px;
    font-weight: bold;
    color: rgba(99, 99, 99, 1);
    margin: 0 20px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  min-height: 400px;
}
</style>
