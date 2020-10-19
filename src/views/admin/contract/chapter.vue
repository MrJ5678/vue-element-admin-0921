<template>
  <div v-loading="listLoading" class="app-container">
    <el-form ref="dataForm" label-position="left" :model="dataForm" :rules="rules" label-width="120px">
      <el-form-item label="签章信息" prop="filename">
        <UploadSingle :url="updateUrl" name="filename" :lists="dataForm.filename" accept=".png" :limit="1" @uplaodsChange="watchUploadValue" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UploadSingle from '@/components/Upload/UploadSingle'

const defaultForm = {
  filename: []
}

export default {
  components: { UploadSingle },
  data() {
    return {
      dataForm: Object.assign({}, defaultForm),
      listLoading: true,
      rules: {
        filename: [{ required: true, message: '不能为空', trigger: 'change' }]
      },
      updateUrl: process.env.VUE_APP_BASE_API + '/admin_chapter'
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = false
    },
    watchUploadValue(val) {
      this.dataForm.filename = val
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
