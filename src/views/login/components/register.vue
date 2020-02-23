<template>
  <div>
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible" center width="600px">
      <el-form :model="form" :rules="rules">
        <el-form-item label="昵称" prop="nickname" :label-width="formLabelWidth">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="图形码" prop="imgcode" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="form.imgcode"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img class="imgcode" @click="changeCode" :src="imgCodeUrl" alt />
          </el-col>
        </el-form-item>
        <el-form-item label="验证码" prop="code" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button
              @click="getMsgCode"
              :disabled="time != 0"
            >{{time == 0 ? "获取用户验证码" : time+"s后重新获取"}}</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      imgCodeUrl:
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Math.random(),
      dialogFormVisible: false,
      time: 0, //短信验证码倒计时
      form: {
        nickname: "",
        email: "",
        phone: "",
        password: "",
        imgcode: "",
        code: ""
      },
      formLabelWidth: "60px",
      rules: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 2,
            max: 24,
            message: "长度在 2 到 24 个字符",
            trigger: "blur"
          },
          {
            pattern: /[A-Za-z0-9_-\u4e00-\u9fa5]+/,
            message: "昵称仅支持中文字母与数字的组合",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "请输入正确的邮箱",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "change"
          }
        ],
        imgcode: [],
        code: []
      }
    };
  },
  methods: {
    changeCode() {
      this.imgCodeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    getMsgCode() {
      this.time = 60;
      let temptime = setInterval(() => {
        this.time--;
        if (this.time == 0) {
          clearInterval(temptime);
        }
      }, 10);
      axios({
        method: "post",
        url: process.env.VUE_APP_URL+"/sendsms",
        data: {
          code: this.form.imgcode,
          phone: this.form.phone,
        },
        withCredentials:true, //跨域携带cookie
      }).then(res =>{
        window.console.log(res)
        if(res.data.code==200){
          alert('验证码获取成功--'+res.data.data.captcha)
        }else{
          alert('验证码获取失败--'+res.data.message)
        }
      });
    }
  }
};
</script>
<style lang="less">
.el-dialog__header {
  background: linear-gradient(225deg, #1493fa, #01c6fa);
}
span.el-dialog__title {
  color: #fff;
  font-size: 18px;
  font-weight: 400;
}
.el-dialog__headerbtn i.el-dialog__close {
  color: #fff;
}
.imgcode {
  width: 100%;
  height: 40px;
}
</style>