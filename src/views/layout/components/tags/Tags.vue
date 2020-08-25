<!--
 * @Author: shenxh
 * @Date: 2020-08-25 17:53:24
 * @LastEditors: shenxh
 * @LastEditTime: 2020-08-25 18:44:23
 * @Description: 选项卡
-->

<template>
  <div class="tags">
    <div class="tags-wrap">
      <el-tag
        v-for="(item, index) in tagList"
        :key="item.name"
        closable
        :disable-transitions="false"
        :type="$route.name === item.name ? '' : 'info'"
        @close="handleClose(item, index)"
        @click="handleTag(item)"
      >
        {{ item.meta.label }}
      </el-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tags',
  components: {},
  props: {
    currentRouterPath: String
  },
  data() {
    return {
      tagList: [this.$route]
    };
  },
  computed: {},
  watch: {
    currentRouterPath(val) {
      console.log(val);
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleClose(tag, index) {
      // 删除该标签
      if (this.tagList.length) {
        this.tagList.splice(index, 1);
      }
      // 标签列表为空时默认显示第一项
      if (!this.tagList.length) {
        this.tagList[0] = this.menuData[0];
      }
      // 删除当前标签时, 自动跳转至标签列表末项
      if (tag.name === this.$route.name) {
        let endTag = this.tagList[this.tagList.length - 1];
        if (this.$route.path === endTag.path) return;
        this.$router.push(endTag.path);
      }
    },
    handleTag(data) {
      if (this.$route.path === data.path) return;
      this.$router.push(data.path);
    }
  }
};
</script>

<style scoped lang="less">
.tags {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  overflow-x: auto;
  background-color: #fff;
  border-left: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  .tags-wrap {
    display: flex;
    align-items: center;
    margin-top: 2px;
    .el-tag {
      flex-shrink: 0;
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
</style>
