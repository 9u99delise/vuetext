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
        <img :src="$store.state.avatar" alt />
        <span class="userhi">{{ $store.state.userName }},您好</span>
        <el-button size="mini" type="primary" @click="indexLogout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!--左侧内容-->
      <el-aside width="auto">
        <!-- 导航 -->
        <el-menu
          :default-active="$route.path"
          router
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
          <template v-for="(item, index) in childrenRoutes"  >
          <el-menu-item :index="'/index/'+item.path"  :key="index" v-if="item.meta.roles.includes($store.state.role)">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.title}}</span>
          </el-menu-item>
          </template>

        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main>
        <!--路由出口-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import childrenRoutes from "@/router/childrenRoutes.js";
import { logout } from "@/api/index.js";
import { removeToken, getToken } from "@/utils/token.js";
export default {
  data() {
    return {
      childrenRoutes,
      avatar: "",
      username: "",
      isCollapse: false
    };
  },
  beforeCreate() {
    if (getToken() == null) {
      this.$message.error("请先登录!");
      this.$router.push("/login");
    }
  },
  created() {
  //   info().then(res => {
  //     // window.console.log(res);
  //     if (res.data.code == 200) {
  //       this.avatar = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
  //       this.username = res.data.data.username;
  //     }else if(res.data.code == 206){
  //       this.$message.error('登陆状态异常,请重新登陆!');
  //       removeToken();
  //       this.$router.push('/login');
  //     }
  //   });
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
              //清除vuex数据
              this.$store.commit("getUserName","");
              this.$store.commit("getAvatar","");
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
  display: flex;
  box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  justify-content: space-between;
  .icon_head {
    font-size: 24px;
  }
}
.el-aside {
  background-color: #fff;
  box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  border-right: solid 1px #e6e6e6;
  .el-menu {
    border-right: none;
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
