<template>
  <div>
    <el-dialog title="新增学科" :visible.sync="dialogFormVisible" width="600px" center>
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
        <el-button type="primary" @click="doAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { subjectAdd } from "@/api/subject.js";
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
    doAdd() {
      this.$refs.form.validate(v => {
        if (v) {
          subjectAdd(this.form).then(res => {
            if(res.data.code == 200){
                this.$message.success('新增成功!');
                this.dialogFormVisible = false;
                this.form = {};
                this.$parent.getList();
            }else{
                this.$message.error(res.data.message)
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