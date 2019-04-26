<!--
 * @Author: ShenXianhui
 * @LastEditors: ShenXianhui
 * @Date: 2019-04-25 08:30:57
 * @LastEditTime: 2019-04-26 08:58:16
 -->
<!-- 贪吃蛇 -->
<template>
    <div class="snake">
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
            numDown: 0,

            snake: [], // 蛇
            snakeParts: { // 尺寸
                width: 20,
                height: 20
            },
            initialPosition: { // 蛇头位置
                left: 40,
                top: 0
            }
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.createSnake();
        this.keyboard();
    },
    methods: {
        // 创建🐍
        createSnake() {
            for (let i = 0; i < 3; i++) {
                let item = document.createElement("span");
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
            // 蛇头(数组首项)移动
            switch(this.keyNumber) {
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

                    // 蛇身跟随
                    for (let i = 1; i < this.snake.length; i++) {
                        this.snake[i].style.left = this.snake[i - 1].offsetLeft - this.snakeParts.width + 'px';
                        this.snake[i].style.top = this.snake[i - 1].offsetTop + 'px';
                    }
                    break;
                case 40: // ↓
                    this.initialPosition.top += this.snakeParts.height;
                    this.snake[0].style.top = this.initialPosition.top + 'px';

                    // 蛇身跟随
                    // for (let i = 1; i < this.snake.length; i++) {
                    //     this.snake[i].style.left = this.snake[i - 1].offsetLeft + 'px';
                    //     this.snake[i].style.top = this.snake[i - 1].offsetTop - this.snakeParts.height + 'px';
                    // }

                    // console.log(this.numDown);
                    // if (this.numDown > this.snake.length) {
                    //     this.snake[this.numDown + 1].style.left = this.snake[this.numDown].offsetLeft + 'px';
                    //     console.log(this.snake[0].style.left, this.snake[1].style.left, this.snake[2].style.left);
                    //     this.numDown++;
                    // }
                    // this.snake[this.numDown + 1].style.top = this.snake[this.numDown].offsetTop - this.snakeParts.height + 'px';
                    break;
            }
        },

        // 键盘事件
        keyboard() {
            let _this = this;
            document.onkeyup = function (e) {
                let _keyNumber = _this.keyNumber;

                _this.keyNumber = e.keyCode;
                if (_this.keyNumber !== _keyNumber) { // 防止重复点击
                    clearInterval(_this.timer);
                    _this.snakeMove(); // 立即执行
                    _this.timer = setInterval(() => {
                        _this.snakeMove();
                    },1000)
                }
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
    }
}
</style>
