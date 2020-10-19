<template>
  <div class="app-container">
    <div style="width:794px;height:1123px;border:1px solid #000000;margin-left:auto;margin-right:auto;padding-left:2%;padding-right:2%;">
      <div id="printOrder-data" class="printOrder-data">
        <ContractMission :html-content="content" />
      </div>
    </div>
    <el-divider />
    <tinymce v-model="content" :height="300" />
    <el-divider />
    <div type="html" style="background-color:#e7faf0;color:#13ce66;padding:10px;line-height:6px;font-size:14px;border-radius:4px;">
      <p>附：浏览器取消页眉页脚设置</p>
      <p>IE浏览器（IE6以后）：工具（页面右上角）、打印、页面设置，在页面设置里取消勾选页眉页脚所有选项</p>
      <p>Chrome：工具（右上角三个点）、打印，在打印页面单机“更多设置”，取消勾选‘页眉页脚’</p>
    </div>
    <el-divider />
    <div class="txc-footer">
      <el-button type="primary" size="medium" @click="submitForm()">保存</el-button>
      <el-button size="medium" @click="chanel()">取消</el-button>
      <el-button size="medium" @click="printPdf()"> 预览</el-button>
    </div>
  </div>
</template>

<script>
import ContractMission from '@/components/Contract/mission'
import Tinymce from '@/components/Tinymce'
import print from 'print-js'

export default {
  components: { ContractMission, Tinymce },
  data() {
    return {
      content: ''
    }
  },
  methods: {
    printPdf() {
      print(
        {
          printable: 'printOrder-data', // 标签元素id
          type: 'html',
          header: '',
          targetStyles: ['*'],
          mediaPrint: false
        }
      )
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

<style media="print">
  @page {
    size: auto;
    margin: 0;
  }
</style>
