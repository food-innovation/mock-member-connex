const { find } = require('src/scopedData/images')
const authFail = require('src/utils/authFail')

/*
  https://[MCX Portal URL]/API/2.0/Event/:id/Image
*/
const getImages = (req, res) => {
  // const { Action: action, DataFilter_id: dfi } = req.query
  const { id } = req.params

  const failed = authFail(req)
  if (failed) res.status(401).json(failed)
  else res.json(find(id))
}

module.exports = getImages
