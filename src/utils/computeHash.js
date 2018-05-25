const { createHmac } = require('crypto')

const { CLIENT_SECRET } = require('src/utils/config')

const computeHash = (id, secret = CLIENT_SECRET) =>
  `0x${createHmac('sha256', secret)
    .update(`${id}`)
    .digest('hex')}`

module.exports = computeHash
