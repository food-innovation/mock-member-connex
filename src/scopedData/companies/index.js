const testyCorp = require('./testyCorp')
const fialTest = require('./fialTest')

const companies = [testyCorp, fialTest].reduce((acc, elem) => {
  acc[elem.id] = elem
  return acc
}, {})

const find = id => companies[id]
const all = () => Object.values(companies)
const update = (id, data) => {
  companies[id] = { ...companies[id], ...data }
  return companies[id]
}

module.exports = {
  testyCorp,
  fialTest,
  find,
  all,
  update
}
