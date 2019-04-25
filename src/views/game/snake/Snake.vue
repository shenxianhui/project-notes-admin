<!--
 * @Author: ShenXianhui
 * @LastEditors: ShenXianhui
 * @Date: 2019-04-25 08:30:57
 * @LastEditTime: 2019-04-25 11:20:38
 -->
<!-- 贪吃蛇 -->
<template>
    <div class="snake">
        <div class="map" ref="map">
            <button @click="createSnake()" v-show="!isStart">开始</button>
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
            isStart: false,
            snakeParts: {
                width: 20,
                height: 20
            }
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        // 创建🐍
        createSnake() {
            this.isStart = true;
            for (let i = 0; i < 3; i++) {
                let item = document.createElement("span");
                item.style.position = 'absolute';
                item.style.top = '0px';
                item.style.left = (40 - (i * 20)) + 'px';
                item.style.display = 'inline-block';
                item.style.width = this.snakeParts.width + 'px';
                item.style.height = this.snakeParts.height + 'px';
                item.style.backgroundColor = '#000';
                this.$refs.map.appendChild(item);
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
