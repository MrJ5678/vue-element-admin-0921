<template>
  <div v-loading="listLoading" class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listWhere" @keyup.enter.native="getDataList()">
        <el-input v-model="listWhere.search_content" placeholder="内容" style="width: 300px;" class="filter-item" clearable @clear="listWhere.search_content=undefined" />
        <el-select v-model="listWhere.contract_type" placeholder="状态" clearable style="width: 120px" class="filter-item" @clear="listWhere.contract_type=undefined">
          <el-option v-for="item in statusOptions" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
        <el-date-picker
          v-model="listWhere.prepare_timer"
          class="filter-item"
          type="datetimerange"
          range-separator="至"
          start-placeholder="发布开始时间"
          end-placeholder="发布结束时间"
          align="right"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          @clear="listWhere.prepare_timer=undefined"
        />
        <el-button class="filter-item" @click="gotoSearch()">搜索</el-button>
        <el-button class="filter-item" type="success" @click="gotoPage()">发布任务</el-button>
      </el-form>
    </div>
    <el-table
      :data="dataList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="任务ID" prop="id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.task_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总包合同编号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.contract_code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.task_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center">
        <template slot-scope="{row}">
          <span>{{ row.founder_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.release_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务金额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.task_amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.contract_type_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding">
        <template slot-scope="{row}">
          <el-link :underline="false" type="primary" style="font-size: 12px;" @click="viewHandle(row.id)">
            查看
          </el-link>
          <el-link :underline="false" type="primary" style="font-size: 12px;" @click="editHandle(row.id)">
            编辑
          </el-link>
          <el-link :underline="false" type="primary" style="font-size: 12px;">
            开票申请
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
import { gettasklist } from '@/api/mcn/task'
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
      listWhere: {
        search_content: undefined,
        contract_type: undefined,
        prepare_timer: undefined
      },
      dataList: null,
      listLoading: true,
      statusOptions: [{
        label: '未承接', key: '0'
      }, {
        label: '已承接', key: '1'
      }, {
        label: '已驳回', key: '2'
      }, {
        label: '未分包', key: '3'
      }, {
        label: '待审核', key: '4'
      }, {
        label: '进行中', key: '5'
      }, {
        label: '已完成', key: '6'
      }]
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    getDataList() {
      this.listLoading = true

      const iswhere = this.deepClone(this.listWhere)

      gettasklist(this.listQuery, iswhere).then(response => {
        if (response && response.code === 1) {
          this.dataList = response.data.list
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

    },
    handleClick(tab, event) {
      const name = tab.name
      this.$router.push({ path: '/admin-account/' + name })
    },
    gotoPage() {
      this.$router.push({ path: '/mcn-task/release' })
    },
    gotoSearch() {
      this.listQuery.page = 1
      this.getDataList()
    },
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    editHandle(id) {
      this.$router.push({ path: '/mcn-task/release', query: { id: id }})
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
