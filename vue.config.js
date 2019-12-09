const webpack = require('webpack');

module.exports = {
  pages: {
    index: {
      entry: './src/main.js',
      template: './public/index.html',
      filename: 'index.html'
    }
  },
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  chainWebpack: config => {
    // [移除 prefetch 插件](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch)
    config.plugins.delete('prefetch');
  },
  configureWebpack: config => {
    let pluginsWebpack = [
      // 使用ProvidePlugin加载的模块，需要在eslintrc.js的globals里设置
      new webpack.ProvidePlugin({
        axios: 'axios'
      })
    ];
    if (process.env.NODE_ENV === 'production') {
      // 生产环境
      const CompressionWebpackPlugin = require('compression-webpack-plugin');
      // 使用DefinePlugin暴露的全局变量，需要在eslintrc.js的globals里设置
      pluginsWebpack.push(
        new webpack.DefinePlugin({
          __PROJECTPATH__: JSON.stringify('')
        })
      );
      // gzip压缩
      pluginsWebpack.push(
        new CompressionWebpackPlugin({
          asset: '[path].gz[query]', // 目标文件名
          algorithm: 'gzip', // 使用gzip压缩
          test: /\.js$|\.html$|\.css/, // 压缩 js html css
          threshold: 10240, // 资源文件大于10240B=10kB时会被压缩
          minRatio: 0.8, // 最小压缩比达到0.8时才会被压缩
          deleteOriginalAssets: false // 删除原文件
        })
      );
    } else {
      // 开发环境
      pluginsWebpack.push(
        new webpack.DefinePlugin({
          __PROJECTPATH__: JSON.stringify('/test')
        })
      );
    }
    config.plugins = [...config.plugins, ...pluginsWebpack];
  },
  devServer: {
    open: true,
    port: 8080,
    // 设置代理
    proxy: {
      '/test': {
        target: 'http://10.5.107.183:8777', // 域名
        ws: true, // 是否启用websockets
        // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，
        // 这样服务端和服务端进行数据的交互就不会有跨域问题
        changeOrigin: true,
        pathRewrite: {
          '^/test': ''
        }
      }
    }
  }
};
