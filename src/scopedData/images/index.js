const for71 = require('./for71')
const for85 = require('./for85')

const indexedImage = {
  '71': for71,
  '85': for85
}

const images = [...for71, ...for85]

const all = () => images
const find = id => indexedImage[id]

module.exports = {
  find,
  all
}
