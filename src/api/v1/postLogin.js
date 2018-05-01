const uuid = require('uuid/v4')

const { CLIENT_ID, CLIENT_SECRET } = require('../../utils/config')
const { ERRORS } = require('../../utils/constants')

/*
  https://[MCX Portal URL]/Login?Action=Token&
    code=[authorisation_code]&
    redirect_uri=[redirect_uri]&
    client_id=[client_id]&
    client_secret=[client_secret]
*/

const postLogin = (req, res) => {
  const {
    Action: action,
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret
  } = req.query

  if (
    CLIENT_ID !== clientId ||
    CLIENT_SECRET !== clientSecret ||
    action !== 'Token' ||
    !redirectUri ||
    !code
  ) {
    res.status(400).json({ error: ERRORS.INVALID_REQUEST })
  } else {
    res.json({
      access_token: uuid()
    })
  }
}

module.exports = postLogin
