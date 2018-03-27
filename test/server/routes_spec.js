const { expect } = require('chai')
const request = require('supertest')
const { start } = require('../../src/server')

describe('Routes', () => {
  let server

  before(async () => {
    ;({ server } = await start())
  })

  after(() => {
    server.close()
  })

  describe('GET /', () => {
    it('returns a list of versions and status code 200', done => {
      request(server)
        .get('/')
        .end((err, res) => {
          expect(err).to.not.exist
          expect(res.statusCode).to.equal(200)
          expect(res.body[0].version).to.equal(1)
          expect(res.body[0].path).to.equal('/api/v1')
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
          expect(res.body.response).to.equal('Okay')
          done()
        })
    })
  })
})
