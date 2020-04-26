const { TodoList, TodoItem } = require('./todo-model')

async function findListByName(name) {
  return TodoList.findOne({ name })
}

async function findAllLists() {
  return TodoList.find().populate('items')
}

async function createList(name) {
  if (await findListByName(name)) {
    throw { code: 400, message: 'name exists' }
  }
  const list = new TodoList({
    name,
    items: []
  })
  return list.save()
}

async function createItem(list, name) {
  const todoList = await TodoList.findOne({ id: list })
  console.log(todoList)
  if (!todoList) {
    throw { code: 400, message: "list doesn't exist" }
  } else {
    const item = new TodoItem({
      name
    })
    todoList.items.push(item.id)
    todoList.save()
    return item.save()
  }

}

module.exports = {
  findAllLists,
  createList,
  createItem
}