const { expect } = require('chai')
const sinon = require('sinon')

const getEvent = require('src/api/v2/events/getEvent')
const { testEvent: event } = require('src/scopedData/events/')

describe('getEvent', () => {
  const res = {
    json: sinon.spy()
  }
  res.status = sinon.stub().returns(res)
  const resetStubs = () => {
    res.json.resetHistory()
    res.status.resetHistory()
  }

  context('given a valid token in the header', () => {
    context('given a known id', () => {
      context('without images', () => {
        const req = {
          get: () => 'some-access-token',
          params: { id: event.id },
          query: {}
        }

        before(() => {
          getEvent(req, res)
        })

        after(resetStubs)

        it("didn't call res.status", () => {
          expect(res.status).not.to.have.been.called
        })

        it('called res.json', () => {
          expect(res.json).to.have.been.calledOnce
        })
      })

      context('with images', () => {
        const req = {
          get: () => 'some-access-token',
          params: { id: event.id },
          query: { expand: 'Image' }
        }

        before(() => {
          getEvent(req, res)
        })

        after(resetStubs)

        it("didn't call res.status", () => {
          expect(res.status).not.to.have.been.called
        })

        it('called res.json', () => {
          expect(res.json).to.have.been.calledOnce
        })
      })
    })

    context('given an unknown id', () => {
      const req = {
        get: () => 'some-access-token',
        params: { id: 0 },
        query: {}
      }

      before(() => {
        getEvent(req, res)
      })

      after(resetStubs)

      it('called res.status', () => {
        expect(res.status).to.have.been.calledWith(404)
      })

      it('called res.json', () => {
        expect(res.json).to.have.been.calledOnce
      })
    })
  })

  context('without a valid token in the header', () => {
    const req = {
      get: () => undefined,
      params: { id: 0 },
      query: {}
    }

    before(() => {
      getEvent(req, res)
    })

    after(resetStubs)

    it('called res.status', () => {
      expect(res.status).to.have.been.calledWith(401)
    })

    it('called res.json', () => {
      expect(res.json).to.have.been.calledOnce
    })
  })
})
