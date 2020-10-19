<template>
  <div v-loading="listLoading" class="app-container">
    <el-tabs v-model="activeName" style="margin-right: 10px; margin-left: 10px; margin-bottom: 30px;" @tab-click="handleClick">
      <el-tab-pane label="基本资料" name="information" />
      <el-tab-pane label="修改密码" name="editpwd" />
      <el-tab-pane label="开票信息" name="billing" />
      <el-tab-pane label="相关资质" name="qualifications" />
    </el-tabs>
    <el-form ref="dataForm" label-position="left" :model="dataForm" :rules="rules" label-width="100px">
      <h3>基本：</h3>
      <el-form-item label="公司名称：" prop="company_name" style="width:40%;">
        <el-input v-model="dataForm.company_name" />
      </el-form-item>
      <el-form-item label="公司税号：" prop="company_tax" style="width:40%;">
        <el-input v-model="dataForm.company_tax" />
      </el-form-item>
      <el-divider />
      <h3>专票：</h3>
      <el-form-item label="公司电话：" prop="company_tel" style="width:40%;">
        <el-input v-model="dataForm.company_tel" />
      </el-form-item>
      <el-form-item label="公司地址：" prop="company_address" style="width:40%;">
        <el-input v-model="dataForm.company_address" />
      </el-form-item>
      <el-form-item label="公司开户行：" prop="company_open_bank" style="width:40%;">
        <el-input v-model="dataForm.company_open_bank" />
      </el-form-item>
    </el-form>
    <el-divider />
    <div slot="footer" style="margin-top:50px;">
      <el-button type="primary" @click="submitForm()">保存</el-button>
    </div>
  </div>
</template>

<script>
import { getinvoice, setinvoice } from '@/api/mcn/account'

const defaultForm = {
  id: undefined,
  company_name: undefined,
  company_tax: undefined,
  company_tel: undefined,
  company_address: undefined,
  company_open_bank: undefined
}

export default {
  data() {
    return {
      activeName: 'billing',
      dataForm: Object.assign({}, defaultForm),
      listLoading: true,
      rules: {
        company_name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        company_tax: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      getinvoice().then(response => {
        if (response && response.code === 1) {
          this.dataForm = response.data
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
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          const datas = this.dataForm
          setinvoice(datas).then(response => {
            if (response && response.code === 1) {
              this.$message.success('保存成功')
            } else {
              this.$message.error(response.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    handleClick(tab, event) {
      const name = tab.name
      this.$router.push({ path: '/mcn-account/' + name })
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
