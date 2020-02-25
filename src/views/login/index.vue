<template>
  <div class="login-wrap">
  <!-- 登陆 -->
    <div class="login-box">
      <div class="title-box">
        <img class="logo-img" src="../../assets/login-logo.png" alt />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="title">用户登录</span>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入手机号" prefix-icon="el-icon-user" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password clearable></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-col :span="16">
            <el-input v-model="ruleForm.code" placeholder="请输入验证码" prefix-icon="el-icon-key" clearable></el-input>
          </el-col>
          <el-col :span="8">
            <div class="code">
              <img :src="imgUrl" @click="changeImg" alt="">
            </div>
          </el-col>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox name="type" v-model="ruleForm.agree">
          </el-checkbox>
          <span class="agree"> 我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link type="primary">隐私条款</el-link></span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-all" @click="loginForm('ruleForm')">登 录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-all" @click="setup">注 册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 装饰图 -->
    <img class="login-banner" src="../../assets/login_banner_ele.png" alt />
    <!-- 弹窗对话框 -->
    <register ref="register"></register>
  </div>
</template>
<script>
import register from './components/register.vue'
import { login } from '@/api/login.js'
import { setToken } from '@/utils/token.js'

  export default {
    components:{
      register,
    },
    data() {
      return {
        imgUrl:process.env.VUE_APP_URL+'/captcha?type=login',
        ruleForm: {
          phone: '',
          password: '',
          code: '',
          agree: false,
        },
        rules:{
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ],
          code:[{ required: true, message: '请输入验证码', trigger: 'blur' },], //pattern: /true/ 正则表达式的值必须匹配，才能通过验证, 值为true才满足条件
          agree:[{ pattern: /true/, message: '请阅读并同意协议', trigger: 'change' },],
        },
      }
    },
    methods:{
      loginForm(formName) {
        this.$refs[formName].validate(v => {
          if (v) {
            login({
              phone:this.ruleForm.phone,
              password:this.ruleForm.password,
              code:this.ruleForm.code,
            }).then(res => {
              // window.console.log(res)
              if(res.data.code == 200){
                //存token
                // window.localStorage.setItem('token',res.data.data.token)
                setToken(res.data.data.token);
                this.$message.success("登陆成功!");
                //页面跳转
                this.$router.push('/index');  
              }else{
                this.$message.error("登陆失败"+res.data.message);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      setup() {
        this.$refs.register.dialogFormVisible = true;
      },
      changeImg(){
        this.imgUrl = process.env.VUE_APP_URL+'/captcha?type=login&t='+Date.now()
      }
    },
  };
</script>
<style lang="less">
  .login-wrap {
    width: 100%;
    height: 100%;
    background: linear-gradient( 225deg, rgba(20, 147, 250, 1), rgba(1, 198, 250, 1));
    display: flex;
    justify-content: space-around;
    align-items: center;
    .login-banner {
      width: 633px;
      height: 435px;
      margin-right: 10%;
    }
  }
  .login-box {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    margin-left: 10%;
    padding: 40px;
    .title-box {
      display: flex;
      align-items: center;
      margin: 10px 0 30px;
      .logo-img {
        width: 22px;
        height: 17px;
        margin-right: 10px;
      }
      .line {
        width: 1px;
        height: 24px;
        background: rgba(199, 199, 199, 1);
        margin: 0 10px;
      }
      .title {
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }
    .code {
      width: 100%;
      height: 40px;
      background-color: #f5f5f5;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .agree {
      color: #999;
      .el-link {
        line-height: 1.3;
      }
    }
  }
  .btn-all {
    width: 100%;
  }
  .btn-all>span {
    font-size: 16px;
  }
</style>
