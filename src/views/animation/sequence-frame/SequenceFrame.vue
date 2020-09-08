<!--
 * @Author: shenxh
 * @Date: 2020-09-07 09:06:54
 * @LastEditors: shenxh
 * @LastEditTime: 2020-09-08 08:51:06
 * @Description: 序列帧
-->

<template>
  <div class="sequence-frame admin-content">
    <div class="sequence-frame-wrap">
      <div id="demo1" ref="demo1" class="sequence-frame-item"></div>
      <div class="test"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sequence-frame',
  components: {},
  props: {},
  data() {
    return {
      imgList: []
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getImg();
  },
  beforeDestroy() {},
  methods: {
    getImg() {
      let list = require
        .context('../../../assets/sequence_frame/标识', true, /\.png$/)
        .keys()
        .map(item => item.replace('.', '../../../assets/sequence_frame/标识'));

      // console.log(list);
      this.imgList = list;
      this.getAnimation1();
    },
    getAnimation1() {
      // 123
    }
  }
};
</script>

<style scoped lang="less">
.sequence-frame {
  .sequence-frame-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    min-height: 100%;
    border: 1px solid #efefef;
    overflow: auto;
    .sequence-frame-item {
      flex-shrink: 0;
      width: 33.3%;
      height: 50%;
      border-bottom: 1px solid #efefef;
      background-size: 100% 100%;
      &:not(:nth-of-type(3n)) {
        border-right: 1px solid #efefef;
      }
    }
    .test {
      width: 33.3%;
      height: 50%;
      background: url('../../../assets/sequence_frame/标识/标识_0000.png');
      background-size: 100% 100%;
    }
  }
}
</style>
