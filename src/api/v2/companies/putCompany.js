const { find, update } = require('src/scopedData/companies')
const authFail = require('src/utils/authFail')

/*
  PUT https://[MCX Portal URL]/API/2.0/Company/:id
*/
const putCompany = (req, res) => {
  const {
    params: { id },
    body
  } = req
  const failed = authFail(req)
  if (failed) res.status(401).json(failed)
  else {
    const found = find(id)
    if (!found)
      res.status(404).json({
        code: 234201,
        message: `Unable to load Company with id ${id}`
      })
    else res.json(update(id, body))
  }
}

module.exports = putCompany
