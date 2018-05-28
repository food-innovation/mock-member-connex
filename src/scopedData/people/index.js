const testyMcTestface = require('./testyMcTestface')
const adminyMcAdminface = require('./adminyMcAdminface')
const afcTest = require('./afcTest')

const people = [testyMcTestface, adminyMcAdminface, afcTest].reduce(
  (acc, elem) => {
    acc[elem.id] = elem
    return acc
  },
  {}
)

const find = id => people[id]
const all = () => Object.values(people)

module.exports = {
  testyMcTestface,
  adminyMcAdminface,
  afcTest,
  find,
  all
}
