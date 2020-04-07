const { createUser, findUserByUsernameOrEmail } = require('./user-resource')
const { sign } = require('../../assists/jwt')

module.exports = {
  create: async ctx => {
    const { username, email, password } = ctx.request.body
    try {
      const user = await createUser({ username, email, password })
      ctx.status = 201
      ctx.body = sign({ sub: user.id })
    } catch (e) {
      ctx.throw(e.code || 500, e.message)
    }
  },

  login: async ctx => {
    const { username, password }  = ctx.request.body
    // 支持用用户名或邮箱登陆，所以检查同一个field
    const user = await findUserByUsernameOrEmail(username)
    if (!user) {
      ctx.throw(401, "Username or email doesn't exist")
    }
    if (await user.checkPassword(password)) {
      ctx.body = sign({ sub: user.id })
    } else {
      ctx.throw(401, 'Password incorrect')
    }
  }
}
