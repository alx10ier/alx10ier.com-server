const app = new (require('koa'))
const logger = require('koa-logger')
const router = require('./router')
const mongooseSetup = require('./assists/mongoose-setup')

app.use(logger())
app.use(router())

app.listen(3000, () => console.log('Listening on port 3000'))
