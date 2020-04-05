const { findUserByEmail, findUserByUsername, createUser } = require('./user-resource')
const { sign } = require('../../assists/jwt')
const validator = require('validator')

module.exports = {
  createUser: async ctx => {
    const { username, email, password } = ctx.request.body
    if (!(username && email && password)) {
      ctx.throw(400, 'Field missing')
    }
    if (!validator.isEmail(email)) {
      ctx.throw(400, 'Email validation failed')
    }
    if (await findUserByUsername(username)) {
      ctx.throw(400, 'Username exists')
    }
    if (await findUserByEmail(email)) {
      ctx.throw(400, 'Email exists')
    }
    const user = await createUser(username, email, password)
    ctx.status = 201
    ctx.body = sign({ sub: user.id })
  }
}
