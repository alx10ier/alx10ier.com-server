const User = require('./user-model')

module.exports = {
  createUser: async ctx => {
    let { username, email, password } = ctx.request.body
    const newUser = new User({
      username,
      email,
      password
    })
    const user = await newUser.save()
    ctx.status = 201
    ctx.body = {
      status: "success",
      user
    }
  }
}
