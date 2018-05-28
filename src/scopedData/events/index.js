const testEvent = require('./testEvent')
const testPaidEvent = require('./testPaidEvent')

const events = [testPaidEvent, testEvent].reduce((acc, elem) => {
  acc[elem.id] = elem
  return acc
}, {})

const find = id => events[id]
const all = () => Object.values(events)

module.exports = {
  testEvent,
  testPaidEvent,
  find,
  all
}
