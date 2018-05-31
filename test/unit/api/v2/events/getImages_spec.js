const { expect } = require('chai')
const sinon = require('sinon')

const getImages = require('src/api/v2/events/getImages')

describe('getImages', () => {
  const res = {
    json: sinon.spy()
  }
  res.status = sinon.stub().returns(res)
  const resetStubs = () => {
    res.json.resetHistory()
    res.status.resetHistory()
  }

  context('given a valid token in the header', () => {
    const req = {
      params: { id: '71' },
      get: () => 'some-access-token'
    }

    before(() => {
      getImages(req, res)
    })

    after(resetStubs)

    it("didn't call res.status", () => {
      expect(res.status).not.to.have.been.called
    })

    it('called res.json', () => {
      expect(res.json).to.have.been.calledOnce
    })
  })

  context('without a valid token in the header', () => {
    const req = {
      params: { id: '71' },
      get: () => undefined
    }

    before(() => {
      getImages(req, res)
    })

    after(resetStubs)

    it('called res.status', () => {
      expect(res.status).to.have.been.calledWith(401)
    })

    it('called res.json', () => {
      expect(res.json).to.have.been.calledOnce
    })
  })
})
