const express = require('express')
const app = express()
const port = 3000

app.get('/',(req,res) => {
  res.send('hello world!')
  console.log('收到请求/')
})

app.get('/pfsm-api/huaxincem/map',(req,res) => {
  res.send('about')
  console.log('收到请求/about')
})

app.listen(port, () => {
  console.log('app listening on port')
})