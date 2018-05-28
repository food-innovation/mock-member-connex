const computeHash = require('src/utils/computeHash')

/*
  POST https://[MCX Portal URL]/Logout
  Person_id=x
  hash=0000000
*/
const postLogout = (req, res) => {
  const { Person_id: id, hash } = req.body

  if (computeHash(id) !== hash) res.status(400).json({ success: false })
  else res.json({ success: true })
}

module.exports = postLogout
