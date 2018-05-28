const { all } = require('src/scopedData/people')
const authFail = require('src/utils/authFail')

/*
  https://[MCX Portal URL]/API/2.0/Person?Action=List&DataFilter_id=2
*/
const getPeople = (req, res) => {
  // const { Action: action, DataFilter_id: dfi } = req.query
  const failed = authFail(req)
  if (failed) res.status(401).json(failed)
  else res.json(all())
}

module.exports = getPeople
