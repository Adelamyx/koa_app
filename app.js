const koa = require("koa")
const Router = require("koa-router")
const mongoose = require("mongoose")
const bodyParser = require('koa-bodyparser');

// 实例化 koa
const app = new koa()
const router = new Router()

//
app.use(bodyParser());

// 引入user.js book.js
const users = require("./routes/api/user")
const books = require("./routes/api/book")

// 路由
router.get('/', async ctx => {
    ctx.body = {msg: 'hello 123'}
})

// 连接数据库
const db_url = 'mongodb://localhost:27017/library'
// 连接
mongoose.connect(db_url, { useNewUrlParser: true })
var db = mongoose.connection
// 连接成功 异常 断开
db.on('connected', () => {
  console.log('mongodb connect...');
})
db.on('error', (err) => {
  console.log(11111,err);
})
db.on('disconnected', () => {
  console.log('mongodb disconnection...');
})
// mongoose.connect(db_url, { useNewUrlParser: true })
//   .then(() => {
//     console.log('mongodb connect...');
//   }).catch(err => {
//     console.log(err);
//   })

// 配置路由地址 localhost:5000/api/users/test
router.use('/api/users', users);
router.use('/api/books', books);

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started on ${port}`);
})
