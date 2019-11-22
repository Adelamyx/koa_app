const Router = require("koa-router")
const Joi = require("joi")
const router = new Router();

// 引入Books
const Books = require("../../models/Books");

/**
 * @route GET api/books/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get("/test", async ctx => {
  ctx.status = 200;
  ctx.body = {
    msg: 'books work... ',
    ctx,
  }
})

/**
 * @route POST api/books/addbookitem
 * @desc 新增书籍接口地址
 * @access 接口是公开的
 */
router.post("/addbookitem", async ctx => {
  // 存储到数据库
  const findResult = await Books.find({book_name:ctx.request.body.book_name})
  if(findResult.length > 0) {
    ctx.status = 500,
    ctx.body = {
        book_name: '书籍已存在'
    }
  } else {
    // 没查到 就输入数据库
    let newBookItem = new Books({
        book_name: ctx.request.body.book_name,
        book_img: ctx.request.body.book_img,
        author: ctx.request.body.author,
        publisher: ctx.request.body.publisher,
        description: ctx.request.body.description,
        creator_name: ctx.request.body.creator_name,
    });
    // 存储到数据库
    await newBookItem.save()
    .then(books => {
      ctx.status = 200;
      ctx.body = books;
    })
    .catch(err => {
      console.log(err)
    });
  }
})

/**
 * @route GET api/books/changebooklist
 * @desc 获取书籍列表接口地址
 * @access 接口是公开的
 */
router.post("/changebooklist", async ctx => {
  const _body = ctx.request.body

  const wherestr = {'book_name': _body.book_name}
  const updatestr = {'publisher': 'abcdef'};

  console.log(333, wherestr, updatestr)

  const findResult = await Books.updateOne(wherestr, updatestr)
  const count = findResult.length
  ctx.status = 200;
  ctx.body = {
    list: findResult,
    count
  }
})

/**
 * @route GET api/books/getbooklist
 * @desc 获取书籍列表接口地址
 * @access 接口是公开的
 */
router.get("/getbooklist", async (ctx,next) => {
  const _query = ctx.request.query
  for(let item in _query) {
    if(_query[item] === '') {
      console.log(2222, item)
      delete _query[item]
    }
  }
  console.log(1231112122123, _query)

  const findResult = await Books.find({
    ..._query
  })

  const count = findResult.length
  ctx.status = 200;
  ctx.body = {
    list: findResult,
    count,
  }
})

module.exports = router.routes()
