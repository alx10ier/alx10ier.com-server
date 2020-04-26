const fs = require('fs')
const Image = require('./image-model')

const saveImage = (name, src, dest, relativePath) => {
  return new Promise((resolve, reject) => {
    const render = fs.createReadStream(src)
    const upStream = fs.createWriteStream(dest)
    render.pipe(upStream)
    upStream.on('finish', () => {
      const image = new Image({
        name,
        path: relativePath
      })
      image.save()
      resolve(relativePath)
    })
    upStream.on('error', (err) => {
      reject(err)
    })
  })
}

const getImage = async id => {
  return Image.findById(id)
}

const makeImageDir = () => {
  let dirname = ''
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 12; i++)
    dirname += possible.charAt(Math.floor(Math.random() * possible.length))
  fs.mkdirSync(__basedir + '/uploads/images/' + dirname)
  return dirname
}

module.exports = {
  saveImage,
  getImage,
  makeImageDir
}