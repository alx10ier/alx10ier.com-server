const { createPost } = require('./post-resource')
const marked = require('marked')

module.exports = {
  create: async ctx => {
    const { title, text, category, state } = ctx.request.body
    const html = marked(text)
    try {
      const post = await createPost({
        title,
        text,
        html,
        category,
        state
      })
      ctx.status = 201
      ctx.body = post
    } catch (e) {
      ctx.throw(e.code || 500, e.message)
    }
  },
  update: ctx => {

  },
  remove: ctx => {

  },
  get: ctx => {

  },
  getAll: ctx => {
    ctx.body = {
      message: "this is the post module"
    }
  }
}
