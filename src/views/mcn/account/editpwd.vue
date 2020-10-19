<template>
  <div class="app-container">
    <el-tabs v-model="activeName" style="margin-right: 10px; margin-left: 10px; margin-bottom: 30px;" @tab-click="handleClick">
      <el-tab-pane label="基本资料" name="information" />
      <el-tab-pane label="修改密码" name="editpwd" />
      <el-tab-pane label="开票信息" name="billing" />
      <el-tab-pane label="相关资质" name="qualifications" />
    </el-tabs>
    <el-form ref="dataForm" label-position="left" :model="dataForm" :rules="rules" label-width="120px">
      <el-form-item label="旧密码：" prop="oldpass" style="width:40%;">
        <el-input v-model="dataForm.oldpass" type="password" placeholder="6位数字和字母组合" />
      </el-form-item>
      <el-form-item label="新密码：" prop="newpass" style="width:40%;">
        <el-input v-model="dataForm.newpass" type="password" placeholder="6位数字和字母组合" />
      </el-form-item>
      <el-form-item label="确认密码：" prop="repeatpass" style="width:40%;">
        <el-input v-model="dataForm.repeatpass" type="password" placeholder="6位数字和字母组合" />
      </el-form-item>
      <el-form-item label="图片验证码：" prop="captcha" style="width:40%;">
        <el-input v-model="dataForm.captcha" placeholder="请输入验证码" />
        <span v-loading="listLoading" style="position: absolute; height:34px; width: 100px;margin-left: 20px;cursor: pointer;" @click="getImgverif">
          <img :src="verify_img" style="width:100%;height: 100%;" placeholder="短信验证码" alt="点击更换" title="点击更换">
        </span>
      </el-form-item>
    </el-form>
    <el-divider />

    <div slot="footer" style="margin-top:50px;">
      <el-button type="primary" @click="submitForm()">保存</el-button>
    </div>
  </div>
</template>

<script>
import { getimgverif } from '@/api/anchor'
import { editmcnpass } from '@/api/mcn/account'
import { validPwd } from '@/utils/validate'

const defaultForm = {
  oldpass: undefined,
  newpass: undefined,
  repeatpass: undefined,
  captcha: undefined,
  verify_key: undefined
}

export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value) {
        if (value.length >= 6) {
          if (validPwd(value)) {
            callback()
          } else {
            callback(new Error('请输入6位数字和字母组合'))
          }
        } else {
          callback(new Error('请输入6位数字和字母组合'))
        }
      } else {
        callback(new Error('不能为空'))
      }
    }
    const validateNewPassword = (rule, value, callback) => {
      if (value) {
        if (value === this.dataForm.oldpass) {
          callback(new Error('新密码不能和旧密码一致'))
        }
        if (value.length >= 6) {
          if (validPwd(value)) {
            callback()
          } else {
            callback(new Error('请输入6位数字和字母组合'))
          }
        } else {
          callback(new Error('请输入6位数字和字母组合'))
        }
      } else {
        callback(new Error('不能为空'))
      }
    }
    const validatePassword2 = (rule, value, callback) => {
      if (value) {
        if (value.length >= 6) {
          if (validPwd(value)) {
            if (this.dataForm.newpass !== value) {
              callback(new Error('二次密码不一致'))
            }
            callback()
          } else {
            callback(new Error('请输入6位数字和字母组合'))
          }
        } else {
          callback(new Error('请输入6位数字和字母组合'))
        }
      } else {
        callback(new Error('不能为空'))
      }
    }
    return {
      activeName: 'editpwd',
      dataForm: Object.assign({}, defaultForm),
      listLoading: true,
      rules: {
        oldpass: [{ required: true, trigger: 'blur', validator: validatePassword }],
        newpass: [{ required: true, trigger: 'blur', validator: validateNewPassword }],
        repeatpass: [{ required: true, trigger: 'blur', validator: validatePassword2 }],
        captcha: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      verify_img: ''
    }
  },
  created() {
    this.getImgverif()
  },
  methods: {
    submitForm() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          const datas = {
            oldpass: this.dataForm.oldpass,
            newpass: this.dataForm.newpass,
            repeatpass: this.dataForm.repeatpass,
            key: this.dataForm.verify_key,
            captcha: this.dataForm.captcha
          }
          editmcnpass(datas).then(response => {
            if (response && response.code === 1) {
              this.$message.success('保存成功')

              setTimeout(() => {
                this.logout()
              }, 200)
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
    },
    getImgverif() {
      this.listLoading = true
      getimgverif().then(response => {
        if (response && response.code === 1) {
          this.verify_img = response.data[0].url.img
          this.dataForm.verify_key = response.data[0].url.key
        }

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 200)
      })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
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
