const postHandleRegister = (req, res) => {
  const {
    // firstname,
    // lastname,
    // email
    redirectUri
  } = req.body

  res.redirect(redirectUri)
}

module.exports = postHandleRegister
