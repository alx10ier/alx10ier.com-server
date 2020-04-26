const router = new (require('koa-router'))
const {getAll, newList, newItem} = require('./todo-controller')

router.prefix('/todos')
router.get('/', getAll)
router.post('/', newList)
router.post('/:list', newItem)

module.exports = router