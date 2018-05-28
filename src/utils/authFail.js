const authFail = req => {
  const bearer = (req.get('Authorization') || 'Bearer ').slice(7)
  if (bearer === '')
    return {
      code: 234200,
      message: 'Invalid Authorization Token.'
    }
  return false
}

module.exports = authFail
