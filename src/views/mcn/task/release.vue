<template>
  <div v-loading="listLoading" class="app-container">
    <div style="txccs-el-steps">
      <el-steps :active="active" align-center>
        <el-step title="填写任务信息" />
        <el-step title="确认任务信息" />
        <el-step title="签署合同" />
      </el-steps>
    </div>

    <div v-if="active===0" class="form1">
      <el-form ref="dataForm1" :model="dataForm1" :rules="rules1" class="form-container" label-width="120px" label-position="left">
        <el-form-item label="任务ID：" prop="task_id" style="width:40%;">
          <el-input v-model="dataForm1.task_id" disabled="disabled" />
        </el-form-item>
        <el-form-item label="任务名称：" prop="task_name" style="width:80%;">
          <el-input v-model="dataForm1.task_name" />
        </el-form-item>
        <el-form-item label="任务描述：" prop="task_description" style="width:80%;">
          <el-input v-model="dataForm1.task_description" type="textarea" maxlength="200" show-word-limit rows="3" />
        </el-form-item>
        <el-form-item label="任务金额：" prop="task_money" style="width:80%;">
          <el-input-number v-model="dataForm1.task_money" :min="0" :controls="false" style="width:40%;" /> 元
        </el-form-item>
        <el-form-item label="综合税费率：" prop="task_tax" style="width:80%;">
          <el-input-number v-model="dataForm1.task_tax" :min="0" :max="100" :controls="false" style="width:40%;" /> %
        </el-form-item>
        <el-form-item label="任务明细：" prop="task_detail" style="width:80%;">
          <div class="upload-demo-wap">
            <el-row style="margin-bottom:100px">
              <el-col v-for="(_item,_index) in fileList" :key="_index" :span="8">
                <el-row>
                  <el-col :span="6">
                    <i class="el-icon-s-order" style="font-size:5em;" />
                  </el-col>
                  <el-col :span="18">
                    {{ _item.name }} <br> <i class="el-icon-delete" style="cursor:pointer;" @click="thisRemove(_index)" />
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-upload
              class="upload-demo"
              accept=".xls,.xlsx"
              :action="upload_url"
              name="file_name"
              :headers="myHeaders"
              :on-success="handleSuccess"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传xlsx格式文件，文件不能有空行。</div>
            </el-upload>
          </div>
        </el-form-item>
        <el-divider />

        <div class="txc-footer">
          <el-button type="primary" size="medium" @click="submitForm1()">提交</el-button>
          <el-button size="medium" @click="chanel1()">取消</el-button>
        </div>
      </el-form>
    </div>

    <div v-if="active===1" class="form2">
      <el-divider />

      <el-row>
        <el-col style="font-size:18px; font-weight:bold;">任务信息</el-col>
      </el-row>
      <el-row style="margin-top:15px;height:450px;">
        <el-col :span="8"><span>任务ID：</span><span>{{ dataForm1.task_id }}</span></el-col>
        <el-col :span="8"><span>任务金额：</span><span>{{ dataForm1.task_money }}元</span></el-col>
        <el-col :span="8"><span>综合税费率：</span><span>{{ dataForm1.task_tax }}%</span></el-col>
        <el-col :span="8"><span>任务名称：</span><span>{{ dataForm1.task_name }}</span></el-col>
      </el-row>

      <el-divider />

      <div class="txc-footer">
        <el-button type="primary" size="medium" @click="submitForm2()">确认</el-button>
        <el-button size="medium" @click="chanel2()">返回</el-button>
      </div>
    </div>

    <div v-if="active===2" class="form3">
      <el-divider />
      <div style="width:794px;height:1123px;border:1px solid #000000;margin-left:auto;margin-right:auto;padding-left:2%;padding-right:2%;">
        <div id="printOrder-data" class="printOrder-data">
          <ContractMission :html-content="htmlContent" :html-data="htmlData" />
        </div>
      </div>
      <el-divider />

      <div class="txc-footer">
        <el-button type="primary" size="medium" @click="submitForm3()">确认</el-button>
        <el-button size="medium" @click="chanel3()">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { task, uptask, getcontract, signcontract, submitcontract, gettaskinfo } from '@/api/mcn/task'
import { getToken } from '@/utils/auth'
import ContractMission from '@/components/Contract/mission'

const defaultForm1 = {
  id: undefined,
  task_id: undefined,
  task_name: undefined,
  task_description: undefined,
  task_money: 0,
  task_tax: 0,
  task_detail: []
}

