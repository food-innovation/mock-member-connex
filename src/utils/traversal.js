const fs = require('fs')
const path = require('path')

const traversal = (base, basename) => {
  const jsFiles = file =>
    file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'

  const folders = file => file.indexOf('.') === -1

  const requireJs = (acc, elem) => {
    const controller = require(path.join(base, elem))
    acc[elem.slice(0, -3)] = controller
    return acc
  }

  const requireFolderIndex = (acc, elem) => {
    const controllers = require(path.join(base, elem, basename))
    Object.keys(controllers).forEach(controller => {
      acc[`${elem}_${controller}`] = controllers[controller]
    })
    return acc
  }

  const getApis = () => {
    const contents = fs.readdirSync(base)
    const api = contents.filter(jsFiles).reduce(requireJs, {})
    return contents.filter(folders).reduce(requireFolderIndex, api)
  }

  return getApis
}

module.exports = traversal
