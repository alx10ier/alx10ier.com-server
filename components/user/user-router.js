const Router = require('koa-router')
const router = new Router({ prefix: '/users' })
// const body = require('koa-body')

router.get('/', ctx => {
  ctx.body = {
    message: 'this is the user module'
  }
})

module.exports = router
