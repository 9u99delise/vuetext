<template>
  <div>
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible" center width="600px" :destroy-on-close="true" >
      <el-form :model="form" :rules="rules" ref="registerForm">
        <el-form-item label="头像" prop="avatar" class="textaline-center" :label-width="formLabelWidth">
          <el-upload name="image" v-model="form.avatar" class="avatar-uploader" :action="userPicUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
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
            <el-button @click="getMsgCode" :disabled="time != 0">{{time == 0 ? "获取用户验证码" : time+"s后重新获取"}}</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('registerForm')">重 置</el-button>
        <el-button type="primary" @click="registerForm('registerForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {
    getPhoneMsg,register
  } from "../../../api/register.js";
  export default {
    data() {
      return {
        userPicUrl: process.env.VUE_APP_URL + "/uploads",
        imageUrl: "",
        imgCodeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Math.random(),
        dialogFormVisible: false,
        time: 0, //短信验证码倒计时
        form: {
          avatar: "",
          nickname: "",
          email: "",
          phone: "",
          password: "",
          imgcode: "",
          code: ""
        },
        formLabelWidth: "70px",
        rules: {
          avatar: [{
            required: true,
            message: "请上传头像",
            trigger: "change"
          }],
          nickname: [{
              required: true,
              message: "请输入昵称",
              trigger: "blur"
            },
            {
              min: 2,
              max: 24,
              message: "长度在 2 到 24 个字符",
              trigger: "blur"
            },
            {
              pattern: /[A-Za-z0-9_-\u4e00-\u9fa5]+/,
              message: "昵称请以英文或数字开头",
              trigger: "blur"
            }
          ],
          email: [{
              required: true,
              message: "请输入邮箱",
              trigger: "blur"
            },
            {
              pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
              message: "请输入正确的邮箱",
              trigger: "blur"
            }
          ],
          phone: [{
              required: true,
              message: "请输入手机号",
              trigger: "blur"
            },
            {
              pattern: /0?(13|14|15|18|17)[0-9]{9}/,
              message: "请输入正确的手机号码",
              trigger: "blur"
            }
          ],
          password: [{
              required: true,
              message: "请输入密码",
              trigger: "blur"
            },
            {
              min: 6,
              max: 12,
              message: "长度在 6 到 12 个字符",
              trigger: "change"
            }
          ],
          imgcode: [{
              required: true,
              message: "请输入图形验证码",
              trigger: "blur"
            },
            {
              len: 4,
              message: "请输入4位数验证码",
              trigger: "change"
            }
          ],
          code: [{
              required: true,
              message: "请输入短信验证码",
              trigger: "blur"
            },
            {
              len: 4,
              message: "请输入4位数验证码",
              trigger: "change"
            }
          ]
        }
      };
    },
    methods: {
        //获取图片验证码
      changeCode() {
        this.imgCodeUrl =
          process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
      },
        //获取手机验证码
      getMsgCode() {
        if (!/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.phone)) {
          return this.$message.error("手机号码格式不正确");
        }
        if (this.form.imgcode.length != 4) {
          return this.$message.error("验证码输入不完整");
        }
        // 倒计时读秒 
        this.time = 60;
        let temptime = setInterval(() => {
          this.time--;
          if (this.time == 0) {
            clearInterval(temptime);
          }
        }, 10);
        //调用api
        getPhoneMsg({
          code: this.form.imgcode,
          phone: this.form.phone
        }).then(res => {
          window.console.log(res);
          if (res.data.code == 200) {
            this.$message.success("验证码获取成功:" + res.data.data.captcha);
          } else {
            this.$message.error("验证码获取失败:" + res.data.message);
          }
        });
      },
        //头像上传成功的
      handleAvatarSuccess(res, file) {
        window.console.log("res",res)
        window.console.log("file",file)
        this.imageUrl = URL.createObjectURL(file.raw);
        this.form.avatar = res.data.file_path
        this.$refs.registerForm.validateField('avatar')
      },
        //头像上传之前的图片验证
      beforeAvatarUpload(file) {
        const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isJPG) {
          this.$message.error("上传头像图片只能是JPG,PNG,GIF格式!");
        }
        if (!isLt1M) {
          this.$message.error("上传头像图片大小不能超过1MB!");
        }
        return isJPG && isLt1M;
      },
        // 表单是否全部验证通过
      registerForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            register({
              username: this.form.nickname,
              phone: this.form.phone,
              email: this.form.email,
              avatar: this.form.avatar,
              password: this.form.password,
              rcode: this.form.code,
            }).then(res =>{
              window.console.log("注册",res)
              if(res.data.code == 200){
                this.$message.success('注册成功!');
                this.dialogFormVisible = false;
                this.$refs.registerForm.resetFields();
                this.imageUrl = "";
              }else{
                this.$message.error(res.data.message)
              }
            })
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisible = false;
        this.imageUrl = ""
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
    //上传控件
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  i.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
    //上传控件结束
  .textaline-center {
    text-align: center;
  }
</style>