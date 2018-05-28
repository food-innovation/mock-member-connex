const { all } = require('src/scopedData/events')
const authFail = require('src/utils/authFail')

/*
  https://[MCX Portal URL]/API/2.0/Event
*/
const getEvents = (req, res) => {
  // const { Action: action, DataFilter_id: dfi } = req.query
  const failed = authFail(req)
  if (failed) res.status(401).json(failed)
  else res.json(all())
}

module.exports = getEvents
