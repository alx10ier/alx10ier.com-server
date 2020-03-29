function errorHandler() {
  return async (ctx, next) => {
    try {
      await next()
      // 默认404状态不会报错，需要手动throw
      if (ctx.status == 404) {
        ctx.throw(404)
      }
    } catch (err) {
      ctx.status = err.status || ctx.status
      switch (ctx.status) {
        case 404:
          ctx.body = { error: 'Not found' }
          break
        case 401:
        case 400:
          ctx.body = { error: err.message }
          break
        default:
          ctx.body = { error: 'We have an unexpected server error' }
      }
    }
  }
}

module.exports = errorHandler;
