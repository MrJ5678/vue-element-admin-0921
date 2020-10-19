<template>
  <div v-loading="listLoading" class="app-container">
    <h2>欢迎您！</h2>
    <div><span>管理员名称:张三</span> <span style="margin-left:30px;">用户状态:正常</span></div>
    <el-divider />
    <el-row :gutter="20">
      <el-col :span="14">
        <div class="home-table">
          <h3 class="home-table-one-h3">账号信息</h3>
          <el-row class="home-table-one">
            <el-col :span="6">
              <img class="home-table-img" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
              <div>MCN账户管理</div>
            </el-col>
            <el-col :span="6">
              <img class="home-table-img" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
              <div>MCN账户管理</div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="home-table">任务管理</div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="14">
        <div class="home-table">
          <h3 class="home-table-one-h3">平台管理</h3>
          <el-row class="home-table-one">
            <el-col :span="6">
              <img class="home-table-img" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
              <div>税率管理</div>
            </el-col>
            <el-col :span="6">
              <img class="home-table-img" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
              <div>管理员管理</div>
            </el-col>
            <el-col :span="6">
              <img class="home-table-img" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
              <div>数据统计</div>
            </el-col>
            <el-col :span="6">
              <img class="home-table-img" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
              <div>合同模板管理</div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="home-table">行为日志</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listLoading: true
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    getDataList() {
      this.listLoading = false
    }
  }
}
</script>

<style scoped>
.app-container {
  background-color: #fff;
  width: 98%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 100px;
}

.home-table {
  border: 1px solid #ccc;
  height: 350px;
  margin-top: 20px;
}

.home-table-one {
  text-align: center;
}

.home-table-img {
  width:150px;
  height:150px;
  border-radius:75px;
  margin-bottom: 15px;
}

.home-table-one-h3 {
  margin-top: 28px;
  margin-left: 4%;
  margin-bottom: 50px;
}
</style>
