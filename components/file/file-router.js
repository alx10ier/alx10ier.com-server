const router = new (require('koa-router'))
const bodyParser = require('koa-body')
const FileType = require('file-type')
const { saveImage, makeImageDir } = require('./image-resource')

router.prefix('/files')
router.get('/', async ctx => {
  ctx.body = { message: 'file router' }
})

// TODO 移到file(image) controller里面
router.post('/images/upload',
  bodyParser({ multipart: true }),
  async ctx => {
    const { path, name } = ctx.request.files.upload
    const fileType = await FileType.fromFile(path)
    if (!fileType || !fileType.mime.startsWith('image')) {
      ctx.throw(400, 'Unsupported type')
    }
    const dirName = makeImageDir()
    const dest = __basedir + '/uploads/images/' + dirName + '/' + name
    try {
      await saveImage(name, path, dest).then(dest => {
        ctx.body = {
          message: 'image saved to ' + dest
        }
      })
    } catch (e) {
      // TODO deal with error
      console.log(e)
    }
})

module.exports = router