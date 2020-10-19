<template>
  <div>
    <el-upload
      :action="url"
      :file-list="lists"
      :on-success="handleSuccess"
      :accept="accept"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :before-upload="beforeAvatarUpload"
      :limit="limit"
      :name="name"
      :data="params"
      :class="enableUp"
      :headers="headers"
    >
      <i class="el-icon-plus" />
      <div slot="tip" class="el-upload__tip">
        只能上传{{ accept }}格式文件，文件不能超过5MB 最多可上传 {{ limit }} 张
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth' // get token from cookie

export default {
  name: 'UploadSingle',
  props: {
    lists: {
      type: Array,
      default() {
        return []
      }
    },
    limit: {
      type: Number,
      default() {
        return 1
      }
    },
    params: {
      type: Object,
      default() {
        return {}
      }
    },
    url: {
      type: String,
      default() {
        return ''
      }
    },
    accept: {
      type: String,
      default() {
        return '.jpg'
      }
    },
    name: {
      type: String,
      default() {
        return 'file_name'
      }
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      enableUp: 'show-el-upload',
      headers: {
        token: getToken()
      }
    }
  },
  watch: {
    lists(value) {
      if (value.length >= this.limit) {
        this.enableUp = 'hide-el-upload'
      } else {
        this.enableUp = 'show-el-upload'
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      const datas = this.lists
      for (const index in datas) {
        if (datas[index]['uid'] === file['uid']) {
          this.lists.splice(index, 1)
        }
      }
      this.changeValue(this.lists)
    },
    handleSuccess(res, file, fileList) {
      if (res.code === 1) {
        if (this.lists) {
          this.lists.push({
            id: file.uid,
            url: res.data.pic_url || res.data.file_path,
            file_name: res.data.file_name
          })
        } else {
          this.lists = [{
            id: file.uid,
            url: res.data.pic_url || res.data.file_path,
            file_name: res.data.file_name
          }]
        }
        this.changeValue(this.lists)
      } else {
        this.$message.error('上传图片失败')
        return false
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5MB!')
      }
      return isLt2M
    },
    changeValue(value) {
      this.$emit('uplaodsChange', value)
    }
  }
}
</script>
<style>
.show-el-upload .el-upload--picture-card {
  display: inline-block
}
.hide-el-upload .el-upload--picture-card {
  display: none
}
</style>
