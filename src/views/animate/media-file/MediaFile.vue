<!--
 * @Description: 媒体文件
 * @Author: shenxh
 * @Date: 2022-09-19 13:54:45
 * @LastEditors: shenxh
 * @LastEditTime: 2022-09-19 14:05:31
-->

<template>
  <div class="media-file admin-content">
    <div class="media-file-item">
      <div class="media-file-item-content">
        <video
          autoplay="autoplay"
          loop="loop"
          muted="muted"
          width="184"
          height="184"
        >
          <source src="@/assets/webm/radar.webm" type="video/webm" />
        </video>
      </div>
      <div class="media-file-item-name">.webm</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'media-file',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
}
</script>

<style lang="less" scoped>
.media-file {
  .media-file-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    &:not(:last-child) {
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #000;
    }
    .media-file-item-name {
      margin-top: 10px;
      font-size: 18px;
    }
  }
}
</style>
