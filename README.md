## 开发工具
+ VS Code

## VS Code 必装插件
+ ESlint
+ Prettier - Code formatter

## [使用脚手架创建 Vue 项目](https://www.jianshu.com/p/06b23fe69a73)
+ 使用 `vue-cli` 创建项目时，请使用 `eslint + prettier` 选项。勾选 `fix on save` 和 `fix on commit`，避免手动配置 `git pre-commit hook`。

+ `eslint` 默认使用 `vue/essential`。

+ `vue-cli` 不会自动添加 `prettier` 配置文件，所以需要手动添加。

`.prettierrc.js` 示例：
```
module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  printWidth: 120,
  semi: false,
  singleQuote: true,
  htmlWhitespaceSensitivity: 'css'
}
```
