const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

describe('appMaker', () => {
  const fakeCors = 'cors'
  const mockCors = sinon.stub().returns(fakeCors)
  const mockUse = sinon.spy()
  const mockRest = sinon.spy()

  const fakeExpress = () => ({
    use: mockUse
  })

  const makeApp = proxyquire('../../../src/utils/appMaker', {
    express: fakeExpress,
    cors: mockCors,
    './rest': mockRest
  })

  let app

  before(() => {
    app = makeApp()
  })

  it('uses cors', () => {
    expect(mockCors).to.have.been.calledOnce
    expect(mockUse).to.have.been.calledWith(fakeCors)
  })

  it('invokes rest with app', () => {
    expect(mockRest).to.have.been.calledWith(app)
  })
})
