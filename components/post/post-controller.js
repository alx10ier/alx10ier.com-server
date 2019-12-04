const Post = require('./post-model')

module.exports = {
  create: ctx => {
    ctx.body = {
      message: "this is the post module"
    }
  }
}
