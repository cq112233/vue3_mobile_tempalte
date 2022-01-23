const path = require('path')
const express = require('express')
var bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json({ limit: '1mb' })) // body-parser 解析json格式数据
app.use(bodyParser.urlencoded({ // 此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}))
// 这里我简单的 防token
let token = null
let refreshToken = null
app.post('/refreshToken', (req, res) => {
  console.log(req.body.refreshToken)
  // if (refreshToken !== req.body.data.refreshToken) return res.status(500).send()
  // render函数就是express对模板引擎的调用方法，它会自动调用模板引擎去你配置的目录下找index.html文件，并解析返回
  res.send({
    accessToken: 'i am token 1',
    refreshToken: 'i am refreshToken 1'
  })
})

app.post('/login', (req, res) => {
  token = `i am token ${req.body.roleId}`
  refreshToken = `i am refreshToken ${req.body.roleId}`
  // render函数就是express对模板引擎的调用方法，它会自动调用模板引擎去你配置的目录下找index.html文件，并解析返回
  res.send({
    accessToken: `i am token ${req.body.roleId}`,
    refreshToken: `i am refreshToken ${req.body.roleId}`
  })
})

app.post('/userinfo', (req, res) => {
  // render函数就是express对模板引擎的调用方法，它会自动调用模板引擎去你配置的目录下找index.html文件，并解析返回
  if (token !== req.headers.authorization) return res.status(401).send()
  res.send({
    id: 1,
    username: 'zhangsan',
    age: 18
    // roles: ? ['admin'] : ['employee']
  })
})
app.get('/test', (req, res) => {
  // render函数就是express对模板引擎的调用方法，它会自动调用模板引擎去你配置的目录下找index.html文件，并解析返回
  if (token !== req.headers.authorization) return res.status(401).send()
  res.send({
    title: '标题'
  })
})

// 启动服务
app.listen(8011, () => {
  console.log('server up to http://localhost:8011/')
})