export default {
  components: { ContractMission },
  data() {
    return {
      listLoading: true,
      dataForm1: Object.assign({}, defaultForm1),
      active: 0,
      rules1: {
        task_id: [{ required: true, message: '不能为空', trigger: 'blur' }],
        task_name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        task_description: [{ required: true, message: '不能为空', trigger: 'blur' }],
        task_money: [{ required: true, message: '不能为空', trigger: 'blur' }],
        task_tax: [{ required: true, message: '不能为空', trigger: 'blur' }],
        task_detail: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      upload_url: process.env.VUE_APP_UPLOAD_URL,
      myHeaders: { token: getToken() },
      fileList: [],
      htmlData: {
        seal_img: 'http://txcimg.fractalbj.cn/Me8s/2020/09/17/bUploadSingle/1/HPyWl9OtLzHl7J8b.png',
        contract: '',
        tax: '',
        money: ''
      },
      htmlContent: ''
    }
  },
  created() {
    if (this.$refs['dataForm1'] !== undefined) {
      this.$refs['dataForm1'].resetFields()
    }
    const id = this.$route.query && this.$route.query.id
    if (id) {
      this.getTaskInfo(id)
    } else {
      this.getTask()
    }
  },
  methods: {
    getTask() {
      this.listLoading = true
      task().then(response => {
        if (response && response.code === 1) {
          this.dataForm1.task_id = response.data.task_id
          this.dataForm1.task_tax = Number(response.data.tax) * 100
        } else {
          this.$message.error(response.msg)
        }

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 200)
      })
    },
    getTaskInfo(id) {
      this.listLoading = true
      gettaskinfo(id).then(response => {
        if (response && response.code === 1) {
          console.log(response)
          this.dataForm1.id = response.data.id
          this.dataForm1.task_id = response.data.task_id
          this.dataForm1.task_name = response.data.task_name
          this.dataForm1.task_description = response.data.task_description
          this.dataForm1.task_money = response.data.task_money
          this.dataForm1.task_tax = response.data.tax
          this.dataForm1.task_detail = response.data.task_detail
        } else {
          this.$message.error(response.msg)
        }
      })

      // Just to simulate the time of the request
      setTimeout(() => {
        this.listLoading = false
      }, 200)
    },
    chanel1() {
      this.$refs['dataForm1'].resetFields()
      this.fileList = []
    },
    submitForm1() {
      this.$refs.dataForm1.validate(valid => {
        if (valid) {
          const datas = {
            task_id: this.dataForm1.task_id,
            task_tax: Number(this.dataForm1.task_tax) / 100,
            task_name: this.dataForm1.task_name,
            task_description: this.dataForm1.task_description,
            task_money: this.dataForm1.task_money,
            task_detail: this.dataForm1.task_detail.join(',') + ','
          }
          uptask(datas).then(response => {
            if (response && response.code === 1) {
              this.active = 1
            } else {
              this.$message.error(response.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    chanel2() {
      this.active = 0
    },
    submitForm2() {
      const datas = {
        task_id: this.dataForm1.task_id
      }
      getcontract(datas).then(response => {
        if (response && response.code === 1) {
          this.htmlData.contract = response.data.contract_id
          this.htmlData.tax = this.dataForm1.task_tax
          this.htmlData.money = this.dataForm1.task_money
          this.active = 2
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    submitForm3() {
      const that = this
      const datas = {
        task_id: this.dataForm1.task_id,
        partyb: '大平台',
        partyb_id_card: '230227199010280011',
        partyb_id_tel: '15046779533'
      }
      signcontract(datas).then(response => {
        if (response && response.code === 1) {
          const datas2 = {
            task_id: that.dataForm1.task_id
          }
          submitcontract(datas2).then(response => {
            if (response && response.code === 1) {
              that.$notify({
                title: '成功',
                message: '成功',
                type: 'success',
                duration: 2000
              })

              that.$router.push({ path: '/mcn-task/list' })
            } else {
              that.$message.error(response.msg)
            }
          })
        } else {
          that.$message.error(response.msg)
        }
      })
    },
    chanel3() {
      this.active = 1
    },
    thisRemove(index) {
      const that = this
      that.$confirm('确认操作？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.fileList.splice(index, 1)
        that.dataForm1.task_detail.splice(index, 1)
      }).catch(() => {

      })
    },
    handleSuccess(response, file, fileList) {
      if (response && response.code && response.code === 1) {
        this.dataForm1.task_detail.push(response.data.file_name)
        this.fileList.push({
          uid: file.uid,
          status: file.status,
          name: file.name,
          url: response.data.file_name
        })
      } else {
        this.$message.error('上传失败')
        return false
      }
    }
  }
}
</script>

<style scoped>
.el-steps {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
.form1 {
  margin-top: 40px;
}
.form1 .upload-demo-wap {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
}
.app-container {
  background-color: #fff;
  width: 98%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 100px;
}
.form2 .el-col-8 {
  margin-bottom: 35px;
  font-size:14px;
}
</style>

<style>
.form1 .el-upload-list {
  display: none !important;
}
</style>
