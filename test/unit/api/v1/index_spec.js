const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

describe('api/v1', () => {
  const mockTraverse = sinon.spy()
  const mockTraversal = () => mockTraverse

  before(() => {
    proxyquire('src/api/v1', {
      'src/utils/traversal': mockTraversal
    })
  })

  it('called traversal', () => {
    expect(mockTraverse).to.have.been.called
  })
})
