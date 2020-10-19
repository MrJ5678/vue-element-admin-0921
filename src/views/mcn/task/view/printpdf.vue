<template>
  <div id="pdfDom" class="app-container">
    开票信息
    <el-button @click="printPdf()">打印合同</el-button>
    <el-button @click="finalSub()">直接生成PDF base64</el-button>
  </div>
</template>

<script>
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import { uploadPdf } from '@/api/mcn/task'

export default {
  created() {
  },
  methods: {
    printPdf() {
      const title = '测试'
      html2Canvas(document.querySelector('#pdfDom'), {
        allowTaint: true
      }).then(canvas => {
        const contentWidth = canvas.width
        const contentHeight = canvas.height
        const pageHeight = contentWidth / 592.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        const imgWidth = 595.28
        const imgHeight = 592.28 / contentWidth * contentHeight
        const pageData = canvas.toDataURL('image/jpeg', 1.0)
        const PDF = new JsPDF('', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save(title + '.pdf')
      })
    },

    finalSub() {
      html2Canvas(document.querySelector('#pdfDom'), {
        allowTaint: true
      }).then(canvas => {
        const contentWidth = canvas.width
        const contentHeight = canvas.height
        const pageHeight = contentWidth / 592.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        const imgWidth = 595.28
        const imgHeight = 592.28 / contentWidth * contentHeight
        const pageData = canvas.toDataURL('image/jpeg', 1.0)
        const PDF = new JsPDF('', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }

        // const datauri = PDF.output('dataurlstring')
        // const base64 = datauri.split('base64,')[1]
        uploadPdf({ base64: 'asdasdasd' }).then(response => {
          if (response && response.code === 200) {
            // this.$notify({
            //   title: '成功',
            //   message: '成功',
            //   type: 'success',
            //   duration: 2000
            // })
            // this.$router.push({ path: '/activities/list' })
          } else {
            // this.$notify.error(response.message)
          }
        })
      })
    }
  }
}
</script>
