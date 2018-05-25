const uptime = require('src/utils/uptime')

const getPing = (req, res) => {
  res.json({
    response: 'Okay',
    uptime: uptime()
  })
}

module.exports = getPing
