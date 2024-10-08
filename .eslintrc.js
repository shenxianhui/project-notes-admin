module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  plugins: ['prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': 1, // 错误提示级别: 0-关闭, 1-警告, 2-报错
    'no-unused-vars': 0,
    'vue/no-unused-components': 0,
    'no-useless-escape': 0,
    semi: [0, 'never'], // 结尾分号
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    // axios: false,
  },
}
