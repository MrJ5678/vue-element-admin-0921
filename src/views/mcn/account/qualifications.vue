<template>
  <div v-loading="listLoading" class="app-container">
    <el-tabs v-model="activeName" style="margin-right: 10px; margin-left: 10px; margin-bottom: 30px;" @tab-click="handleClick">
      <el-tab-pane label="基本资料" name="information" />
      <el-tab-pane label="修改密码" name="editpwd" />
      <el-tab-pane label="开票信息" name="billing" />
      <el-tab-pane label="相关资质" name="qualifications" />
    </el-tabs>
    <el-form ref="dataForm" label-position="left" :model="dataForm" :rules="rules" label-width="120px">
      <el-form-item label="签章信息" prop="signature_pic">
        <UploadSingle :url="updateUrl" :lists="dataForm.signature_pic" :params="{type: 1}" accept=".png" :limit="1" @uplaodsChange="watchUploadValue" />
      </el-form-item>
      <el-form-item label="相关资质" prop="credentials_pics">
        <UploadSingle :url="updateUrl" :lists="dataForm.credentials_pics" :params="{type: 2}" accept=".png,.jpg" :limit="9" @uplaodsChange="watchUploadValue2" />
      </el-form-item>
    </el-form>
    <el-divider />
    <div slot="footer" style="margin-top:50px;">
      <el-button type="primary" @click="submitForm()">保存</el-button>
    </div>
  </div>
</template>

<script>
import { getcredentials, setcredentials } from '@/api/mcn/account'
import UploadSingle from '@/components/Upload/UploadSingle'

const defaultForm = {
  signature_pic: [],
  credentials_pics: []
}

export default {
  components: { UploadSingle },
  data() {
    return {
      activeName: 'qualifications',
      dataForm: Object.assign({}, defaultForm),
      listLoading: true,
      rules: {
        signature_pic: [{ required: true, message: '不能为空', trigger: 'change' }],
        credentials_pics: [{ required: true, message: '不能为空', trigger: 'change' }]
      },
      updateUrl: process.env.VUE_APP_BASE_API + '/cuploadfile'
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      getcredentials().then(response => {
        if (response && response.code === 1) {
          if (response && response.data && response.data.signature_pic && response.data.signature_pic.file_name) {
            const signature_pic = []
            signature_pic.push({
              id: 1,
              url: response.data.signature_pic.pic_url,
              file_name: response.data.signature_pic.file_name
            })
            this.dataForm.signature_pic = signature_pic
          }

          if (response && response.data && response.data.credentials_pics && response.data.credentials_pics.length > 0) {
            const credentials_pics = []
            for (let i = 0; i < response.data.credentials_pics.length; i++) {
              credentials_pics.push({
                id: i,
                url: response.data.credentials_pics[i]['pic_url'],
                file_name: response.data.credentials_pics[i]['file_name']
              })
            }
            this.dataForm.credentials_pics = credentials_pics
          }
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
          const signature_pic = this.dataForm['signature_pic'][0]['file_name']
          const credentials_pics = []
          for (let i = 0; i < this.dataForm.credentials_pics.length; i++) {
            credentials_pics.push(this.dataForm.credentials_pics[i]['file_name'])
          }

          const datas = {
            signature_pic: signature_pic,
            credentials_pics: credentials_pics.join(',') + ','
          }
          setcredentials(datas).then(response => {
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
    watchUploadValue(val) {
      this.dataForm.signature_pic = val
    },
    watchUploadValue2(val) {
      this.dataForm.credentials_pics = val
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
