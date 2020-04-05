const combine = require('koa-combine-routers')
const postRouter = require('./components/post/post-router')
const userRouter = require('./components/user/user-router')
const authRouter = new (require('koa-router'))
const testRouter = new (require('koa-router'))
const mainRouter = new (require('koa-router'))
const { sign } = require('./assists/jwt')
const { findUserByUsernameOrEmail } = require('./components/user/user-resource')

mainRouter.get('/', ctx => {
  ctx.body = {
    message: "hi"
  }
})

authRouter.prefix('/auth')
authRouter.get('/', ctx => {
  ctx.body = {
    message: "auth"
  }
})
authRouter.post('/', async ctx => {
  const { username, password }  = ctx.request.body
  // 支持用用户名或邮箱登陆，所以检查同一个field
  const user = await findUserByUsernameOrEmail(username)
  if (!user) {
    ctx.throw(401, "Username or email doesn't exist")
  }
  if (await user.checkPassword(password)) {
    ctx.body = sign({ sub: user.id })
  } else {
    ctx.throw(401, 'Password incorrect')
  }
})

testRouter.prefix('/test')
// testRouter.use(secure())
testRouter.get('/', ctx => {
  ctx.body = {
    message: "success"
  }
})

// combine routers with their routes() and allowedMethods()
module.exports = combine(
  mainRouter,
  postRouter,
  userRouter,
  authRouter,
  testRouter
)
