<template>
  <div v-loading="listLoading" class="app-container">
    <div class="form">
      <el-form ref="dataForm" :model="dataForm" :rules="rules" class="form-container" label-width="120px" label-position="left" style="height:350px;">
        <el-form-item label="综合税费率：" prop="task_tax" style="width:80%;">
          <el-input-number v-model="dataForm.task_tax" :min="0" :max="100" :controls="false" style="width:40%;" /> %
        </el-form-item>
      </el-form>
      <el-divider />
      <div class="txc-footer">
        <el-button type="primary" size="medium" @click="submitForm()">提交</el-button>
        <el-button size="medium" @click="chanel()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getTax, saveTax } from '@/api/admin/tax'

export default {
  data() {
    return {
      listLoading: true,
      dataForm: {
        task_tax: 0
      },
      rules: {
        task_tax: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getTagData()
  },
  methods: {
    getTagData() {
      this.listLoading = true
      getTax().then(response => {
        this.dataForm.task_tax = response.data.tax

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
            tax: this.dataForm.task_tax
          }
          saveTax(datas).then(response => {
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
    chanel() {
      this.getTagData()
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
