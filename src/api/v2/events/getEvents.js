const { all } = require('src/scopedData/events')
const { find: findImage } = require('src/scopedData/images')
const authFail = require('src/utils/authFail')

/*
  https://[MCX Portal URL]/API/2.0/Event[?expand=Image]
*/
const getEvents = (req, res) => {
  const {
    query: { expand }
  } = req
  const failed = authFail(req)
  if (failed) res.status(401).json(failed)
  else {
    if (expand !== 'Image') {
      res.json(all())
    } else {
      res.json(
        all().map(event => ({
          ...event,
          Image: findImage(event.id)
        }))
      )
    }
  }
}

module.exports = getEvents
