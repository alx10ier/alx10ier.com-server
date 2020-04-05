const User = require('./user-model')

module.exports = {
  findUserByUsernameOrEmail: async username => {
    return await User.findOne({ username }) || await User.findOne({ email: username })
  },

  findUserByUsername: async username => {
    return User.findOne({username});
  },

  findUserByEmail: async email => {
    return User.findOne({email});
  },

  createUser: async (username, email, password) => {
    const user = new User({
      username,
      email,
      password
    })
    return user.save()
  }
}