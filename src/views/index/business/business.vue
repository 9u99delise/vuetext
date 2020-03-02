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
        <el-form-item label="企业编号" prop="eid">
          <el-input class="wsmall" v-model="formInline.eid" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input class="wmeduim" v-model="formInline.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="wsmall" v-model="formInline.username" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="wmeduim" v-model="formInline.status" placeholder="请选择">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$refs.dialogBusiness.dialogFormVisible = true"
          >新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!--表格-->
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column prop="eid" label="企业编号" width="180"></el-table-column>
        <el-table-column prop="name" label="企业名称" width="180"></el-table-column>
        <el-table-column prop="username" label="创建者" width="180"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="180">
          <template slot-scope="scope">{{ scope.row.create_time | formatTime }}</template>
        </el-table-column>
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
    <!-- <business-add ref="addBusiness"></business-add>
    <business-edit ref="editBusiness"></business-edit>-->
    <business-dialog ref="dialogBusiness"></business-dialog>
  </div>
</template>
<script>
import {
  businessList,
  businessStatus,
  businessRemove
} from "@/api/business.js";
// import businessAdd from "./components/businessAdd.vue";
// import businessEdit from "./components/businessEdit.vue";
import businessDialog from "./components/businessDialog.vue";
export default {
  name: "business",
  components: {
    // businessAdd,
    // businessEdit,
    businessDialog
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
  created() {
    this.getList();
  },
  methods: {
    getList() {
      businessList({
        page: this.page,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        console.log(res);
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
    handleEdit(row) {
      this.$refs.dialogBusiness.isAdd = false;
      this.$refs.dialogBusiness.dialogFormVisible = true;
      if (this.item != row) {
        this.$refs.dialogBusiness.form = { ...row };
        this.item = row;
      }
    },
    changeStatus(row) {
      businessStatus({ id: row.id }).then(res => {
        if (res.data.code == 200) {
          this.getList();
        }
      });
    },
    handleDelete(row) {
      this.$confirm("您确定要删除本条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          businessRemove({ id: row.id }).then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success("删除成功!");
              //当前页面唯一记录删除则 显示前一页数据
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
    },
    search() {
      this.page = 1;
      this.getList();
    },
    clear() {
      //清空表单
      this.$refs.formInline.resetFields();
      this.page = 1;
      this.getList();
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