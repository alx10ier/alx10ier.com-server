const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  text: String,
  html: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'PostCategory' },
  state: { type: String, enum: ['draft', 'private', 'public'] }
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post
