const { expect } = require('chai')

const { get, set } = require('../../../src/utils/memoryStore')

describe('memoryStore', () => {
  const key = 'a key'
  const value = 'a value'

  describe('set', () => {
    it('sets a value without error', () => {
      expect(() => set(key, value)).not.to.throw
    })
  })

  describe('get', () => {
    before(() => {
      set(key, value)
    })

    it('gets the value given the key', () => {
      expect(get(key)).to.equal(value)
    })

    it('getting with an unset key returns undefined', () => {
      expect(get('not a known key')).to.be.undefined
    })
  })
})
