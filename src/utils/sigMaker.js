const { createHash } = require('crypto')

const { MEMBER_CONNEX_SALT } = require('./constants')

const caseInsensitive = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase())
const packFields = fields => (acc, elem) => {
  acc = acc.concat(`${elem}${fields[elem]}`)
  return acc
}

const sigMaker = (fields, salt = MEMBER_CONNEX_SALT) => {
  // sort param name by alphabetic asc and append its value
  const sortedKeys = Object.keys(fields).sort(caseInsensitive)
  const fieldString = sortedKeys.reduce(packFields(fields), '')
  // append salt to the string's end
  const toBeHashed = fieldString.concat(`salt${salt}`)
  // hash it
  const hash = createHash('md5')
  hash.update(toBeHashed)
  return hash.digest('hex')
}

module.exports = sigMaker
