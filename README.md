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
- 标准盒模型和IE盒模型
  - 标准：with(content) + padding + border + margin
  - IE: width(content + padding + border) + margin
- 什么是BFC？
  - 全称block formatting context（块级格式化上下文），意思创建一个独立的区域，让里面的布局与外部布局相互隔离
  - 常见创建BFC的方式
    - 比如：文档根元素（html）
    - 比如：`overflow:hidden|auto|scroll`，这也是为什么`overflow:hidden`可以清除浮动，因为创建了一个BFC
    - 比如：绝对/固定定位：`position:absolute|fixed`
    - 比如：`display:flex`
- 水平居中
  -  `margin:0 auto`
  -  `text-align:center`
- 水平垂直居中
  - absolute(绝对定位) + margin，缺点需要知道元素的宽高
  - abosulte(绝对定位) + translate，缺点css3属性，兼容性
  - flex，给父元素添加`display:flex;justify-content:center;align-items:center`，缺点css3属性，兼容性
- flex布局
  - `justify-content`定义主轴对齐方式
  - `align-items`定义交叉轴对齐方式
  - 用的比较多：
    - `flex-wrap:wrap/nowrap`定义是否换行
    - `flex:1`平分剩余空间，需要注意的是该属性设置在本身元素上而不是父元素，为`flex-grow`
- 为什么要清除浮动？清楚浮动的方式？
  - 由于浮动会使元素脱离文档流，故原本布局的父元素将会出现高度塌陷的问题。为了让页面更加合理，我们需要清除浮动。
  - 常用清除浮动的方法：
    - `both:clear`：一种是在最后一个元素添加清除，另外一种方式是创建一个伪类，添加浮动方式
    ```css
    // 伪类
    .clearfix::after{
      content:'';
      height:0;
      display:block;
      clear:both;
    }
    ```
    - 创建一个BFC：通常是通过`overflow:hidden`进行清除
    ```css
    // 浮动元素的父元素
    .container{
      overflow:hidden;
    }
    ```
