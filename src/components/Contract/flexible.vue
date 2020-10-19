<template>
  <div class="contract-content" type="html" style="word-break: break-all;">
    <p style="text-align: center; font-size: 24px;">
      <strong>灵活用工合同</strong>
    </p>
    <p style="text-align: right;">
      <strong v-if="htmlData && htmlData.contract">合同编号：____<span style="text-decoration: underline;">{{ htmlData.contract }}</span>____</strong>
      <strong v-else>合同编号：________________</strong>
    </p>
    <p style="text-align: left;">
      <strong>委托方（甲方）：__________________<span style="text-decoration: underline;">MCN公司</span>__________________</strong>
    </p>
    <p style="text-align: left;">
      <strong>执行方（乙方）：_____________________________________________</strong>
    </p>
    <p style="text-align: left;">
      <strong>身份证号：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;_____________________________________________</strong>
    </p>
    <p style="text-align: left;">
      <strong>联系方式：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;_____________________________________________</strong>
    </p>
    <p style="text-align: left;">
      &nbsp;
    </p>
    <div id="u7025" class="ax_default _文本段落">
      <div id="u7025_text" class="text ">
        <p>
          <strong>一、甲方向乙方购买的服务项目如下：</strong>
        </p>
      </div>
    </div>
    <div id="u7026" class="ax_default _文本段落">
      <div id="u7026_text" class="text ">
        <p>
          MCN公司委托陶溪川给主播发布任务
        </p>
      </div>
    </div>
    <div id="u7027" class="ax_default _文本段落">
      <div id="u7027_div" class="">
        &nbsp;
      </div>
      <div id="u7027_text" class="text ">
        <p>
          <strong>二、费用支付：</strong>
        </p>
      </div>
    </div>
    <div id="u7031" class="ax_default _文本段落">
      <div id="u7031_text" class="text ">
        <p v-if="htmlData && htmlData.money">
          1、本项目涉及总金额为人民币 ___<span style="text-decoration: underline;">{{ htmlData.money }}</span>___ (￥元)；
        </p>
        <p v-else>
          1、本项目涉及总金额为人民币 ____________ (￥元)；
        </p>
      </div>
    </div>
    <div id="u7033" class="ax_default _文本段落">
      <div id="u7033_div" class="">
        2、综合税费率：{{ htmlData.tax }}%；
      </div>
    </div>
    <div class="">
      &nbsp;
    </div>
    <!-- <div class="">
      <div id="u7034" class="ax_default _文本段落">
        <div id="u7034_text" class="text ">
          <p>
            <strong>三、法律适用及争议解决</strong>
          </p>
        </div>
      </div>
      <div id="u7036" class="ax_default _文本段落">
        <div id="u7036_text" class="text ">
          <p>
            1、本合同的订立、执行和解释及争议的解决均应适用中华人民共和国法律。
          </p>
        </div>
      </div>
      <div id="u7037" class="ax_default _文本段落">
        <div id="u7037_text" class="text ">
          <p>
            2、如各方就本合同内容或其执行发生任何争议，应友好协商；协商不成时，任何一方均可将争议或纠纷ᨀ交所在地的人民法院裁决。
          </p>
        </div>
      </div>
    </div> -->
    <div v-html="htmlContent" />
    <p>
      &nbsp;
    </p>
    <p>
      &nbsp;
    </p>
    <div v-if="htmlData && htmlData.seal_img" style="position: relative;width: 100px;height: 100px; background-size: 100% auto;top:70px;left:170px;">
      <img :src="htmlData.seal_img" style="width: 100px;height: 100px;">
    </div>
    <table style="border-collapse: collapse; width: 100%;" border="0">
      <tbody>
        <tr style="height:100px;">
          <td style="width: 50%;">
            <strong>甲方（签字）：</strong><strong>____________________________</strong>
          </td>
          <td style="width: 50%;">
            <strong>乙方（签字）：</strong><strong>____________________________</strong>
          </td>
        </tr>
        <tr>
          <td style="width: 50%;">
            <strong>签订日期：____________ 年 ______ 月 ______ 日</strong>
          </td>
          <td style="width: 50%;">
            <strong>签订日期：____________ 年 ______ 月 ______ 日</strong>
          </td>
        </tr>
      </tbody>
    </table>
    <div id="u7040" class="ax_default _文本段落">
      &nbsp;
    </div>
    <div id="u7055" class="ax_default _文本段落">
      <div id="u7055_text" class="text ">
        <p>
          &nbsp;
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContractFlexible',
  props: {
    htmlContent: {
      type: String,
      default() {
        return ''
      }
    },
    htmlData: {
      type: Object,
      default() {
        return {
          seal_img: '', // 印章
          tax: 0, // 税率
          money: 0, // 金额
          contract: '' // 合同编号
        }
      }
    }
  }
}
</script>

