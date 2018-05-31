const testEvent = require('./testEvent')
const testPaidEvent = require('./testPaidEvent')
const timeShift = require('src/utils/timeShift')

const events = [testPaidEvent, testEvent].reduce((acc, elem) => {
  acc[elem.id] = elem
  return acc
}, {})

const find = id => (events[id] ? timeShift(events[id]) : undefined)
const all = () => Object.values(events).map(timeShift)

module.exports = {
  testEvent,
  testPaidEvent,
  find,
  all
}
