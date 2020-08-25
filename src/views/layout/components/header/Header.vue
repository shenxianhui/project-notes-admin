<!--
 * @Author: shenxh
 * @Date: 2020-08-25 09:58:52
 * @LastEditors: shenxh
 * @LastEditTime: 2020-08-25 18:46:12
 * @Description: 顶部导航
-->

<template>
  <div class="header">
    <div class="header-title">小贤笔记</div>
    <div class="header-menu-wrap">
      <ul>
        <li
          v-for="(item, index) in Router"
          :key="index"
          :class="{ active: $route.path.includes(item.path) }"
          @click="$router.push(item.path)"
        >
          {{ item.meta.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Router from '@/router/modules';

export default {
  name: 'main-header',
  components: {},
  props: {},
  data() {
    return {
      Router
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>

<style scoped lang="less">
@import '~@/style/admin.less';

.header {
  position: relative;
  display: flex;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  z-index: 1;
  .header-title {
    flex-shrink: 0;
    text-align: center;
    width: 180px;
    height: 100%;
    line-height: 60px;
    font-size: 20px;
    font-weight: bold;
  }
  .header-menu-wrap {
    width: 100%;
    ul {
      display: flex;
      li {
        height: 100%;
        line-height: 58px;
        font-size: 14px;
        margin: 0 15px;
        border-top: 2px solid transparent;
        color: #000;
        cursor: pointer;
        &:hover {
          color: @xx-color-blue;
        }
        &.active {
          color: @xx-color-blue;
          border-top: 2px solid @xx-color-blue;
        }
      }
    }
  }
}
</style>
