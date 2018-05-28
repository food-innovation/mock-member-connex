const { expect } = require('chai')
const sinon = require('sinon')

const getVersions = require('src/api/getVersions')
const { version } = require('package.json')

describe('getVersions', () => {
  const req = {}
  const res = {
    json: sinon.spy()
  }

  const expected = [
    {
      version,
      path: '/api/1'
    },
    {
      version: 2,
      path: '/API/2.0'
    }
  ]

  before(() => {
    getVersions(req, res)
  })

  it('calls res.json with the correct data', () => {
    expect(res.json).to.have.been.calledOnce
    expect(res.json.args[0][0]).to.deep.equal(expected)
  })
})
