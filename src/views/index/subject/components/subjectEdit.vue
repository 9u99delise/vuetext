<template>
  <div>
    <el-dialog title="编辑学科" :visible.sync="dialogFormVisible" width="600px" center>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
          <el-input v-model="form.rid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" prop="short_name" :label-width="formLabelWidth">
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" prop="intro" :label-width="formLabelWidth">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" prop="remark" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doEdit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { subjectEdit } from "@/api/subject.js";
export default {
  data() {
    return {
      form: {},
      dialogFormVisible: false,
      formLabelWidth: "80px",
      rules: {
        rid: [{ required: true, message: "必填不能为空", trigger: "blur" }],
        name: [{ required: true, message: "必填不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    doEdit(formName) {
      this.$refs[formName].validate(v => {
        if (v) {
          subjectEdit(this.form).then(res => {
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
};
</script>
<style lang="less">
</style>