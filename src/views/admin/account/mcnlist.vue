<template>
  <div v-loading="listLoading" class="app-container">
    <el-tabs v-model="activeName" style="margin-right: 10px; margin-left: 10px; margin-bottom: 30px;" @tab-click="handleClick">
      <el-tab-pane label="MCN账号列表" name="mcnlist" />
      <el-tab-pane label="主播账号列表" name="anchorlist" />
    </el-tabs>
    <el-table
      :data="dataList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="机构ID" prop="id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mcn_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录账号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mcn_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后登录日期" align="center">
        <template slot-scope="{row}">
          <span>{{ row.last_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.type | typeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding">
        <template slot-scope="{row}">
          <el-link :underline="false" type="primary" style="font-size: 12px;" @click="viewHandle(row.id)">
            查看
          </el-link>
          <el-link v-if="row.type === 1" :underline="false" type="primary" style="font-size: 12px;" @click="delHandle(row,2)">
            禁用
          </el-link>
          <el-link v-if="row.type === 2" :underline="false" type="primary" style="font-size: 12px;" @click="delHandle(row,1)">
            启用
          </el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mcnlist, editstate } from '@/api/admin/account'
import { MessageBox } from 'element-ui'

export default {
  filters: {
    typeFilter(status) {
      const statusMap = {
        1: '已启动',
        2: '已禁用'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      dataList: null,
      listLoading: true,
      activeName: 'mcnlist'
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    getDataList() {
      this.listLoading = true
      mcnlist().then(response => {
        if (response && response.code === 1) {
          this.dataList = response.data
        } else {
          this.dataList = []
        }

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 200)
      })
    },
    viewHandle(id) {

    },
    delHandle(row, status) {
      MessageBox.confirm('确认操作？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const datas = {
          id: row.id
        }
        editstate(datas).then(response => {
          if (response && response.code === 1) {
            row.type = status
            this.$message.success('操作成功')
          } else {
            this.$message.error(response.msg)
          }
        })
      })
    },
    handleClick(tab, event) {
      const name = tab.name
      this.$router.push({ path: '/admin-account/' + name })
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
</style>
