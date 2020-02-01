<!--
 * @Author: ShenXianhui
 * @Date: 2019-04-25 08:30:57
 * @LastEditors  : Wells
 * @LastEditTime : 2020-02-01 12:31:18
 * @Description: 贪吃蛇
 -->
<template>
  <div class="snake" ref="snake">
    <div class="map" ref="map"></div>
  </div>
</template>

<script>
export default {
  name: 'Snake',
  components: {},
  props: {},
  data() {
    return {
      keyNumber: 0, // 键盘码
      timer: null,

      snake: [], // 蛇
      // snakeItem: null, // 蛇关节
      snakeList: [], // 蛇所占区域坐标(用来判断食物是否生成在蛇内)
      // 尺寸
      snakeParts: {
        width: 20,
        height: 20
      },
      // 蛇头位置
      initialPosition: {
        left: 40,
        top: 0
      },
      food: null, // 食物
      // 食物位置
      foodPosition: {
        left: 0,
        top: 0
      }
    };
  },
  computed: {},
  watch: {},
  // created() {},
  mounted() {
    // this.setMap();
    // this.createSnake();
    // this.createFood();
    this.initGame();
    window.addEventListener('keydown', this.keyboard);
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    window.removeEventListener('keydown', this.keyboard);
  },
  methods: {
    // 设置地图大小
    setMap() {
      let map = this.$refs.map;
      let snakeW = this.snakeParts.width;
      let snakeH = this.snakeParts.height;
      let borderX = (map.clientWidth - Math.floor(map.clientWidth / snakeW) * snakeW) / 2 + 'px';
      let borderY = (map.clientHeight - Math.floor(map.clientHeight / snakeH) * snakeH) / 2 + 'px';

      this.$refs.snake.style.padding = borderY + ' ' + borderX;
    },

    initGame() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.initialPosition = {
        left: 40,
        top: 0
      };
      this.snake = this.snakeList = [];
      this.$refs.map.innerHTML = '';

      this.setMap();
      this.createSnake();
      this.createFood();
    },

    // 创建🐍
    createSnake() {
      for (let i = 0; i < 3; i++) {
        let item = document.createElement('span');
        item.style.position = 'absolute';
        item.style.top = '0px';
        item.style.left = this.initialPosition.left - i * this.snakeParts.width + 'px';
        item.style.display = 'inline-block';
        item.style.width = this.snakeParts.width + 'px';
        item.style.height = this.snakeParts.height + 'px';
        item.style.backgroundColor = `#${i * 3}${i * 3}${i * 3}`;

        this.$refs.map.appendChild(item);
        this.snake.push(item);
      }
    },

    // 移动
    snakeMove() {
      // 判断蛇头是否能吃到食物
      if (JSON.stringify(this.initialPosition) === JSON.stringify(this.foodPosition)) {
        // 将食物放到蛇尾位置
        if (!this.food) return;
        this.snake.push(this.food);
        this.$refs.map.appendChild(this.food);
        this.food = null;

        this.createFood();
      }

      // 蛇身跟随
      this.snakeList = [];
      for (let i = this.snake.length - 1; i > 0; i--) {
        // 先让数组末位等于前一位
        // 记录蛇的区域, 避免食物位置与蛇重合
        let snakePosition = {
          left: this.snake[i].offsetLeft,
          top: this.snake[i].offsetTop
        };
        this.snakeList.push(snakePosition);

        this.snake[i].style.left = this.snake[i - 1].offsetLeft + 'px';
        this.snake[i].style.top = this.snake[i - 1].offsetTop + 'px';
      }
      this.snakeList.push(this.initialPosition);

      // 蛇头(数组首项)移动
      let mapWidth = this.$refs.map.clientWidth;
      let mapHeight = this.$refs.map.clientHeight;
      switch (this.keyNumber) {
        case 37: // ←
          if (this.initialPosition.left === 0) {
            alert('游戏结束');
            this.initGame();
            return;
          }
          this.initialPosition.left -= this.snakeParts.width;
          this.snake[0].style.left = this.initialPosition.left + 'px';
          break;
        case 38: // ↑
          if (this.initialPosition.top === 0) {
            alert('游戏结束');
            this.initGame();
            return;
          }
          this.initialPosition.top -= this.snakeParts.height;
          this.snake[0].style.top = this.initialPosition.top + 'px';
          break;
        case 39: // →
          if (this.initialPosition.left + this.snakeParts.width >= mapWidth) {
            alert('游戏结束');
            this.initGame();
            return;
          }
          this.initialPosition.left += this.snakeParts.width;
          this.snake[0].style.left = this.initialPosition.left + 'px';
          break;
        case 40: // ↓
          if (this.initialPosition.top + this.snakeParts.height >= mapHeight) {
            alert('游戏结束');
            this.initGame();
            return;
          }
          this.initialPosition.top += this.snakeParts.height;
          this.snake[0].style.top = this.initialPosition.top + 'px';
          break;
      }
    },

    // 创建食物
    createFood() {
      let snakeW = this.snakeParts.width;
      let snakeH = this.snakeParts.height;
      let randomL = Math.floor((Math.random() * (this.$refs.map.offsetWidth - snakeW)) / snakeW) * snakeW;
      let randomT = Math.floor((Math.random() * (this.$refs.map.offsetHeight - snakeH)) / snakeH) * snakeH;
      let item = document.createElement('span');
      let str = '#';
      for (let i = 0; i < 6; i++) {
        let num = Math.floor(Math.random() * 10);
        str += num;
      }

      item.style.position = 'absolute';
      item.style.left = randomL + 'px';
      item.style.top = randomT + 'px';
      item.style.display = 'inline-block';
      item.style.width = this.snakeParts.width + 'px';
      item.style.height = this.snakeParts.height + 'px';
      item.style.backgroundColor = str;
      this.foodPosition.left = randomL;
      this.foodPosition.top = randomT;

      this.food = item;
      this.$refs.map.appendChild(item);
    },

    // 键盘事件
    keyboard(e) {
      let _keyNumber = this.keyNumber;

      this.keyNumber = e.keyCode;
      // 防止重复点击
      if (this.keyNumber !== _keyNumber) {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
        this.snakeMove(); // 立即执行
        this.timer = setInterval(() => {
          this.snakeMove();
        }, 100);
      }
    }
  }
};
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
