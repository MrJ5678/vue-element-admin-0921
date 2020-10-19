<template>
  <div v-loading="listLoading" class="app-container">
    <div style="width:794px;height:1123px;border:1px solid #000000;margin-left:auto;margin-right:auto;padding-left:2%;padding-right:2%;">
      <div id="printOrder-data" class="printOrder-data">
        <ContractMission :html-content="htmlContent" :html-data="htmlData" />
      </div>
    </div>
    <el-divider />
    <div class="txc-footer">
      <el-button type="primary" size="medium" @click="submitForm()">签订</el-button>
      <el-button size="medium" @click="chanel()">返回</el-button>
    </div>
  </div>
</template>

<script>
import { gettaskinfo } from '@/api/mcn/task'
import { adminsign } from '@/api/admin/mission'
import ContractMission from '@/components/Contract/mission'

export default {
  components: { ContractMission },
  data() {
    return {
      listLoading: true,
      htmlData: {
        seal_img: 'http://txcimg.fractalbj.cn/Me8s/2020/09/17/bUploadSingle/1/HPyWl9OtLzHl7J8b.png',
        contract: '',
        tax: '',
        money: ''
      },
      htmlContent: '',
      id: undefined
    }
  },
  created() {
    const id = this.$route.query && this.$route.query.id
    if (id) {
      this.getTaskInfo(id)
      this.id = id
    }
  },
  methods: {
    getTaskInfo(id) {
      this.listLoading = true
      gettaskinfo(id).then(response => {
        if (response && response.code === 1) {
          this.htmlData.tax = response.data.tax
          this.htmlData.money = response.data.task_amount
          this.htmlData.contract = response.data.contract_code
        } else {
          this.$message.error(response.msg)
        }
      })

      // Just to simulate the time of the request
      setTimeout(() => {
        this.listLoading = false
      }, 200)
    },
    submitForm() {
      const datas = {
        taskid: this.id
      }
      adminsign(datas).then(response => {
        if (response && response.code === 1) {
          this.$message.success('操作成功')
        } else {
          this.$message.error(response.msg)
        }
      })
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
</style>
