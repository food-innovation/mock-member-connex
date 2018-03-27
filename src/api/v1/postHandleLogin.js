const postHandleLogin = (req, res) => {
  const {
    // username,
    // password,
    redirectUri
  } = req.body

  res.redirect(redirectUri)
}

module.exports = postHandleLogin
