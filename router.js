const combine = require('koa-combine-routers')
const postRouter = require('./components/post/post-router')
const userRouter = require('./components/user/user-router')
const authRouter = new (require('koa-router'))
const testRouter = new (require('koa-router'))
const mainRouter = new (require('koa-router'))
const { secure, sign } = require('./assists/jwt')

mainRouter.get('/', ctx => {
  ctx.body = {
    message: "hi"
  }
})

authRouter.prefix('/auth')
authRouter.get('/', ctx => {
  // let { username, password } = ctx.request.body
  ctx.body = {
    token: sign({
      id: 'allier',
      name: 'jue'
    })
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
  postRouter,
  userRouter,
  authRouter,
  testRouter
)
