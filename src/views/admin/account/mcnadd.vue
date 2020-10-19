<template>
  <div v-loading="listLoading" class="app-container">
    <el-tabs v-model="activeName" style="margin-right: 10px; margin-left: 10px; margin-bottom: 30px;" @tab-click="handleClick">
      <el-tab-pane label="新增MAC账号" name="mcnadd" />
      <el-tab-pane label="新增主播账号" name="anchoradd" />
    </el-tabs>
    <el-form ref="dataForm" label-position="left" :model="dataForm" :rules="rules" label-width="120px">
      <h3>个人资料：</h3>
      <el-form-item label="登录账号：" prop="tel" style="width:40%;">
        <el-input v-model="dataForm.tel" placeholder="请输入登录账号" />
      </el-form-item>
      <el-form-item label="MCN名称：" prop="company_name" style="width:40%;">
        <el-input v-model="dataForm.company_name" placeholder="请输入MCN名称" />
      </el-form-item>
      <el-form-item label="机构ID：" prop="mcn_id" style="width:40%;">
        <el-input v-model="dataForm.mcn_id" :disabled="true" />
      </el-form-item>
      <el-form-item label="邀请码：" prop="invitcode" style="width:40%;">
        <el-input v-model="dataForm.invitcode" :disabled="true" />
      </el-form-item>
      <el-form-item label="密码：" prop="pass" style="width:40%;">
        <el-input v-model="dataForm.pass" :disabled="true" />
      </el-form-item>
    </el-form>
    <el-divider />
    <div slot="footer" style="margin-top:50px;">
      <el-button type="primary" @click="submitForm()">保存</el-button>
    </div>
  </div>
</template>

<script>
import { autogener, addmcn } from '@/api/admin/account'
import { validTel } from '@/utils/validate'

const defaultForm = {
  tel: undefined,
  company_name: undefined,
  mcn_id: undefined,
  invitcode: undefined,
  pass: undefined
}

export default {
  data() {
    const validateTel = (rule, value, callback) => {
      if (value) {
        if (validTel(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的手机号'))
        }
      } else {
        callback(new Error('不能为空'))
      }
    }
    return {
      listLoading: true,
      activeName: 'mcnadd',
      dataForm: Object.assign({}, defaultForm),
      rules: {
        tel: [{ required: true, trigger: 'blur', validator: validateTel }],
        company_name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        mcn_id: [{ required: true, message: '不能为空', trigger: 'blur' }],
        invitcode: [{ required: true, message: '不能为空', trigger: 'blur' }],
        pass: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.$refs['dataForm'] !== undefined) {
      this.$refs['dataForm'].resetFields()
    }
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      const datas = {
        type: 'mcn'
      }
      autogener(datas).then(response => {
        if (response && response.code === 1) {
          this.dataForm.mcn_id = response.data.mcn_id
          this.dataForm.invitcode = response.data.invitcode
          this.dataForm.pass = response.data.pass
        } else {
          this.$message.error(response.msg)
        }

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 200)
      })
    },
    handleClick(tab, event) {
      const name = tab.name
      this.$router.push({ path: '/admin-account/' + name })
    },
    submitForm() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          addmcn(this.dataForm).then(response => {
            if (response && response.code === 1) {
              this.$message.success('保存成功')

              if (this.$refs['dataForm'] !== undefined) {
                this.$refs['dataForm'].resetFields()
              }
              this.getData()
            } else {
              this.$message.error(response.msg)
            }
          })
        } else {
          return false
        }
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

