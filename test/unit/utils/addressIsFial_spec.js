const { expect } = require('chai')

const addressIsFial = require('src/utils/addressIsFial')

describe('addressIsFial', () => {
  context('given a fial.com.au address', () => {
    const address = 'bob@fial.com.au'
    it('returns true', () => {
      expect(addressIsFial(address)).to.be.true
    })
  })

  context('given another address', () => {
    const address = 'bob@notfial.com.au'
    it('returns false', () => {
      expect(addressIsFial(address)).to.be.false
    })
  })

  context('given nothing', () => {
    it('returns false', () => {
      expect(addressIsFial()).to.be.false
    })
  })
})
