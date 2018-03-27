const { expect } = require('chai')
const sinon = require('sinon')

const { CLIENT_ID, CLIENT_SECRET } = require('../../../../src/utils/config')
const { ERRORS } = require('../../../../src/utils/constants')

const postLogin = require('../../../../src/api/v1/postLogin')

describe('postLogin', () => {
  const res = {
    json: sinon.spy()
  }
  res.status = sinon.stub().returns(res)

  const req = {
    query: {
      Action: 'Token',
      code: 'some-code',
      redirect_uri: 'some redirect',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    }
  }

  context('Action = Token', () => {
    const expected = {
      access_token: 'some-awesome-jwt'
    }

    before(() => {
      postLogin(req, res)
    })

    after(() => {
      res.json.resetHistory()
    })

    it('calls res.json with the correct data', () => {
      expect(res.json).to.have.been.calledWith(expected)
    })
  })

  // TODO: do proper test for headers when headers stuff is implemented.
  context('Action = OAuthUserInfo', () => {
    const infoReq = {
      query: {
        ...req.query,
        Action: 'OAuthUserInfo'
      }
    }

    before(() => {
      postLogin(infoReq, res)
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
      postLogin(badReq, res)
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

  context('client_id is wrong', () => {
    const badReq = {
      query: {
        ...req.query,
        client_id: 'something else'
      }
    }

    before(() => {
      postLogin(badReq, res)
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

  context('client_secret is wrong', () => {
    const badReq = {
      query: {
        ...req.query,
        client_secret: 'something else'
      }
    }

    before(() => {
      postLogin(badReq, res)
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
