const User = require('./user-model')
const validator = require('validator')

async function getUserByUsernameOrEmail (username) {
  return await User.findOne({ username }) || await User.findOne({ email: username })
}

async function getUserByUsername (username) {
  return User.findOne({username})
}

async function getUserByEmail (email) {
  return User.findOne({email})
}

async function createUser ({ username, email, password }) {
  let errorMessage = ''
  if (!(username && email && password)) {
    errorMessage = 'Field missing'
  } else if (!validator.isEmail(email)) {
    errorMessage = 'Email validation failed'
  } else if (await getUserByUsername(username)) {
    errorMessage = 'Username exists'
  } else if (await getUserByEmail(email)) {
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

module.exports = {
  findUserByUsernameOrEmail: getUserByUsernameOrEmail,
  createUser
}