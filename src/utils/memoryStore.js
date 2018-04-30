const memoryStore = {}

const clear = key => {
  delete memoryStore[key]
}

const get = key => memoryStore[key]

const set = (key, value) => {
  memoryStore[key] = value
}

module.exports = {
  clear,
  get,
  set
}
