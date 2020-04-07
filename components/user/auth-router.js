const router = new (require('koa-router'))
const { login } = require('./user-controller')

router.prefix('/auth')
router.get('/', ctx => {
  ctx.body = {
    message: "auth"
  }
})

router.post('/',login)

module.exports = router