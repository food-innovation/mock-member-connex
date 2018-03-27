const path = require('path')

const traversal = require('../../../../src/utils/traversal')

module.exports = traversal(__dirname, path.basename(module.filename))()
