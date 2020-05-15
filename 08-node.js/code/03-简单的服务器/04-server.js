let http = require('http')

let phone = {
	'01':'华为',
	'02':'小米',
	'03':'苹果'
}

http.createServer((res,req) => {
	req.setHeader('Content-Type','text/plain;charset=utf-8')
	req.end(JSON.stringify(phone))
	
}).listen(3000)

console.log('服务器已启动，监听端口号3000')