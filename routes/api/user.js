const Router = require("koa-router")
const router = new Router();
const bcrypt = require('bcryptjs');

// 引入Users
const Users = require("../../models/Users");

/**
 * @route GET api/users/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get("/test", async (ctx,next) => {
  ctx.status = 200;
  console.log(ctx, next)
  ctx.body = {
    msg: 'users work... ',
    ctx,
  }
})

/**
 * @route POST api/users/register
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.post("/register", async ctx => {
  // 存储到数据库
  const findResult = await Users.find({email:ctx.request.body.email})
  // console.log(findResult)
  // console.log(ctx.request.body)
  if(findResult.length > 0) {
    ctx.status = 500,
    ctx.body = {
      email: '邮箱已占用'
    }
  } else {
    // 没查到 就输入数据库
    let newUser = new Users({
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      password: ctx.request.body.password,
    });

    // 密码加密
    await bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
      });
    });
    // 存储到数据库
    await newUser.save()
    .then(user => {
      ctx.status = 200;
      ctx.body = user;
    })
    .catch(err => {
      console.log(err)
    });
  }
})

/**
 * @route GET api/users/list
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get("/list", async ctx => {
  const findResult = await Users.find()
  console.log(findResult)
  const count = findResult.length
  ctx.status = 200;
  ctx.body = {
    list: findResult,
    count
  }
})



module.exports = router.routes()
