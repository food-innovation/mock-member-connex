const path = require('path')

const traversal = require('../../utils/traversal')

module.exports = traversal(__dirname, path.basename(module.filename))()
