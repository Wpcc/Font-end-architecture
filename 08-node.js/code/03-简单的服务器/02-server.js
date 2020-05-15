/* 
监听不同的请求路径 
 */
let http = require('http')

// 01. 创建服务器
let server = http.createServer()

// 02. 监听请求事件
server.on('request',(req,res) => {
	console.log(req.url)
	if(req.url === '/'){
		res.end('index')
	}else if(req.url === '/login'){
		res.end('login')
	}else{
		res.end('404 Not Found')
	}
})

// 03. 监听端口号，启动服务器
server.listen(3000,()=>{
	console.log('服务器已启动')
})