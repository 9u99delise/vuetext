<template>
  <div>
    <!--筛选-->
    <el-card class="box-card">
      <el-form
        :inline="true"
        :model="formInline"
        ref="formInline"
        size="medium"
        class="demo-form-inline"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="formInline.username" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="formInline.email" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="formInline.region" placeholder="请选择">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addnew">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!--表格-->
    <el-card class="box-card">
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="phone" label="电话" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
        <el-table-column prop="role" label="角色" width="100"></el-table-column>
        <el-table-column prop="remark" label="备注" width="150"></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.status">"启用"</span>
            <span v-else class="isred">"禁用"</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="changeStatus(scope.row)">{{!scope.row.status?"启用":"禁用"}}</el-button>
            <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        class="center"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[1,5,10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <user-dialog ref="userDialog"></user-dialog>
  </div>
</template>
<script>
import { userList, userStatus, userRemove } from "@/api/user.js";
import userDialog from "./components/userDialog.vue";
export default {
  name: "user",
  components: {
    userDialog
  },
  data() {
    return {
      formInline: {},
      tableData: [],
      page: 1,
      size: 5,
      total: 0,
      item: null
    };
  },
  methods: {
    getList() {
      userList({
        page: this.page,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },
    handleSizeChange(size) {
      this.size = size;
      //预防最后一页切换页容量时出现空表格,每次切换页容量都返回第一页
      this.page = 1;
      this.getList();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getList();
    },
    search() {
      this.page = 1;
      this.getList();
    },
    clear() {
      this.$refs.formInline.resetFields();
      this.page = 1;
      this.getList();
    },
    addnew() {
      this.$refs.userDialog.form = {};
      this.$refs.userDialog.dialogFormVisible = true;
    },
    handleEdit(row) {
      this.$refs.userDialog.isAdd = false;
      this.$refs.userDialog.dialogFormVisible = true;
      if (row != this.item) {
        this.$refs.userDialog.form = { ...row };
        this.item = row;
      }
    },
    changeStatus(row) {
      userStatus({ id: row.id }).then(res => {
        if (res.data.code == 200) {
          this.getList();
        }
      });
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          userRemove({ id: row.id }).then(res => {
            if (res.data.code == 200) {
              this.$message.success("删除成功!");
              if (this.tableData.length == 1) {
                this.page == 1 || this.page--;
              }
              this.getList();
            } else {
              this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$message("已取消删除");
        });
    }
  },
  created() {
    this.getList();
  }
};
</script>
<style lang="less">
.box-card {
  margin-bottom: 20px;
}
.isred {
  color: #f56c6c;
}
.center {
  display: flex;
  justify-content: center;
  margin: 10px auto;
}
</style>