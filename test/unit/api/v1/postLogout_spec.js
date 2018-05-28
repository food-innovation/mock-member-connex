const { expect } = require('chai')
const sinon = require('sinon')
const computeHash = require('src/utils/computeHash')

const postLogout = require('src/api/v1/postLogout')

describe('postLogout', () => {
  const res = {
    json: sinon.spy()
  }
  res.status = sinon.stub().returns(res)

  const req = {
    body: {
      Person_id: 8
    }
  }
  context('Wrong hash', () => {
    before(() => {
      postLogout({ ...req, body: { ...req.body, hash: 'some crap' } }, res)
    })

    after(() => {
      res.json.resetHistory()
      res.status.resetHistory()
    })

    it('calls res.status with 400', () => {
      expect(res.status).to.have.been.calledWith(400)
    })

    it('calls res.json with INVALID_REQUEST error', () => {
      expect(res.json).to.have.been.calledWith({
        success: false
      })
    })
  })

  context('Right hash', () => {
    before(() => {
      const hash = computeHash(req.body.Person_id)
      postLogout({ ...req, body: { ...req.body, hash } }, res)
    })

    after(() => {
      res.json.resetHistory()
      res.status.resetHistory()
    })

    it("didn't call res.status", () => {
      expect(res.status).not.to.have.been.called
    })

    it('calls res.json with success', () => {
      expect(res.json).to.have.been.calledWith({ success: true })
    })
  })
})
