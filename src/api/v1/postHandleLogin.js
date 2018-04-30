const { set } = require('../../utils/memoryStore')

const postHandleLogin = (req, res) => {
  const {
    username,
    // password,
    redirectUri
  } = req.body

  set('email', username)

  res.redirect(redirectUri)
}

module.exports = postHandleLogin
