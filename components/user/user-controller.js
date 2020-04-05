const { createUser } = require('./user-resource')
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
  }
}
