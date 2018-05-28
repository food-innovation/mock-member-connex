const { find } = require('src/scopedData/companies')
const authFail = require('src/utils/authFail')

/*
  https://[MCX Portal URL]/API/2.0/Company/:id
*/
const getCompany = (req, res) => {
  const { id } = req.params
  const failed = authFail(req)
  if (failed) res.status(401).json(failed)
  else {
    const found = find(id)
    if (!found)
      res.status(404).json({
        code: 234201,
        message: `Unable to load Company with id ${id}`
      })
    else res.json(found)
  }
}

module.exports = getCompany
