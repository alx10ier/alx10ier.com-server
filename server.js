require('dotenv').config()

const server = new (require('koa'))
const logger = require('koa-logger')
const bodyParser = require('koa-body')
const cors = require('@koa/cors')

const router = require('./router')
const errorHandler = require('./middlewares/error-handler')

require('./assists/mongoose-setup')()

global.__basedir = __dirname

server
  .use(errorHandler())
  .use(logger())
  .use(cors())
  .use(bodyParser())
  .use(router())

const port = process.env.PORT || 3000
server.listen(port, () => console.log('Listening on port ' + port))
