const { find } = require('src/scopedData/events')
const authFail = require('src/utils/authFail')

/*
  https://[MCX Portal URL]/API/2.0/Event/:id
*/
const getEvent = (req, res) => {
  const { id } = req.params
  const failed = authFail(req)
  if (failed) res.status(401).json(failed)
  else {
    const found = find(id)
    if (!found)
      res.status(404).json({
        code: 234221,
        message: `Unable to load Event with id ${id}`
      })
    else res.json(found)
  }
}

module.exports = getEvent
