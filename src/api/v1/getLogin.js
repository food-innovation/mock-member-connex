const { ERRORS } = require('src/utils/constants')
const { fial, fialAdmin } = require('src/scopedData')

const { get, clear } = require('src/utils/memoryStore')
const addressIsFial = require('src/utils/addressIsFial')

/*
  https://[MCX Portal URL]/Login?Action=OAuthUserInfo&access_token=[some-token]
*/
const getLogin = (req, res) => {
  const { Action: action, access_token: token } = req.query

  if (action !== 'OAuthUserInfo' || !token) {
    res.status(400).json({ error: ERRORS.INVALID_REQUEST })
  } else {
    const email = get('email')
    clear('email')
    /* istanbul ignore next */
    const result = addressIsFial(email) ? fialAdmin : fial
    res.json(result)
  }
}

module.exports = getLogin
