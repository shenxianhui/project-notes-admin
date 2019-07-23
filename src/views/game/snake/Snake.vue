<!--
 * @Author: ShenXianhui
 * @LastEditors: Shen Xianhui
 * @Date: 2019-04-25 08:30:57
 * @LastEditTime: 2019-06-07 09:48:54
 -->
<!-- 贪吃蛇 -->
<template>
    <div class="snake" ref="snake">
        <div class="map" ref="map">
        </div>
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
            snakeList: [], // 蛇所占区域坐标(用来判断食物是否生成在蛇内)
            snakeParts: { // 尺寸
                width: 20,
                height: 20
            },
            initialPosition: { // 蛇头位置
                left: 40,
                top: 0
            },
            foodPosition: { // 食物位置
                left: 0,
                top: 0
            }
        };
    },
    computed: {},
    watch: {},
    // created() {},
    mounted() {
        this.setMap();
        this.createSnake();
        this.createFood();
        window.addEventListener('keydown', this.keyboard);
    },
    destroyed() {
        clearInterval(this.timer);
        window.removeEventListener('keydown', this.keyboard);
    },
    methods: {
        // 设置地图大小
        setMap() {
            let map = this.$refs.map;
            let snakeW = this.snakeParts.width;
            let snakeH = this.snakeParts.height;
            let borderX = (map.offsetWidth - (Math.floor(map.offsetWidth / snakeW)) * snakeW) / 2 + 'px';
            let borderY = (map.offsetHeight - (Math.floor(map.offsetHeight / snakeH)) * snakeH) / 2 + 'px';

            this.$refs.snake.style.padding = borderY + ' ' + borderX;
        },

        // 创建🐍
        createSnake() {
            for (let i = 0; i < 3; i++) {
                let item = document.createElement('span');
                item.style.position = 'absolute';
                item.style.top = '0px';
                item.style.left = (this.initialPosition.left - (i * this.snakeParts.width)) + 'px';
                item.style.display = 'inline-block';
                item.style.width = this.snakeParts.width + 'px';
                item.style.height = this.snakeParts.height + 'px';
                item.style.backgroundColor = '#000';

                this.snake.push(item);
                this.$refs.map.appendChild(item);
            }
        },

        // 移动
        snakeMove() {
            // let snakePositionList = [];
            this.snakeList = [];

            // 蛇身跟随
            for (let i = this.snake.length - 1; i > 0; i--) { // 先让数组末位等于前一位
                // 记录蛇的区域, 避免食物位置与蛇重合
                let snakePosition = {
                    left: this.snake[i].offsetLeft,
                    top: this.snake[i].offsetTop
                };
                this.snakeList.push(snakePosition);

                this.snake[i].style.left = this.snake[i - 1].offsetLeft + 'px';
                this.snake[i].style.top = this.snake[i - 1].offsetTop + 'px';

            }
            // console.log(this.initialPosition.left);
            this.snakeList.push(this.initialPosition);
            console.log(this.snakeList);
            // 蛇头(数组首项)移动
            switch (this.keyNumber) {
                case 37: // ←
                    this.initialPosition.left -= this.snakeParts.width;
                    this.snake[0].style.left = this.initialPosition.left + 'px';
                    break;
                case 38: // ↑
                    this.initialPosition.top -= this.snakeParts.height;
                    this.snake[0].style.top = this.initialPosition.top + 'px';
                    break;
                case 39: // →
                    this.initialPosition.left += this.snakeParts.width;
                    this.snake[0].style.left = this.initialPosition.left + 'px';
                    break;
                case 40: // ↓
                    this.initialPosition.top += this.snakeParts.height;
                    this.snake[0].style.top = this.initialPosition.top + 'px';
                    break;
            }
        },

        // 创建食物
        createFood() {
            let snakeW = this.snakeParts.width;
            let snakeH = this.snakeParts.height;
            let randomL = Math.floor((Math.random() * (this.$refs.map.offsetWidth - snakeW)) / snakeW) * snakeW + 'px';
            let randomT = Math.floor((Math.random() * (this.$refs.map.offsetHeight - snakeH)) / snakeH) * snakeH + 'px';

            let item = document.createElement('i');
            item.style.position = 'absolute';
            item.style.left = randomL;
            item.style.top = randomT;
            item.style.display = 'inline-block';
            item.style.width = this.snakeParts.width + 'px';
            item.style.height = this.snakeParts.height + 'px';
            item.style.backgroundColor = '#000';
            this.foodPosition.left = randomL;
            this.foodPosition.top = randomT;

            this.$refs.map.appendChild(item);
        },

        // 键盘事件
        keyboard(e) {
            let _keyNumber = this.keyNumber;

            this.keyNumber = e.keyCode;
            if (this.keyNumber !== _keyNumber) { // 防止重复点击
                clearInterval(this.timer);
                this.snakeMove(); // 立即执行
                this.timer = setInterval(() => {
                    this.snakeMove();
                }, 1000);
            }
        }
    }
};
</script>

<style scoped lang='less'>
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
