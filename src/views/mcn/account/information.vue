<template>
  <div v-loading="listLoading" class="app-container">
    <el-tabs v-model="activeName" style="margin-right: 10px; margin-left: 10px; margin-bottom: 30px;" @tab-click="handleClick">
      <el-tab-pane label="基本资料" name="information" />
      <el-tab-pane label="修改密码" name="editpwd" />
      <el-tab-pane label="开票信息" name="billing" />
      <el-tab-pane label="相关资质" name="qualifications" />
    </el-tabs>
    <el-form ref="dataForm" label-position="left" :model="dataForm" :rules="rules" label-width="100px">
      <el-form-item label="登录账号：" style="width:40%;">
        <el-input v-model="dataForm.username" :disabled="true" />
      </el-form-item>
      <el-form-item label="MCN名称：" prop="mcn_name" style="width:40%;">
        <el-input v-model="dataForm.mcn_name" /><el-tag>第一次登录的时候可修改</el-tag>
      </el-form-item>
      <el-form-item label="机构ID：" style="width:40%;">
        <el-input v-model="dataForm.mcn_id" :disabled="true" />
      </el-form-item>
    </el-form>
    <el-divider />
    <div slot="footer" style="margin-top:50px;">
      <el-button type="primary" @click="submitForm()">保存</el-button>
    </div>
  </div>
</template>

<script>
import { getmcninfo, savemcninfo } from '@/api/mcn/account'

const defaultForm = {
  username: undefined,
  mcn_name: undefined,
  mcn_id: undefined
}

export default {
  data() {
    return {
      activeName: 'information',
      dataForm: Object.assign({}, defaultForm),
      listLoading: true,
      rules: {
        mcn_name: [{ required: true, message: '不能为空', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      getmcninfo().then(response => {
        if (response && response.code === 1) {
          this.dataForm.username = response.data.username
          this.dataForm.mcn_name = response.data.mcn_name
          this.dataForm.mcn_id = response.data.mcn_id
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
          const datas = {
            mcnname: this.dataForm.mcn_name,
            username: this.dataForm.username,
            mcnid: this.dataForm.mcn_id
          }
          savemcninfo(datas).then(response => {
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
