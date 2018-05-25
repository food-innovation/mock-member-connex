const { version } = require('package.json')

const getVersions = (req, res) => {
  res.json([{ version, path: '/api/v1' }])
}

module.exports = getVersions
