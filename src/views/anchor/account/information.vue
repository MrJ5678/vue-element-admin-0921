<template>
  <div v-loading="listLoading" class="app-container">
    <el-tabs v-model="activeName" style="margin-right: 10px; margin-left: 10px; margin-bottom: 30px;" @tab-click="handleClick">
      <el-tab-pane label="基本资料" name="information" />
      <el-tab-pane label="修改密码" name="editpwd" />
      <el-tab-pane label="手机号绑定" name="phone" />
      <el-tab-pane label="收款信息" name="collection" />
      <el-tab-pane label="用工关系" name="relations" />
    </el-tabs>
    <el-form ref="dataForm" label-position="left" :model="dataForm" :rules="rules" label-width="100px">
      <el-form-item label="手机号：" prop="tel" style="width:40%;">
        <el-input v-model="dataForm.tel" />
      </el-form-item>
      <el-form-item label="姓名：" prop="name" style="width:40%;">
        <el-input v-model="dataForm.name" />
      </el-form-item>
      <el-form-item label="身份证号：" prop="idcard" style="width:40%;">
        <el-input v-model="dataForm.idcard" />
      </el-form-item>
      <el-form-item label="主播ID：" style="width:40%;">
        <el-input v-model="anchor_id" :disabled="true" />
      </el-form-item>
    </el-form>
    <el-divider />
    <div slot="footer" style="margin-top:50px;">
      <el-button type="primary" @click="submitForm()">保存</el-button>
    </div>
  </div>
</template>

<script>
import { getanchorid, saveinfo } from '@/api/admin/account'
import { validTel, validName, validIdcart } from '@/utils/validate'

const defaultForm = {
  tel: undefined,
  name: undefined,
  idcard: undefined
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
    return {
      activeName: 'information',
      dataForm: Object.assign({}, defaultForm),
      listLoading: true,
      rules: {
        tel: [{ required: true, trigger: 'blur', validator: validateTel }],
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        idcard: [{ required: true, trigger: 'blur', validator: validateIdcart }]
      },
      anchor_id: undefined
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      getanchorid().then(response => {
        if (response && response.code === 1) {
          this.anchor_id = response.data.anchor_id
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
          saveinfo(datas).then(response => {
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
      this.$router.push({ path: '/anchor-account/' + name })
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
