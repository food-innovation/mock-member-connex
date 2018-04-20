const { expect } = require('chai')
const sinon = require('sinon')

const postHandleRegister = require('../../../../src/api/v1/postHandleRegister')

describe('postHandleRegister', () => {
  const res = {
    redirect: sinon.spy()
  }
  const req = {
    body: {
      username: 'test',
      password: 'testy',
      redirectUri: 'https://go-here-now'
    }
  }

  before(() => {
    postHandleRegister(req, res)
  })

  it('calls res.redirect once with the redirectUri', () => {
    expect(res.redirect).to.have.been.calledWith(req.body.redirectUri)
  })
})
