const { expect } = require('chai')

const computeHash = require('src/utils/computeHash')

describe('computeHash', () => {
  const appSecret = '123456789'
  const id = 8

  // as per example provided by MemberConnex
  const expected =
    '0xd984c9a9c5b5744d63f4c3e36a4ddfb16684642220ae19d568da45f6e382e2eb'

  it('generates the expected hash', () => {
    expect(computeHash(id, appSecret)).to.equal(expected)
  })
})
