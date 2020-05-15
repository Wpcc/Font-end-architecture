/* 
读取文件：

	01.引入文件模块
	02.readFile中有两个参数，第一个参数是读取文件的路径，第二个参数是一个回调函数。
	03.回调函数也有两个参数
		第一个参数是一个对象，用来判断文件是否读取失败，若失败返回一个对象，若成功则是null
		第二个参数是读取的内容，是二进制数值，通过toString()函数，转成字符串。

 啥时候失败？
	读取路径错误
 */
let fs = require('fs')

fs.readFile('./hello.txt',function(err,data){
	if(err){
		console.log('文件读入失败！')
		return
	}
	data = data.toString()
	console.log(data)
})