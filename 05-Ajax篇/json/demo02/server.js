const http = require('http')

http.createServer((req,res) => {
	let data = {
		msg:'hello'
	}
	// 跨域
	res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:8848')
	
	res.end(JSON.stringify(data))
}).listen('3000',() => {
	console.log('server is running')
})