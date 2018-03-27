const memoryStore = {}

const get = key => memoryStore[key]

const set = (key, value) => {
  memoryStore[key] = value
}

module.exports = {
  get,
  set
}
