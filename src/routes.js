/* eslint-disable camelcase */
const {
  getPing,
  getVersions,
  v1_postLogin,
  v1_postLogout,
  v1_getLogin,
  v1_postHandleLogin,
  v1_getOAuthLogin,
  v1_getRegister,
  v1_postHandleRegister
} = require('./api')

module.exports = {
  get: {
    '/': getVersions,
    '/ping': getPing,
    '/Login': v1_getLogin,
    '/OAuthLogin': v1_getOAuthLogin,
    '/Register': v1_getRegister
  },
  post: {
    '/Login': v1_postLogin,
    '/Logout': v1_postLogout,
    '/handleLogin': v1_postHandleLogin,
    '/handleRegister': v1_postHandleRegister
  }
}
