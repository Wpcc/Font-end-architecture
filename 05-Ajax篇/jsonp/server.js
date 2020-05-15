const http = require('http')
const url = require('url')

http.createServer((req,res) => {
	let data = 'hello world'
	
	/* let path = url.parse(req.url)
	let callback = path.query.split('=')[1] // 解析路径 */
	
	let msg = {
		"data":"hello"
	}
	
	res.setHeader('Content-Type','text/plain') // 设置内容格式
	res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:8848') // 跨域
	res.end(JSON.stringify(msg))
	
}).listen('3000',() => {
	console.log('服务器启动')
})