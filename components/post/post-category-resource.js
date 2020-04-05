const PostCategory = require('./post-category-model')

async function findPostCategoryByName (name) {
  return PostCategory.findOne({ name });
}

module.exports = {
  createPostCategory: async name => {
    let postCategory = await findPostCategoryByName(name)
    if (postCategory) {
      return postCategory
    }
    postCategory = new PostCategory({ name })
    return postCategory.save()
  }
}