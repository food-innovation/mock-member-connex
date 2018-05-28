const { expect } = require('chai')
const request = require('supertest')
const { start } = require('src/server')
const { version } = require('package.json')

describe('Routes', () => {
  let server

  before(async () => {
    ;({ server } = await start())
  })

  after(() => {
    server.close()
  })

  // NOTE: if this is not returning the right version then
  // check that an old version of the mock server is not
  // actually running in the background
  describe('GET /', () => {
    it('returns a list of versions and status code 200', done => {
      request(server)
        .get('/')
        .end((err, res) => {
          expect(err).to.not.exist
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.have.length(2)
          expect(res.body[0]).to.have.property('version', version)
          expect(res.body[0]).to.have.property('path', '/api/1')
          expect(res.body[1]).to.have.property('version', 2)
          expect(res.body[1]).to.have.property('path', '/API/2.0')
          done()
        })
    })
  })

  describe('GET /ping', () => {
    it('returns an Okay result and status code 200', done => {
      request(server)
        .get('/ping')
        .end((err, res) => {
          expect(err).to.not.exist
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.have.property('response', 'Okay')
          done()
        })
    })
  })
})
