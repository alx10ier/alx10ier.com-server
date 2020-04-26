const mongoose = require('mongoose')
const todoItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  status: { type: Boolean, default: false }
})

const TodoItem = mongoose.model('TodoItem', todoItemSchema)

const todoListSchema = mongoose.Schema({
  name: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TodoItem' }]
})

const TodoList = mongoose.model('TodoList', todoListSchema)

module.exports = { TodoItem, TodoList }