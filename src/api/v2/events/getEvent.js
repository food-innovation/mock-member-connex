const { find } = require('src/scopedData/events')
const { find: findImages } = require('src/scopedData/images')
const authFail = require('src/utils/authFail')

/*
  https://[MCX Portal URL]/API/2.0/Event/:id[?expand=Image]
*/
const getEvent = (req, res) => {
  const {
    params: { id },
    query: { expand }
  } = req

  const failed = authFail(req)
  if (failed) res.status(401).json(failed)
  else {
    const found = find(id)
    if (!found)
      res.status(404).json({
        code: 234221,
        message: `Unable to load Event with id ${id}`
      })
    else {
      if (expand !== 'Image') {
        res.json(found)
      } else {
        const images = findImages(id)
        res.json({ ...found, Image: images })
      }
    }
  }
}

module.exports = getEvent
