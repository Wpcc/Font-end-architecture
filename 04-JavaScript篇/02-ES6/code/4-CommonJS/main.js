// 导入  CommonJS导出的值是拷贝，修改原始值，导出的值不变（对于简单类型来讲）
let some = './content.js'
let {content,obj} = require(some)

console.log(content)
console.log(obj)

setTimeout(() => {
  console.log(content)
  console.log(obj)
},2000)