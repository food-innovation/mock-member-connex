const { version } = require('package.json')

const getVersions = (req, res) => {
  res.json([{ version, path: '/api/1' }, { version: 2, path: '/API/2.0' }])
}

module.exports = getVersions
