const { ERRORS } = require('src/utils/constants')
const computeHash = require('src/utils/computeHash')

/*
  POST https://[MCX Portal URL]/Logout
  Person_id=x
  hash=0000000
*/
const postLogout = (req, res) => {
  const { Person_id: id, hash } = req.body

  if (computeHash(id) !== hash)
    res.status(400).json({ error: ERRORS.INVALID_REQUEST })
  else res.json({ success: true })
}

module.exports = postLogout
