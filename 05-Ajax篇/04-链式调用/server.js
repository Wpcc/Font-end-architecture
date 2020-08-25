const http = require('http')

http.createServer((req,res) => {
    console.log(req.url)
		// res.writeHeader("Access-Control-Allow-Origin": "http://127.0.0.1")
		// res.writeHeader("Access-Control-Allow-Methods": "get,post,put,delete")
		// res.writeHeader("Access-Control-Allow-Credentials":"true")
		res.writeHeader('Content-Type':'text/plain')
		res.end('hello')
}).listen(3000,() => {
    console.log('server is running')
})