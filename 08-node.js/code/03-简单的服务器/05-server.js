/* 
	根据不同路径，发送不同文件，并解决编码问题
	01、图片
	02、文本
	03、html
 */

let http = require('http')
let fs = require ('fs')

http.createServer((req,res) => {
	if(req.url === '/html'){
		fs.readFile('./source/01.html',(err, data) => {
			if(err){
				res.setHeader('Content-Type','text/plain;charset=utf-8')
				res.end('文件读取失败')
				return
			}
			res.setHeader('Content-Type','text/html;charset=utf-8')
			res.end(data.toString())
		})
	}
	else if(req.url === '/jpg'){
		fs.readFile('./source/02.jpg',(err, data) => {
			if(err){
				res.setHeader('Content-Type','text/plain;charset=utf-8')
				res.end('文件读取失败')
				return
			}
			res.setHeader('Content-Type','image/jpeg')
			res.end(data)
		})
	}
	else if(req.url === '/text'){
		fs.readFile('./source/03.text',(err, data) => {
			res.setHeader('Content-Type','text/plain;charset=utf-8')
			if(err){
				res.end('文件读取失败')
				return
			}
			res.end(data.toString())
		})
	}
}).listen(3000)

console.log('服务器已启动，监听3000端口号')