/* eslint-disable camelcase */
const {
  getPing,
  getVersions,
  v1_postLogin,
  v1_getLogin,
  v1_postHandleLogin,
  v1_getOAuthLogin
} = require('./api')

module.exports = {
  get: {
    '/': getVersions,
    '/ping': getPing,
    '/Login': v1_getLogin,
    '/OAuthLogin': v1_getOAuthLogin
  },
  post: {
    '/Login': v1_postLogin,
    '/handleLogin': v1_postHandleLogin
  }
}
