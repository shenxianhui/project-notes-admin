const files = require.context('.', true, /\.js$/)

let modules = []

files.keys().forEach(key => {
  if (key === './index.js') return

  modules = modules.concat(files(key).default) // 读取出文件中的default模块
})

export default modules // 抛出一个期待的结构的数组
