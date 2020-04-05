const router = new (require('koa-router'))
const { create } = require('./user-controller')

router.prefix('/users')
router.get('/', ctx => {
  ctx.body = {
    message: 'this is the user module'
  }
})
router.post('/', create)

module.exports = router
