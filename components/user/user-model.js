const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_FACTOR = 10

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String
})

userSchema.pre('save', async function() {
  const user = this
  if (user.isModified()) {
    user.password = await bcrypt.hash(user.password, SALT_FACTOR)
  }
})

userSchema.methods.checkPassword = async function(guess) {
  return await bcrypt.compare(guess, this.password)
}

const User = mongoose.model('User', userSchema)
module.exports = User
