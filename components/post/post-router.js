const router = new (require('koa-router'))
const { getPost, getAllPosts, createPost, updatePost, deletePost } = require('./post-controller')
const body = require('koa-body')

// TODO: authorize before post

router.prefix('/posts')
router.get('/', getAllPosts)
router.post('/', body(), createPost)
router.get('/:id', getPost)
router.post('/:id', body(), updatePost)
router.delete('/:id', deletePost)

module.exports = router
