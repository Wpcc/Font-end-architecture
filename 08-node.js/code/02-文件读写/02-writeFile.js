/* 
 写入文件：
	01.引入模块
	02.writeFile有三个参数，第一个参数是写入文件路径，第二个参数是写入内容，第三个参数是一个回调函数
	03.回调函数有一个err参数，用来判断写入是否成功
		成功为null	
		失败为一个对象
		
啥时候失败？
	特殊字符，比如引号大于号等
 */

let fs = require('fs')

let data = 'hello writeFile'

fs.writeFile('hello.md',data,function(err){ // 回调函数中的参数是一个形参，所以可以随便命名
	if(err){
		console.log('文件写入失败！')
		return
	}
	console.log('文件写入成功！')
})