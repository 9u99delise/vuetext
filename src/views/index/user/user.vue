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
          <el-input class="wsmall" v-model="formInline.username" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input class="wmeduim" v-model="formInline.email" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!--表格-->
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column prop="eid" label="用户名" width="180"></el-table-column>
        <el-table-column prop="name" label="电话" width="180"></el-table-column>
        <el-table-column prop="username" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="create_time" label="角色" width="180"></el-table-column>
        <el-table-column prop="create_time" label="备注" width="180"></el-table-column>
        <el-table-column prop="status" label="状态" width="180">
          <template slot-scope="scope">
            <span :class="{isred:!scope.row.status}">{{scope.row.status?"启用":"禁用"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop label="操作">
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
  </div>
</template>
<script>
export default {
  name: "user",
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
    handleSizeChange(size) {
      this.size = size;
      //预防最后一页切换页容量时出现空表格,每次切换页容量都返回第一页
      this.page = 1;
    },
    handleCurrentChange(page) {
      this.page = page;
    }
  }
};
</script>
<style lang="less">
.box-card {
  margin-bottom: 20px;
  .wsmall {
    width: 100px;
  }
  .wmedium {
    width: 150px;
  }
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