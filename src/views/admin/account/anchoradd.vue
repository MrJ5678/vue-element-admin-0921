<template>
  <div v-loading="listLoading" class="app-container">
    <el-tabs v-model="activeName" style="margin-right: 10px; margin-left: 10px; margin-bottom: 30px;" @tab-click="handleClick">
      <el-tab-pane label="新增MAC账号" name="mcnadd" />
      <el-tab-pane label="新增主播账号" name="anchoradd" />
    </el-tabs>
    <el-form ref="dataForm" label-position="left" :model="dataForm" :rules="rules" label-width="120px">
      <h3>个人资料：</h3>
      <el-form-item label="手机号：" prop="tel" style="width:40%;">
        <el-input v-model="dataForm.tel" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="姓名：" prop="name" style="width:40%;">
        <el-input v-model="dataForm.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="身份证号：" prop="idcard" style="width:40%;">
        <el-input v-model="dataForm.idcard" placeholder="请输入身份证号" />
      </el-form-item>
      <el-form-item label="主播ID：" prop="anchor_id" style="width:40%;">
        <el-input v-model="dataForm.anchor_id" :disabled="true" />
      </el-form-item>
      <el-form-item label="密码：" prop="pass" style="width:40%;">
        <el-input v-model="dataForm.pass" :disabled="true" />
      </el-form-item>
      <el-divider />
      <h3>收款信息：</h3>
      <el-form-item label="银行卡号：" prop="bankid" style="width:40%;">
        <el-input v-model="dataForm.bankid" placeholder="请输入银行卡号" />
      </el-form-item>
      <el-form-item label="公司开户行：" prop="openbank" style="width:40%;">
        <el-input v-model="dataForm.openbank" placeholder="公司开户行" />
      </el-form-item>
    </el-form>
    <h3>用工关系</h3>
    <el-divider />
    <el-row>
      <el-col :span="2">灵活用工合同</el-col>
      <el-col :span="21" align="right">>></el-col>
    </el-row>
    <el-divider />
    <div slot="footer" style="margin-top:50px;">
      <el-button type="primary" @click="submitForm()">保存</el-button>
    </div>
  </div>
</template>

<script>
import { autogener, addanchor } from '@/api/admin/account'
import { validTel, validName, validIdcart, validNumber } from '@/utils/validate'

const defaultForm = {
  tel: undefined,
  name: undefined,
  idcard: undefined,
  anchor_id: undefined,
  pass: undefined,
  bankid: undefined,
  openbank: undefined
}

export default {
  data() {
    const validateTel = (rule, value, callback) => {
      if (value) {
        if (validTel(value)) {
          callback()
        } else {
          callback(new Error('格式有误'))
        }
      } else {
        callback(new Error('不能为空'))
      }
    }
    const validateName = (rule, value, callback) => {
      if (value) {
        if (validName(value)) {
          callback()
        } else {
          callback(new Error('请输入2-4位汉字'))
        }
      } else {
        callback(new Error('不能为空'))
      }
    }
    const validateIdcart = (rule, value, callback) => {
      if (value) {
        if (validIdcart(value)) {
          callback()
        } else {
          callback(new Error('身份证号有误'))
        }
      } else {
        callback(new Error('不能为空'))
      }
    }
    const validateNumber = (rule, value, callback) => {
      if (value) {
        if (validNumber(value)) {
          callback()
        } else {
          callback(new Error('只能输入数字'))
        }
      } else {
        callback(new Error('不能为空'))
      }
    }
    return {
      listLoading: true,
      activeName: 'anchoradd',
      dataForm: Object.assign({}, defaultForm),
      rules: {
        tel: [{ required: true, trigger: 'blur', validator: validateTel }],
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        idcard: [{ required: true, trigger: 'blur', validator: validateIdcart }],
        anchor_id: [{ required: true, message: '不能为空', trigger: 'blur' }],
        pass: [{ required: true, message: '不能为空', trigger: 'blur' }],
        bankid: [{ required: true, trigger: 'blur', validator: validateNumber }],
        openbank: [{ required: true, message: '不能为空', trigger: 'blur' }]
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
        type: 'anchor'
      }
      autogener(datas).then(response => {
        if (response && response.code === 1) {
          this.dataForm.anchor_id = response.data.anchor_id
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
          addanchor(this.dataForm).then(response => {
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

