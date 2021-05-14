const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
  if (request.url === '/') {
    const html = fs.readFileSync('index.html', 'utf8')
    response.writeHead(200, {
      // 不知道为什么 html 文件无法进行强缓存
      'Content-Type': 'text/html;charset=utf8',
      'ETag': '123' // 浏览器缓存时间
    })
    response.end(html)
  }
  if (request.url === '/index.js') {
    response.writeHead(200, {
      'Content-Type': 'text/javascript',
      // 通过 expires 设置强缓存
      'Expires': new Date(Date.now() + 1000 * 10).toUTCString() // 浏览器缓存时间
    })
    response.end('console.log("script loaded twice")')
  }
  if (request.url === '/index.css') {
    const css = fs.readFileSync('index.css', 'utf8')
    response.writeHead(200, {
      // 通过 cache-control 设置强缓存
      'Content-Type': 'text/css',
      'Cache-Control': 'max-age=20' // 浏览器缓存时间
    })
    response.end(css)
  }
  if (request.url === '/a.css') {
    const css = fs.readFileSync('a.css', 'utf8')

    //  设置协商缓存
    const etag = request.headers['if-none-match']
    if(etag === '777') {
      response.writeHead(304, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=2000000, no-cache',
        'Last-Modified': '123',
        'Etag': '777'
      })
      response.end('') // 这里不传任何内容，即使有内容，浏览器也不会读取
    } else {
      response.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=2000000, no-cache', // 通过 no-cache，即使没过期浏览器也要向服务器验证，不会从缓存读取。
        'Last-Modified': '123', // 随便设的值
        'Etag': '777'
      })
      response.end(css)
    }
  }

}).listen(3000)
console.log('server listening on 3000')