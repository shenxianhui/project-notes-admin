<!--
 * @Author: Shen Xianhui
 * @Date: 2019-07-02 09:34:11
 * @LastEditors  : Wells
 * @LastEditTime : 2020-01-17 09:33:30
 * @Description: 模板-详情页
 -->
<template>
  <div class="details-page">
    <!-- 头部 -->
    <div class="det-header">
      <Button label="返回" color="primary-plain" @click="$router.go(-1)"></Button>
    </div>
    <!-- 内容 -->
    <div class="det-body">
      <div class="det-body-inner">
        <div class="det-body-content">
          <div class="module">
            <div class="module-title">
              <h3>信息</h3>
              <span>编辑</span>
            </div>
            <div class="module-content">
              <table>
                <tr>
                  <th><span>标题1_1</span></th>
                  <td><span>内容1_1</span></td>
                  <th><span>标题1_2</span></th>
                  <td><span>内容1_2</span></td>
                </tr>
                <tr>
                  <th><span>标题2_1</span></th>
                  <td><span>内容2_1</span></td>
                  <th><span>标题2_2</span></th>
                  <td><span>内容2_2</span></td>
                </tr>
                <tr>
                  <th><span>标题3_1</span></th>
                  <td><span>内容3_1</span></td>
                  <th><span>标题3_2</span></th>
                  <td><span>内容3_2</span></td>
                </tr>
                <tr>
                  <th><span>标题4_1</span></th>
                  <td><span>内容4_1</span></td>
                  <th><span>标题4_2</span></th>
                  <td><span>内容4_2</span></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button';

export default {
  name: 'DetalisPage',
  components: {
    Button
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  // created() {},
  // mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
@import '../../../style/tablePage.less';
</style>
