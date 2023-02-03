// const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  // 生产环境是否生成 sourceMap 文件, 一般情况不建议打开
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  chainWebpack: config => {
    // [移除 prefetch 插件](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch)
    config.plugins.delete('prefetch')
  },
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        algorithm: 'gzip', // 使用 gzip 压缩
        test: /\.js$|\.html$|\.css$/, // 匹配文件名
        filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名, 后缀加.gz)
        minRatio: 0.8, // 最小压缩比达到 0.8 时才会被压缩
        threshold: 10240, // 对超过 10kb 的数据压缩
        // 是否删除未压缩的源文件
        // 如果希望提供非 gzip 的资源, 可不设置或者设置为 false (比如删除打包后的gz后还可以加载到原始资源文件)
        deleteOriginalAssets: false,
      }),
    ],
  },
  devServer: {
    open: true,
    port: 8080,
    // 设置代理
    proxy: {
      '/api': {
        target: 'http://xxx.xxx.xxx.xxx:xxxx', // 域名
        ws: true, // 是否启用websockets
        // 开启代理：在本地会创建一个虚拟服务端, 然后发送请求的数据, 并同时接收请求的数据,
        // 这样服务端和服务端进行数据的交互就不会有跨域问题
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
