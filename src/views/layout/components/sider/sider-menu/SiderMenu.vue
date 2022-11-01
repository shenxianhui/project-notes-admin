<!--
 * @Author: shenxh
 * @Date: 2020-08-26 09:57:55
 * @LastEditors: shenxh
 * @LastEditTime: 2020-08-26 10:32:29
 * @Description: 递归渲染侧边栏 (未完成, 跳转问题暂时无法解决)
-->

<template>
  <div class="xx-menu">
    <div
      v-for="(item, index) in menuData.children"
      :key="index"
      class="menu-wrap"
    >
      <div v-if="item.children" class="menu-item">
        <el-submenu :index="`${menuData.path}/${item.path}`">
          <template slot="title">
            <span>{{ item.meta.label }}</span>
          </template>
          <sider-menu :menu-data="item"></sider-menu>
        </el-submenu>
      </div>
      <div v-else class="menu-item">
        <el-menu-item
          :index="`${menuData.path}/${item.path}`"
          @click="handleMenu(item)"
        >
          <span slot="title">{{ item.meta.label }}</span>
        </el-menu-item>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sider-menu',
  components: {},
  props: {
    menuData: Object,
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleMenu(item) {
      console.log(item)
      // if (this.$route.path === path) return;
      // this.$router.push(path);
    },
  },
}
</script>

<style scoped lang="less"></style>
