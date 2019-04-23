<!--
 * @Author: ShenXianhui
 * @LastEditors: ShenXianhui
 * @Date: 2019-04-23 15:02:52
 * @LastEditTime: 2019-04-23 16:51:56
 -->
<!-- 星系 -->
<template>
    <div class="galaxy">
        <div class="trajectory">
            <div class="earth">
                <img src="@/assets/img/animation/globe_1.png" alt="地球">
            </div>
            <div class="globe">
                <img src="@/assets/img/animation/globe_2.png" alt="地球">
            </div>
            <div class="globe">
                <img src="@/assets/img/animation/globe_3.png" alt="地球">
            </div>
            <div class="globe">
                <img src="@/assets/img/animation/globe_4.png" alt="地球">
            </div>
            <div class="globe">
                <img src="@/assets/img/animation/globe_5.png" alt="地球">
            </div>
            <div class="globe">
                <img src="@/assets/img/animation/globe_6.png" alt="地球">
            </div>
            <div class="globe">
                <img src="@/assets/img/animation/globe_7.png" alt="地球">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Galaxy',
    components: {},
    props: {},
    data() {
        return {};
    },
    computed: {},
    watch: {},
    mounted() {},
    created() {},
    methods: {}
};
</script>

<style scoped lang='less'>
.galaxy {
    width: 100%;
    height: 100%;
    background: url('../../../assets/img/animation/globe_bg.png') no-repeat center center;
    background-size: cover;
    .trajectory {
        position: relative;

        width: 100%;
        height: 95%;
        background: url('../../../assets/img/animation/globe_trajectory.png') no-repeat center center;
        background-size: contain;
        .earth {
            // position: absolute;
            // top: 100%;
            // left: 100%;

            display: flex;
            align-items: center;
            justify-content: center;

            width: 100%;
            height: 100%;
            // margin-left: -180px;
            img {
                width: 25%;
                // height: 35%;
                margin-bottom: 7.3%;
            }
        }
        .globe {
            position: absolute;
            top: 0;
            
            display: flex;
            align-items: center;
            justify-content: center;

            width: 8%;
            height: 15%;
            img {
                width: 80px;
                height: 80px;
            }
        }
    }
}
</style>
