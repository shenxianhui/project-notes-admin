<!--
 * @Description: 元素跳动
 * @Author: shenxh
 * @Date: 2023-04-07 14:28:47
 * @LastEditors: shenxh
 * @LastEditTime: 2023-04-07 14:44:25
-->

<template>
  <div class="element-dance admin-content">
    <div class="element-dance-wrap">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="item"
        :style="{
          left: position[index][0] + 'px',
          top: position[index][1] + 'px',
        }"
      >
        <span>
          {{ item }}
        </span>
      </div>
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
      this.position = this.randomSort(this.position)
    }, 2000)
  },
  mounted() {},
  beforeDestroy() {
    timer && clearInterval(timer)
  },
  methods: {
    // 随机排序
    randomSort(arr = []) {
      let tmp = [...arr]

      tmp.sort((a, b) => {
        return Math.random() - 0.5
      })

      return tmp
    },
  },
}
</script>

<style lang="less" scoped>
.element-dance {
  .element-dance-wrap {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 600px;
    .item {
      position: absolute;
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
}
</style>
