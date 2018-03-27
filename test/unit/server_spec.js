const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire').noCallThru()

describe('server', () => {
  const mockApp = {
    listen: sinon.stub().returnsPromise()
  }
  const mockMakeApp = sinon.stub().returns(mockApp)

  const server = proxyquire('../../src/server', {
    './utils/appMaker': mockMakeApp
  })

  const mockServer = 'a server'

  let outcome

  before(async () => {
    mockApp.listen.resolves(mockServer)
    outcome = await server.start()
  })

  it('invoked app.listen', () => {
    expect(mockApp.listen).to.have.been.calledOnce
  })

  it('returns the server, database, and jobs', () => {
    expect(outcome).to.have.property('server', mockServer)
  })
})
