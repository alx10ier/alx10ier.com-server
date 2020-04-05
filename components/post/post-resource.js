const Post = require('./post-model')
const { createPostCategory } = require('./post-category-resource')

async function findPostByTitle (title) {
  return Post.findOne({title})
}

module.exports = {
  createPost: async ({ title, text, html, category, state }) => {
    // TODO 添加对手动修改日期的支持
    let errorMessage = ''
    if (!(title && category && state)) {
      errorMessage = 'Field missing'
    } else if (await findPostByTitle(title)) {
      errorMessage = 'Title exists'
    } else if (state !== 'draft' && state !== 'private' && state !== 'public') {
      errorMessage = 'Invalid state'
    }
    if (errorMessage) {
      throw { code: 400, message: errorMessage }
    }
    const validCategory = await createPostCategory(category)
    const post = new Post({
      title,
      text,
      html,
      category: validCategory.id,
      state
    })
    validCategory.posts.push(post.id)
    validCategory.save()
    return post.save()
  }
}