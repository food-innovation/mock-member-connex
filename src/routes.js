/* eslint-disable camelcase */
const {
  getPing,
  getVersions,
  v1_postLogin,
  v1_postHandleLogin,
  v1_getOAuthLogin
} = require('./api')

module.exports = {
  get: {
    '/': getVersions,
    '/ping': getPing,
    '/OAuthLogin': v1_getOAuthLogin
  },
  post: {
    '/Login': v1_postLogin,
    '/handleLogin': v1_postHandleLogin
  }
}
