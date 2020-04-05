const mongoose = require('mongoose')
const Post = require('./post-model')

const postCategorySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
}, {
  timestamps: true
})

const PostCategory = mongoose.model('PostCategory', postCategorySchema)
module.exports = PostCategory