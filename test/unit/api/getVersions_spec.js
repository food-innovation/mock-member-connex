const { expect } = require('chai')
const sinon = require('sinon')

const getVersions = require('../../../src/api/getVersions')
const { version } = require('../../../package.json')

describe('getVersions', () => {
  const req = {}
  const res = {
    json: sinon.spy()
  }

  const expected = [
    {
      version,
      path: '/api/v1'
    }
  ]

  before(() => {
    getVersions(req, res)
  })

  it('calls res.json with the correct data', () => {
    expect(res.json).to.have.been.calledWith(expected)
  })
})
