const makeApp = require('./utils/appMaker')
const { PORT } = require('./utils/config')

const start = async () => {
  const app = makeApp()
  const server = await app.listen(PORT)

  return { server }
}

module.exports = {
  start
}
