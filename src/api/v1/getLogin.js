const { ERRORS } = require('../../utils/constants')
const { fial } = require('../../scopedData')

/*
  https://[MCX Portal URL]/Login?Action=OAuthUserInfo&access_token=[some-token]
*/
const getLogin = (req, res) => {
  const { Action: action, access_token: token } = req.query

  if (action !== 'OAuthUserInfo' || !token) {
    res.status(400).json({ error: ERRORS.INVALID_REQUEST })
  } else {
    res.json(fial)
  }
}

module.exports = getLogin
