<!--
 * @Description: 元素跳动
 * @Author: shenxh
 * @Date: 2023-04-07 14:28:47
 * @LastEditors: shenxh
 * @LastEditTime: 2023-04-07 15:35:55
-->

<template>
  <div class="element-dance admin-content">
    <!-- 方式1 -->
    <div class="element-dance-wrap">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="item"
        :style="{
          position: 'absolute',
          left: position[index][0] + 'px',
          top: position[index][1] + 'px',
        }"
      >
        <span>
          {{ item }}
        </span>
      </div>
    </div>

    <!-- 方式2 -->
    <div class="element-dance-wrap">
      <transition-group
        class="transition-group"
        name="transition-group"
        tag="div"
      >
        <div v-for="item in list1" :key="item" class="item">
          <span>
            {{ item }}
          </span>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
let timer = 0

export default {
  name: 'element-dance',
  components: {},
  props: {},
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      list1: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      position: [
        [0, 0],
        [200, 0],
        [400, 0],

        [0, 100],
        [200, 100],
        [400, 100],

        [0, 200],
        [200, 200],
        [400, 200],
      ],
    }
  },
  computed: {},
  watch: {},
  created() {
    timer && clearInterval(timer)
    timer = setInterval(() => {
      this.position.sort((a, b) => Math.random() - 0.5)
      this.list1.sort((a, b) => Math.random() - 0.5)
    }, 2000)
  },
  mounted() {},
  beforeDestroy() {
    timer && clearInterval(timer)
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.element-dance {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .element-dance-wrap {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 600px;
    height: 300px;
    &:not(:last-child) {
      margin-bottom: 30px;
    }
    .item {
      width: 200px;
      height: 100px;
      padding: 10px;
      font-size: 50px;
      transition: all 0.4s;
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: #ff000033;
      }
    }
  }
  .transition-group {
    display: flex;
    flex-wrap: wrap;
    width: 600px;
    height: 300px;
    transition: all 0.4s;
  }
}
</style>
