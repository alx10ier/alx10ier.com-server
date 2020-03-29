const Post = require('./post-model')

module.exports = {
  createPost: async ctx => {
    let { title, time, content } = ctx.request.body
    const newPost = new Post({
      title,
      time,
      content
    })
    const post = await newPost.save()
    ctx.status = 201
    ctx.body = {
      status: "success",
      post
    }
  },
  updatePost: ctx => {

  },
  deletePost: ctx => {

  },
  getPost: ctx => {

  },
  getAllPosts: ctx => {
    ctx.body = {
      message: "this is the post module"
    }
  }
}
