const { expect } = require('chai')
const sinon = require('sinon')

const { ERRORS } = require('../../../../src/utils/constants')
const sigMaker = require('../../../../src/utils/sigMaker')

const getRegister = require('../../../../src/api/v1/getRegister')

const addSig = req => {
  const { query } = req
  const sig = sigMaker(query)
  return {
    query: {
      ...query,
      sig
    }
  }
}

describe('getRegister', () => {
  const res = {
    json: sinon.spy(),
    send: sinon.spy()
  }
  res.status = sinon.stub().returns(res)

  const testErrorCondition = (label, errRequest) => {
    context(label, () => {
      before(() => {
        getRegister(errRequest, res)
      })

      after(() => {
        res.json.resetHistory()
        res.status.resetHistory()
      })

      const expected = { error: ERRORS.INVALID_REQUEST }

      it('calls res.status with expected 400', () => {
        expect(res.status).to.have.been.calledWith(400)
      })

      it('calls res.json with expected error', () => {
        expect(res.json).to.have.been.calledWith(expected)
      })
    })
  }

  const req = {
    query: {
      Provider: 'AFC',
      Redir: 'some redirect'
    }
  }

  context('no fields provided', () => {
    before(() => {
      getRegister(addSig(req), res)
    })

    after(() => {
      res.send.resetHistory()
    })

    it('calls res.json once', () => {
      expect(res.send).to.have.been.calledOnce
    })
  })

  context('a named field provided', () => {
    before(() => {
      getRegister(
        addSig({
          query: {
            ...req.query,
            firstname: 'Bob'
          }
        }),
        res
      )
    })

    after(() => {
      res.send.resetHistory()
    })

    it('calls res.json once', () => {
      expect(res.send).to.have.been.calledOnce
    })

    it('the named field is a pre-set value', () => {
      expect(res.send.args[0][0]).to.contain('Bob')
    })
  })

  context('a named selection provided', () => {
    before(() => {
      getRegister(
        addSig({
          query: {
            ...req.query,
            usertype: 'supplier'
          }
        }),
        res
      )
    })

    after(() => {
      res.send.resetHistory()
    })

    it('calls res.json once', () => {
      expect(res.send).to.have.been.calledOnce
    })

    it('the named selection selected the pre-set value', () => {
      expect(res.send.args[0][0]).to.contain('value="supplier" selected')
    })
  })

  testErrorCondition(
    'Provider = something else',
    addSig({
      query: {
        ...req.query,
        Provider: 'something else'
      }
    })
  )

  testErrorCondition(
    'missing Redir',
    addSig({
      query: {
        ...req.query,
        Redir: null
      }
    })
  )

  testErrorCondition('bad sig', {
    query: {
      ...req.query,
      Redir: null,
      sig: 'not-a-valid-sig'
    }
  })
})
