<!--
 * @Author: shenxh
 * @Date: 2019-04-25 08:30:57
 * @LastEditors: shenxh
 * @LastEditTime: 2022-09-19 13:46:10
 * @Description: 贪吃蛇
 -->
<template>
  <div class="snake" ref="snake">
    <div class="map" ref="map"></div>
  </div>
</template>

<script>
import { debounce } from '@/utils/utils.js'

let timer = null

export default {
  name: 'Snake',
  components: {},
  props: {},
  data() {
    return {
      keyNumber: 0, // 键盘码

      snake: [], // 蛇
      snakeList: [], // 蛇所占区域坐标(用来判断食物是否生成在蛇内)
      // 尺寸
      snakeParts: {
        width: 20,
        height: 20,
      },
      // 蛇头位置
      initialPosition: {
        left: 40,
        top: 0,
      },
      food: null, // 食物
      // 食物位置
      foodPosition: {
        left: 0,
        top: 0,
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initGame()
    window.addEventListener('keydown', this.keyboard)
    window.addEventListener('resize', debounce(this.initGame))
  },
  destroyed() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    window.removeEventListener('keydown', this.keyboard)
    window.removeEventListener('resize', this.initGame)
  },
  methods: {
    // 游戏初始化
    initGame() {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
      this.initialPosition = {
        left: 40,
        top: 0,
      }
      this.snake = this.snakeList = []
      this.$refs.map.innerHTML = ''

      this.setMap()
      this.createSnake()
      this.createFood()
    },

    // 设置地图大小
    setMap() {
      let map = this.$refs.map
      let snakeW = this.snakeParts.width
      let snakeH = this.snakeParts.height
      let borderX =
        (map.clientWidth - Math.floor(map.clientWidth / snakeW) * snakeW) / 2 +
        'px'
      let borderY =
        (map.clientHeight - Math.floor(map.clientHeight / snakeH) * snakeH) /
          2 +
        'px'

      this.$refs.snake.style.padding = borderY + ' ' + borderX
    },

    // 创建🐍
    createSnake() {
      for (let i = 0; i < 3; i++) {
        let item = document.createElement('span')
        item.style.position = 'absolute'
        item.style.top = '0px'
        item.style.left =
          this.initialPosition.left - i * this.snakeParts.width + 'px'
        item.style.display = 'inline-block'
        item.style.width = this.snakeParts.width + 'px'
        item.style.height = this.snakeParts.height + 'px'
        item.style.backgroundColor = `#${i * 3}${i * 3}${i * 3}`

        this.$refs.map.appendChild(item)
        this.snake.push(item)
      }
    },

    // 移动
    snakeMove(isAlert) {
      // 判断蛇头是否能吃到食物
      if (
        JSON.stringify(this.initialPosition) ===
        JSON.stringify(this.foodPosition)
      ) {
        // 将食物放到蛇尾位置
        if (!this.food) return
        this.snake.push(this.food)
        this.$refs.map.appendChild(this.food)
        this.food = null

        this.createFood()
      }

      // 蛇身跟随
      this.snakeList = []
      for (let i = this.snake.length - 1; i > 0; i--) {
        // 先让数组末位等于前一位
        this.snake[i].style.left = this.snake[i - 1].offsetLeft + 'px'
        this.snake[i].style.top = this.snake[i - 1].offsetTop + 'px'
        // 记录蛇的区域
        let snakePosition = {
          left: this.snake[i].offsetLeft,
          top: this.snake[i].offsetTop,
        }
        this.snakeList.push(snakePosition)
      }
      // 添加蛇头
      this.snakeList.push(this.initialPosition)

      // 蛇头(数组首项)移动
      let mapWidth = this.$refs.map.clientWidth
      let mapHeight = this.$refs.map.clientHeight
      switch (this.keyNumber) {
        case 37: // ←
          if (this.initialPosition.left === 0) {
            if (isAlert) alert('游戏结束')
            this.keyNumber = 0
            this.initGame()
            return
          }
          this.initialPosition.left -= this.snakeParts.width
          this.snake[0].style.left = this.initialPosition.left + 'px'
          break
        case 38: // ↑
          if (this.initialPosition.top === 0) {
            if (isAlert) alert('游戏结束')
            this.keyNumber = 0
            this.initGame()
            return
          }
          this.initialPosition.top -= this.snakeParts.height
          this.snake[0].style.top = this.initialPosition.top + 'px'
          break
        case 39: // →
          if (this.initialPosition.left + this.snakeParts.width >= mapWidth) {
            if (isAlert) alert('游戏结束')
            this.keyNumber = 0
            this.initGame()
            return
          }
          this.initialPosition.left += this.snakeParts.width
          this.snake[0].style.left = this.initialPosition.left + 'px'
          break
        case 40: // ↓
          if (this.initialPosition.top + this.snakeParts.height >= mapHeight) {
            if (isAlert) alert('游戏结束')
            this.keyNumber = 0
            this.initGame()
            return
          }
          this.initialPosition.top += this.snakeParts.height
          this.snake[0].style.top = this.initialPosition.top + 'px'
          break
      }

      // 判断蛇头是否撞到蛇身
      let isCollision = false
      this.snakeList.forEach(item => {
        if (JSON.stringify(item) === JSON.stringify(this.initialPosition)) {
          // 判断蛇头与蛇身的坐标是否有一样的
          if (!isCollision) {
            isCollision = true
          } else {
            if (isAlert) alert('游戏结束')
            this.keyNumber = 0
            this.initGame()
            return
          }
        }
      })
    },

    // 创建食物
    createFood() {
      let snakeW = this.snakeParts.width
      let snakeH = this.snakeParts.height
      let randomL =
        Math.floor(
          (Math.random() * (this.$refs.map.offsetWidth - snakeW)) / snakeW,
        ) * snakeW
      let randomT =
        Math.floor(
          (Math.random() * (this.$refs.map.offsetHeight - snakeH)) / snakeH,
        ) * snakeH
      let item = document.createElement('span')
      let str = '#'
      for (let i = 0; i < 6; i++) {
        let num = Math.floor(Math.random() * 10)
        str += num
      }

      item.style.position = 'absolute'
      item.style.left = randomL + 'px'
      item.style.top = randomT + 'px'
      item.style.display = 'inline-block'
      item.style.width = this.snakeParts.width + 'px'
      item.style.height = this.snakeParts.height + 'px'
      item.style.backgroundColor = str
      this.foodPosition.left = randomL
      this.foodPosition.top = randomT
      this.food = item
      this.$refs.map.appendChild(item)
    },

    // 键盘事件
    keyboard(e) {
      if (
        e.keyCode !== 37 &&
        e.keyCode !== 38 &&
        e.keyCode !== 39 &&
        e.keyCode !== 40
      )
        return
      let _keyNumber = this.keyNumber
      // 禁止直上直下, 直左直右
      if (_keyNumber === 37 && e.keyCode === 39) return
      if (_keyNumber === 38 && e.keyCode === 40) return
      if (_keyNumber === 39 && e.keyCode === 37) return
      if (_keyNumber === 40 && e.keyCode === 38) return
      this.keyNumber = e.keyCode
      // 防止重复点击
      if (this.keyNumber === _keyNumber) return

      if (timer) {
        clearInterval(timer)
        timer = null
      }
      this.snakeMove(false) // 立即执行
      timer = setInterval(() => {
        this.snakeMove(true)
      }, 100)
    },
  },
}
</script>

<style scoped lang="less">
.snake {
  width: 100%;
  height: 100%;
  .map {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid #000;
  }
}
</style>
