const files = require.context('.', true, /\.js$/)
let modules = {}

files.keys().forEach(key => {
  if (key === './index.js') return

  let module = key.split('./')[1].split('.js')[0]
  modules[module] = require(`./${module}.js`).default
})

export default modules
