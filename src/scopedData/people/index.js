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
const update = (id, data) => {
  people[id] = { ...people[id], ...data }
  return people[id]
}

module.exports = {
  testyMcTestface,
  adminyMcAdminface,
  afcTest,
  find,
  all,
  update
}
