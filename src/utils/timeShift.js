const toDate = timestamp => new Date(timestamp).toISOString().split('T')[0]
const MS_IN_A_DAY = 24 * 60 * 60 * 1000

const timeShift = event => {
  const { datestart, dateend } = event
  let start = Date.parse(datestart)
  let end = Date.parse(dateend)
  const today = new Date().getTime()
  if (end < today) {
    const advance = today - end + 2 * MS_IN_A_DAY
    start += advance
    end += advance
  }
  return {
    ...event,
    datestart: toDate(start),
    dateend: toDate(end)
  }
}

module.exports = timeShift
