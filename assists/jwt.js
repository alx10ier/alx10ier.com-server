const jwt = require('koa-jwt')
const jsonwebtoken = require('jsonwebtoken')
const secret = process.env.SECRET

module.exports = {
  secure: () => jwt({ secret }),
  sign: (payload) => jsonwebtoken.sign(payload, secret)
}
