const { expect } = require('chai')
const sinon = require('sinon')

const postHandleLogin = require('../../../../src/api/v1/postHandleLogin')

describe('postHandleLogin', () => {
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
    postHandleLogin(req, res)
  })

  it('calls res.redirect once with the redirectUri', () => {
    expect(res.redirect).to.have.been.calledWith(req.body.redirectUri)
  })
})
