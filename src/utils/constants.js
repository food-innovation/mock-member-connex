const ERRORS = {
  INVALID_REQUEST: 'invalid request'
}

const MEMBER_CONNEX_SALT = process.env.MEMBER_CONNEX_SALT || '12345678'

module.exports = {
  ERRORS,
  MEMBER_CONNEX_SALT
}
