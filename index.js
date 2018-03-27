const Server = require('./src/server')

process.on('unhandledRejection', (reason, p) => {
  // eslint-disable-next-line no-console
  console.log('Unhandled rejection in promise', p, 'caused by', reason)
})

Server.start()
