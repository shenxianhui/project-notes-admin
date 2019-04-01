<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
export default {
    name: 'app',
    created() {
        // 请求拦截，处理错误请求
        axios.interceptors.response.use(response => {
            if (response.data.success) {
                return response;
            } else {
                /* 处理请求超时
                    if (response.data.msg == 'no_login') {
                        this.$router.push('/entry');
                    } */
                /* 处理请求返回错误
                    if (response.data.msg) {
                        Toast({
                            message: response.data.msg,
                            duration: 2000,
                            className: 'globalMsg'
                        });
                    } */
                return Promise.reject(response);
            }
        }, error => {
            // 添加错误提示 比如下面这样
            /* Toast({
                    message: '连接服务器失败，请稍后再试！',
                    duration: 2000,
                    className: 'globalMsg'
                }); */
            return Promise.reject(error);
        });
    }
};
</script>
<style lang="less">
/* 滚动条样式 */
::-webkit-scrollbar {width: 6px;height:6px;}
::-webkit-scrollbar-track-piece{background-color: #eee;}
::-webkit-scrollbar-thumb{background: #aaa;min-width: 150px;border-radius: 10px;}
::-webkit-scrollbar-thumb:vertical:hover{background: #555555}
::-webkit-scrollbar-thumb:horizontal:hover{background: #555555}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    width: 100%;
    height: 100%;
}
</style>
