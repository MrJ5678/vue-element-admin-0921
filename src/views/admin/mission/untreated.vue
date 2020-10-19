<template>
  <div v-loading="listLoading" class="app-container">
    <el-table
      :data="dataList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="总包任务ID" prop="id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.task_id_code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="机构名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mcn_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.task_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务说明" align="center">
        <template slot-scope="{row}">
          <span>{{ row.task_description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务总额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.task_amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="应到总额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.total_amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.release_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding">
        <template slot-scope="{row}">
          <el-link :underline="false" type="primary" style="font-size: 12px;" @click="viewHandle(row.totaltaskid)">
            查看
          </el-link>
          <el-link :underline="false" type="primary" style="font-size: 12px;" @click="confirmHandle(row)">
            确认承接
          </el-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="totalCount>0"
      :total="totalCount"
      :page.sync="listQuery.page"
      layout="total, prev, pager, next, jumper"
      @pagination="getDataList"
    />
  </div>
</template>

<script>
import { unprototaltask } from '@/api/admin/mission'
import { MessageBox } from 'element-ui'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
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
      totalCount: 0,
      listQuery: {
        page: 1
      },
      dataList: null,
      listLoading: true
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    getDataList() {
      this.listLoading = true

      unprototaltask(this.listQuery).then(response => {
        if (response && response.code === 1) {
          this.dataList = response.data.data
          this.totalCount = response.data.total
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
      this.$router.push({ path: '/admin-mission/mission-view', query: { id: id }})
    },
    confirmHandle(row) {
      MessageBox.confirm('当前税率:' + row.tax + '%', '请确认综合税费率', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.viewHandle(row.totaltaskid)
      })
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
