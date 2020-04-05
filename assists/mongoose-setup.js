const mongoose = require('mongoose')

const connString = process.env.CONN_STRING

module.exports = () => {
  mongoose
    .set('useFindAndModify', false)
    .set('useUnifiedTopology', true)

  mongoose.connect(connString, {
    useNewUrlParser: true,
    useCreateIndex: true
  })

  mongoose.connection
    .on('connected', () => {
      console.log('Mongoose connection open to ' + connString);
    })
    .on('disconnected', () => {
      console.log('Mongoose connection closed');
    })
    .on('error', (err) => {
      console.log('Mongoose connection error: ' + err);
    })
}
