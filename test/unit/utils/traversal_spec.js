/* eslint-disable camelcase */
const { expect } = require('chai')

const { outer, test_inner } = require('test/unit/fixtures/api')

describe('traversal', () => {
  it('traversed the outer', () => {
    expect(outer).to.exist
  })

  it('traversed the inner', () => {
    expect(test_inner).to.exist
  })
})
