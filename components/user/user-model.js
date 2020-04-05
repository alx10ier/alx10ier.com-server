const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_FACTOR = 10

// unique:如果有重复的field，会报错“MongoError: E11000 ”
// require:如果相关field为空，会报错“User Validation Failed”
// 需要在save之前检查这些field，而不是通过database自己的报错来判断
// 个人网站，所以不需要太多的用户信息，只提供给管理员使用，后续可增加密码找回等功能
const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

// 不能使用arrow fucntion，因为需要this
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
