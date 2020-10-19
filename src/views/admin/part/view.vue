<template>
  <div v-loading="listLoading" class="app-container">
    <div class="admin-part-1">
      <h3>基本信息</h3>
      <el-row style="margin-top: 40px;">
        <el-col :span="8">总包合同编号：{{ task_info.task_id_code }}</el-col>
        <el-col :span="8">机构名称：{{ task_info.mcn_name }}</el-col>
        <el-col :span="8">任务总额：{{ task_info.task_amount }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">任务名称：{{ task_info.task_name }}</el-col>
        <el-col :span="8">提交时间：{{ task_info.release_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</el-col>
        <el-col :span="8">状态：{{ task_info.contract_type }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          任务说明：
        </el-col>
        <el-col :span="22">
          <div type="html" style="margin-left: -3.5%;">
            <pre style="margin-top:0px;">{{ task_info.task_description }}</pre>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-divider />
    <div class="admin-part-2">
      <h3>分包详细</h3>
      <el-table
        :data="branch_list"
        border
        fit
        highlight-current-row
        style="width: 100%; margin-top: 20px; margin-bottom: 50px;"
        max-height="400"
      >
        <el-table-column label="分包合同编号" prop="id" align="center">
          <template slot-scope="{row}">
            <span>{{ row.contract_code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="建议承接人" align="center">
          <template slot-scope="{row}">
            <span>{{ row.anchor_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" align="center">
          <template slot-scope="{row}">
            <span>{{ row.anchor_tel }}</span>
          </template>
        </el-table-column>
        <el-table-column label="身份证" align="center">
          <template slot-scope="{row}">
            <span>{{ row.id_card }}</span>
          </template>
        </el-table-column>
        <el-table-column label="任务总额" align="center">
          <template slot-scope="{row}">
            <span>{{ row.task_amount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="代缴税额" align="center">
          <template slot-scope="{row}">
            <span>{{ row.pay_tax }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-divider />
    <div slot="footer">
      <el-button type="primary" :disabled="is_disabled" @click="submitForm()">{{ actType | contentFilter }}</el-button>
      <el-button type="primary" @click="chanel()">返回</el-button>
    </div>
  </div>
</template>

<script>
import { branchtaskinfo, branchtaskrelease, surerelease } from '@/api/admin/part'

export default {
  filters: {
    contentFilter(status) {
      const statusMap = {
        1: '发包',
        4: '确认',
        5: '确认',
        6: '确认'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      listLoading: true,
      task_info: {},
      branch_list: null,
      taskid: undefined,
      actType: undefined,
      is_disabled: false
    }
  },
  created() {
    const id = this.$route.query && this.$route.query.id
    const actType = this.$route.query && this.$route.query.actType
    if (id) {
      this.getData(id)
      this.taskid = id
    }
    if (actType) {
      this.actType = actType
      if (actType === 1 || actType === 4) {
        this.is_disabled = false
      } else {
        this.is_disabled = true
      }
    }
  },
  methods: {
    getData(id) {
      this.listLoading = true
      const datas = {
        taskid: id
      }
      branchtaskinfo(datas).then(response => {
        if (response && response.code === 1) {
          this.task_info = response.data && response.data.task_info && response.data.task_info[0]
          this.branch_list = response.data && response.data.branch_list
        } else {
          this.$message.error(response.msg)
        }

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 200)
      })
    },
    submitForm() {
      const datas = {
        taskid: this.taskid
      }
      if (this.actType === 1) {
        // 未处理分包任务发布
        branchtaskrelease(datas).then(response => {
          if (response && response.code === 1) {
            this.$message.success('操作成功')
          } else {
            this.$message.error(response.msg)
          }
        })
      } else if (this.actType === 4) {
        // 待审核确认分包任务发布
        surerelease(datas).then(response => {
          if (response && response.code === 1) {
            this.$message.success('操作成功')
          } else {
            this.$message.error(response.msg)
          }
        })
      }
    },
    chanel() {
      this.$router.go(-1)
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
.admin-part-1 .el-row {
  margin-bottom: 20px;
  font-size: 14px;
}
</style>
