require('dotenv').config()
const app = new (require('koa'))
const logger = require('koa-logger')
const router = require('./router')

require('./assists/mongoose-setup')()

app.use(logger())
app.use(router())

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Listening on port ' + port))
