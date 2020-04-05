const router = new (require('koa-router'))
const { createUser } = require('./user-controller')

router.prefix('/users')
router.get('/', ctx => {
  ctx.body = {
    message: 'this is the user module'
  }
})
router.post('/', createUser)

module.exports = router
