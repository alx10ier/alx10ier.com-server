const combine = require('koa-combine-routers')

const postRouter = require('./components/post/post-router')
const userRouter = require('./components/user/user-router')

// combine routers with their routes() and allowedMethods()
module.exports = combine(
  postRouter,
  userRouter
)
