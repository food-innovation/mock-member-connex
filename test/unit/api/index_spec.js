const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

describe('api/', () => {
  const mockTraverse = sinon.spy()
  const mockTraversal = () => mockTraverse

  before(() => {
    proxyquire('src/api/', {
      'src/utils/traversal': mockTraversal
    })
  })

  it('called traversal', () => {
    expect(mockTraverse).to.have.been.called
  })
})
