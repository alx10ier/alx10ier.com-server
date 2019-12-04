const Router = require('koa-router')
const router = new Router({ prefix: '/posts' })
const { create } = require('./post-controller')
// const body = require('koa-body')

router.get('/', create)

module.exports = router
