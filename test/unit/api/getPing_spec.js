const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

describe('getPing', () => {
  const req = {}
  const res = {
    json: sinon.spy()
  }
  const fakeUptime = 100

  const mockUptime = () => fakeUptime

  const getPing = proxyquire('src/api/getPing', {
    'src/utils/uptime': mockUptime
  })

  const expected = {
    response: 'Okay',
    uptime: fakeUptime
  }

  before(() => {
    getPing(req, res)
  })

  it('calls res.json with the correct data', () => {
    expect(res.json).to.have.been.calledWith(expected)
  })
})
