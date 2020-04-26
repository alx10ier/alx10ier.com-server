const { findAllLists, createList, createItem } = require('./todo-resource')

module.exports = {
  getAll: async (ctx) => {
    const lists = await findAllLists()
    ctx.body = lists
  },
  newList: async (ctx) => {
    const name = ctx.request.body.name
    try {
      const list = await createList(name)
      ctx.status = 201
      ctx.body = list
    } catch (e) {
      ctx.throw(e.code || 500, e.message)
    }
  },
  newItem: async (ctx) => {
    try {
      const { list, name } = ctx.request.body
      const item = await createItem(list, name)
      ctx.status = 201
      ctx.body = item
    } catch (e) {
      ctx.throw(e.code || 500, e.message)
    }
  }
}