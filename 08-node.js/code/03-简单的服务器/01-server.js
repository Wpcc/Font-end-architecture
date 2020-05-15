/* 
创建一个简单的服务器： 
 */

let http = require('http')

// 01 创建服务器
let server = http.createServer()

// 02 监听请求事件
server.on('request',function(req, res){
	console.log(req.url)
	res.write('hello')
	res.write('server')
	res.end()
})

// 监听端口号，启动服务器
server.listen(3000,function(){
	console.log('服务器成功，可以访问了')
})