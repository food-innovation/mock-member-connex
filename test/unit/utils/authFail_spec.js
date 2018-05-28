const { expect } = require('chai')

const authFail = require('src/utils/authFail')

describe('authFail', () => {
  context('bearer token', () => {
    const req = {
      get: () => 'Bearer some-token'
    }

    it('returns false', () => {
      expect(authFail(req)).to.be.false
    })
  })

  context('given to token', () => {
    const req = {
      get: () => undefined
    }

    it('returns false', () => {
      expect(authFail(req)).to.deep.equal({
        code: 234200,
        message: 'Invalid Authorization Token.'
      })
    })
  })
})
