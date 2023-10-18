# eslint区别说明

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## eslint
eslint插件和包有什么区别？

通过取消vscode中eslint插件，可以发现编译器并没有开启实时检测功能。需要运行`npx eslint yourfile.js`命令才能开启eslint功能。
需要注意的是，对于vue的检测，也可以通过以上命令进行检测。

## 项目操作

进行操作之前需要关闭eslint插件。`main.js`和`App.vue`分别存在着语法错误。通过运行`npx eslint ./src/main.js`和运行`npx eslint ./src/App.vue`，能够通过eslint进行项目的语法检测。



