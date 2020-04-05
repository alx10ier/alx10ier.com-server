const router = new (require('koa-router'))
const { get, getAll, create, update, remove } = require('./post-controller')

// TODO: authorize before post
router.prefix('/posts')
router.get('/', getAll)
router.post('/', create)
router.get('/:id', get)
router.post('/:id', update)
router.delete('/:id', remove)

module.exports = router
