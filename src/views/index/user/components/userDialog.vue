<template>
  <div>
    <el-dialog :title="isAdd? '新增用户':'编辑用户'" :visible.sync="dialogFormVisible" width="600px" center>
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id" :label-width="formLabelWidth">
          <el-select v-model="form.role_id"  placeholder="请选择角色">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { userAdd,userEdit } from "@/api/user.js";
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "80px",
      isAdd: true,
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
          },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "请输入正确的邮箱地址",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          },
          {
            pattern: /0?(13|14|15|17|18|19)[0-9]{9}/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        role_id: [
          {
            required: true,
            message: "请选择角色",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    save() {
      if (this.isAdd) {
        this.$refs.form.validate(v => {
          if (v) {
            userAdd(this.form).then(res => {
              console.log(res);
              if (res.data.code == 200) {
                this.$message.success("添加成功");
                this.dialogFormVisible = false;
                this.form = {};
                this.$parent.page = 1;
                this.$parent.getList();
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        });
      } else {
        this.$refs.form.validate(v => {
          if (v) {
            userEdit(this.form).then(res => {
              console.log(res);
              if (res.data.code == 200) {
                this.$message.success("编辑成功");
                this.dialogFormVisible = false;
                this.$parent.getList();
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        });
      }
    }
  }
};
</script>
<style lang="less">
</style>