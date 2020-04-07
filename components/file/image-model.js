const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  uploadAt: { type: Date, default: Date.now }
})

const Image = mongoose.model('Image', imageSchema)
module.exports = Image
