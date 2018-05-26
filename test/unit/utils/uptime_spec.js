const { expect } = require('chai')

const uptime = require('src/utils/uptime')

describe('uptime', () => {
  let value
  before(() => {
    value = uptime()
  })

  it('returns a positive number', () => {
    expect(value).to.be.above(0)
  })
})
