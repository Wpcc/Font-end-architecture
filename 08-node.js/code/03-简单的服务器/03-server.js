/* 
	发送一个对象
		存在问题：乱码
 */

let http = require('http')

let phone = {
	'01':'华为',
	'02':'小米',
	'03':'苹果'
}

http.createServer(function(req,res){
	res.end(JSON.stringify(phone))
}).listen(3000)

console.log('服务器已启动，监听3000端口')