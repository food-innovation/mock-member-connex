const { expect } = require('chai')
const sinon = require('sinon')

const { CLIENT_ID } = require('../../../../src/utils/config')
const { ERRORS } = require('../../../../src/utils/constants')

const getOAuthLogin = require('../../../../src/api/v1/getOAuthLogin')

describe('getOAuthLogin', () => {
  const res = {
    send: sinon.spy(),
    json: sinon.spy()
  }

  res.status = sinon.stub().returns(res)

  const req = {
    query: {
      Action: 'MCXLogin',
      client_id: CLIENT_ID,
      scope: 'default',
      Provider: 'some provider',
      redirect_uri: 'https://whatever',
      state: 'some state'
    }
  }

  context('Action = MCXLogin', () => {
    before(() => {
      getOAuthLogin(req, res)
    })

    after(() => {
      res.send.resetHistory()
    })

    it('calls res.send once', () => {
      expect(res.send).to.have.been.calledOnce
    })
  })

  context('Action != MCXLogin', () => {
    const badReq = {
      query: {
        ...req.query,
        Action: 'something else'
      }
    }

    before(() => {
      getOAuthLogin(badReq, res)
    })

    after(() => {
      res.status.resetHistory()
      res.json.resetHistory()
    })

    it('calls set the status to 400', () => {
      expect(res.status).to.have.been.calledWith(400)
    })

    it('calls res.json with an invalid request error', () => {
      expect(res.json).to.have.been.calledWith({ error: ERRORS.INVALID_REQUEST })
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
      getOAuthLogin(badReq, res)
    })

    after(() => {
      res.status.resetHistory()
      res.json.resetHistory()
    })

    it('calls set the status to 400', () => {
      expect(res.status).to.have.been.calledWith(400)
    })

    it('calls res.json with an invalid request error', () => {
      expect(res.json).to.have.been.calledWith({ error: ERRORS.INVALID_REQUEST })
    })
  })
})
