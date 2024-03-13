# Font-end-architecture

**前端体系结构归纳**

## 工具篇

**怎么去构建一个项目？**

- 编译器的选择
  - vscode or  webstorm 或其他
- 前端框架的选择
  - vue or react or angular移动端的话Flutter or uniapp，小程序等
- 脚手架的选择
  - 如vue：VueCLI or Vite
- 语法规范的选择
  - 执行哪个规范：standard or airbnb 或各个大厂规范
  - 使用哪个语法检测工具：eslint 或 prettier（可以通过工具篇查看两者之间的区别）
- 包管理工具
  - npm(npx) / yarn / pnpm
- 是否使用monorepo
  - https://fed.taobao.org/blog/taofed/do71ct/uihagy/
 
## HTML
- HTML语义化
  - 便于浏览器、搜索引擎解析，css失效时，页面结构更清晰
- script标签中async和defer的区别
  - js语言分为下载和执行
- HTML页面适应手机移动端
  - `<meta name='viewport' content='width=device-width,initial-scale=1'>`
 
## CSS
