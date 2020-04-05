const User = require('./user-model')
const validator = require('validator')

module.exports = {
  findUserByUsernameOrEmail: async username => {
    return await User.findOne({ username }) || await User.findOne({ email: username })
  },

  findUserByUsername: async username => {
    return User.findOne({username})
  },

  findUserByEmail: async email => {
    return User.findOne({email})
  },

  createUser: async ({ username, email, password }) => {
    let errorMessage = ''
    if (!(username && email && password)) {
      errorMessage = 'Field missing'
    } else if (!validator.isEmail(email)) {
      errorMessage = 'Email validation failed'
    } else if (await findUserByUsername(username)) {
      errorMessage = 'Username exists'
    } else if (await findUserByEmail(email)) {
      errorMessage = 'Email exists'
    }
    if (errorMessage) {
      throw { code: 400, message: errorMessage }
    }
    const user = new User({
      username,
      email,
      password
    })
    return user.save()
  }
}