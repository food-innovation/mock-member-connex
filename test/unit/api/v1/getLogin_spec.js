const { expect } = require('chai')
const sinon = require('sinon')

const { ERRORS } = require('../../../../src/utils/constants')

const getLogin = require('../../../../src/api/v1/getLogin')

describe('getLogin', () => {
  const res = {
    json: sinon.spy()
  }
  res.status = sinon.stub().returns(res)

  const req = {
    query: {
      Action: 'OAuthUserInfo',
      access_token: 'some-access-token'
    }
  }
  context('Action = OAuthUserInfo', () => {
    before(() => {
      getLogin(req, res)
    })

    after(() => {
      res.json.resetHistory()
      res.status.resetHistory()
    })

    it('calls res.json once', () => {
      expect(res.json).to.have.been.calledOnce
    })
  })

  context('Action = something else', () => {
    const badReq = {
      query: {
        ...req.query,
        Action: 'something else'
      }
    }

    before(() => {
      getLogin(badReq, res)
    })

    after(() => {
      res.json.resetHistory()
      res.status.resetHistory()
    })

    const expected = { error: ERRORS.INVALID_REQUEST }

    it('calls res.status with expected 400', () => {
      expect(res.status).to.have.been.calledWith(400)
    })

    it('calls res.json with expected error', () => {
      expect(res.json).to.have.been.calledWith(expected)
    })
  })
})
