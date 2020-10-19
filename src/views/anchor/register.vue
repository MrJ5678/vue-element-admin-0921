<template>
  <div class="app-warp">
    <div class="app-container">
      <el-form ref="dataForm" style="text-align: center;" label-position="left" :model="dataForm" :rules="rules" label-width="120px">
        <h2>注册</h2>
        <el-form-item label="手机号：" prop="tel">
          <el-input v-model="dataForm.tel" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="dataForm.name" placeholder="请输入手机姓名" />
        </el-form-item>
        <el-form-item label="身份证号：" prop="idcart">
          <el-input v-model="dataForm.idcart" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="密码：" prop="pass">
          <el-input v-model="dataForm.pass" type="password" placeholder="6位数字和字母组合" />
        </el-form-item>
        <el-form-item label="确认密码：" prop="repeatpass">
          <el-input v-model="dataForm.repeatpass" type="password" placeholder="6位数字和字母组合" />
        </el-form-item>
        <el-form-item label="邀请码：" prop="invitcode">
          <el-input v-model="dataForm.invitcode" placeholder="请输入平台发放的邀请码" />
        </el-form-item>
        <el-form-item label="手机验证码：" prop="telverif" style="width:80%;">
          <el-input v-model="dataForm.telverif" placeholder="请输入短信验证码" />
          <span style="position: absolute;" @click="getPhoneverif">
            <el-button size="mini" style="height:34px; width: 100px; margin-left: 20px;" type="primary" :disabled="captchEnabled">{{ captchText }}</el-button>
          </span>
        </el-form-item>
        <el-form-item label="图片验证码：" prop="captcha" style="width:80%;">
          <el-input v-model="dataForm.captcha" placeholder="请输入短信验证码" />
          <span v-loading="listLoading" style="position: absolute; height:34px; width: 100px;margin-left: 20px;cursor: pointer;" @click="getImgverif">
            <img :src="verify_img" style="width:100%;height: 100%;" placeholder="短信验证码" alt="点击更换" title="点击更换">
          </span>
        </el-form-item>
      </el-form>
      <div style="text-align:center;font-size: 14px; color: #606266;">
        <el-checkbox v-model="checked" style="margin-right: 20px;" />
        请阅读并勾选 <span style="color:#000000;cursor: pointer;">服务协议</span> 和 <span style="color:#000000;cursor: pointer;">隐私政策</span>
      </div>
      <div slot="footer" style="margin-left:2%;margin-top:50px;margin-bottom:100px;">
        <el-button style="width: 100%;" type="primary" @click="submitForm()">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getimgverif, register } from '@/api/anchor'
import { validTel, validName, validIdcart, validPwd } from '@/utils/validate'

const defaultForm = {
  tel: undefined,
  name: undefined,
  idcart: undefined,
  pass: undefined,
  repeatpass: undefined,
  invitcode: undefined,
  telverif: undefined,
  captcha: undefined
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
    const validatePassword2 = (rule, value, callback) => {
      if (value) {
        if (value.length >= 6) {
          if (validPwd(value)) {
            if (this.dataForm.pass !== value) {
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
      dataForm: Object.assign({}, defaultForm),
      rules: {
        tel: [{ required: true, trigger: 'blur', validator: validateTel }],
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        idcart: [{ required: true, trigger: 'blur', validator: validateIdcart }],
        pass: [{ required: true, trigger: 'blur', validator: validatePassword }],
        repeatpass: [{ required: true, trigger: 'blur', validator: validatePassword2 }],
        invitcode: [{ required: true, trigger: 'blur', message: '不能为空' }],
        telverif: [{ required: true, trigger: 'blur', message: '不能为空' }],
        captcha: [{ required: true, trigger: 'blur', message: '不能为空' }]
      },
      verify_img: '',
      verify_key: '',
      captchText: '获取验证码',
      captchEnabled: false,
      captchCount: 0,
      captchTime: null,
      listLoading: true,
      checked: true
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
            tel: this.dataForm.tel,
            name: this.dataForm.name,
            idcart: this.dataForm.idcart,
            pass: this.dataForm.pass,
            repeatpass: this.dataForm.repeatpass,
            invitcode: this.dataForm.invitcode,
            telverif: this.dataForm.telverif,
            captcha: this.dataForm.captcha,
            key: this.verify_key
          }

          register(datas).then(response => {
            if (response && response.code === 1) {
              this.$message.success('注册成功')
            } else {
              this.$message.error(response.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    getImgverif() {
      this.listLoading = true
      getimgverif().then(response => {
        if (response && response.code === 1) {
          this.verify_img = response.data[0].url.img
          this.verify_key = response.data[0].url.key
        }

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 200)
      })
    },
    getPhoneverif() {
      if (this.captchCount === 0) {
        if (!validTel(this.dataForm.tel)) {
          this.$message({
            message: '手机号码格式有误',
            type: 'error'
          })
          return false
        }
        this.startTime()

        // const dateForm = {
        //   phone: this.loginForm.forget_phone,
        //   codeType: 5
        // }
        // sendPhone(dateForm).then(data => {
        //   if (data.code !== 200) {
        //     this.$message({
        //       message: data.message,
        //       type: 'error'
        //     })
        //   }
        // })
      }
    },
    startTime() {
      const TIME_COUNT = 60
      if (!this.captchTime) {
        this.captchCount = TIME_COUNT
        this.captchEnabled = true
        this.captchTime = setInterval(() => {
          if (this.captchCount > 0 && this.captchCount <= TIME_COUNT) {
            this.captchCount--
            this.captchText = this.captchCount + '秒'
          } else {
            this.captchEnabled = false
            clearInterval(this.captchTime)
            this.captchTime = null
            this.captchText = '获取验证码'
          }
        }, 1000)
      }
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
  background-color: #F5F7FA;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 100px;
}
.app-warp {
  background-color: #F5F7FA !important;
}
</style>
