<template>
  <div v-loading="listLoading" class="app-container">
    <el-tabs v-model="actType" style="margin-bottom: 30px;" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in typeOptions" :key="index" :label="item.lable" :name="item.key" />
    </el-tabs>
    <el-table
      :data="dataList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="总包任务ID" prop="id" align="center">
        <template slot-scope="{row}">
          <span v-if="Number(actType) === 1 || Number(actType) === 4">{{ row.task_id_code }}</span>
          <span v-else>{{ row.task_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="机构名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mcn_name }} {{ actType }}</span>
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
      <el-table-column label="状态" align="center">
        <template>
          <span>{{ actType | typeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding">
        <template slot-scope="{row}">
          <el-link v-if="Number(actType)===1" :underline="false" type="primary" style="font-size: 12px;" @click="viewHandle(row.totaltaskid)">
            发布
          </el-link>
          <el-link v-if="Number(actType)===4" :underline="false" type="primary" style="font-size: 12px;" @click="viewHandle(row.totaltaskid)">
            查看
          </el-link>
          <el-link v-if="Number(actType)===5 || Number(actType)===6" :underline="false" type="primary" style="font-size: 12px;" @click="viewHandle(row.id)">
            查看
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
import { branch_task_list } from '@/api/admin/part'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  filters: {
    typeFilter(status) {
      const statusMap = {
        1: '未处理',
        4: '待审核',
        5: '进行中',
        6: '已完成'
      }
      return statusMap[Number(status)]
    }
  },
  data() {
    return {
      totalCount: 0,
      listQuery: {
        page: 1,
        type: 1
      },
      dataList: null,
      listLoading: true,
      typeOptions: [{
        lable: '未处理',
        key: '1'
      }, {
        lable: '待审核',
        key: '4'
      }, {
        lable: '进行中',
        key: '5'
      }, {
        lable: '已完成',
        key: '6'
      }, {
        lable: '申诉',
        key: '3'
      }],
      actType: '1'
    }
  },
  created() {
    this.getDataList()
    const actType = this.getParam(this.$route.name)
    this.actType = String(actType)
    this.listQuery.type = Number(actType)
  },
  methods: {
    getDataList() {
      this.listLoading = true

      branch_task_list(this.listQuery).then(response => {
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
      this.$router.push({ path: '/admin-part/list/view', query: { id: id, actType: Number(this.actType) }})
    },
    getParam(name) {
      return name.replace('admin-list-', '')
    },
    handleClick(tab, event) {
      const name = tab.name
      this.$router.push({ path: '/admin-part/list/type/' + name })
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
