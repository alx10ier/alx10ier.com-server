const router = new (require('koa-router'))
const { createUser } = require('./user-controller')
const body = require('koa-body')

router.prefix('/users')
router.get('/', ctx => {
  ctx.body = {
    message: 'this is the user module'
  }
})
router.post('/', body(), createUser)

module.exports = router
