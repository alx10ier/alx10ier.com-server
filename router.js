const combine = require('koa-combine-routers')
const Router = require('koa-router')
const postRouter = require('./components/post/post-router')
const userRouter = require('./components/user/user-router')
const authRouter = require('./components/user/auth-router')
const fileRouter = require('./components/file/file-router')
const todoRouter = require('./components/todo/todo-router')
const testRouter = new Router()
const mainRouter = new Router()

mainRouter.get('/', ctx => {
  ctx.body = {
    message: "hi"
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
  testRouter,
  fileRouter,
  todoRouter
)
