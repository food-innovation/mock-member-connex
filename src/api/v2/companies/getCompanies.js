const { all } = require('src/scopedData/companies')
const authFail = require('src/utils/authFail')

/*
  https://[MCX Portal URL]/API/2.0/Company?Action=List&DataFilter_id=2
*/
const getCompanies = (req, res) => {
  // const { Action: action, DataFilter_id: dfi } = req.query
  const failed = authFail(req)
  if (failed) res.status(401).json(failed)
  else res.json(all())
}

module.exports = getCompanies
