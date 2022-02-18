/*
导出模块
	1.define的两个参数，一个是需要模块化的文件，另一个是需要导出的内容
*/


function say(){ // 函数
	console.log('hello i am zhangsan')
}

var name = 'hello';

define('content.js',function(){
	return name
})