const { ERRORS } = require('../../utils/constants')

const safeOption = (label, value) =>
  value !== undefined ? `${label}="${value}"` : ''

const labelledField = (name, label, value, type) => `
<label for="${name}">${label}</Label>
<input ${value === undefined ? '' : 'disabled'} ${safeOption(
  'type',
  type
)} ${safeOption('value', value)} id="${name}" name="${name}" />
<br/>`

const selectOptions = (options, selectedValue) =>
  options
    .map(({ value, text }) => {
      const selected = value === selectedValue ? 'selected' : ''
      return `<option ${safeOption(
        'value',
        value
      )} ${selected}>${text}</option>`
    })
    .join('\n')

const labelledSelect = (name, label, value, options) => `
<label for="${name}">${label}</Label>
<select ${value === undefined ? '' : 'disabled'} id="${name}" name="${name}">
  ${selectOptions(options, value)}
</select>
<br/>`

const makeResponse = (redirectUri, values) =>
  `<html><head><title>Mock MemberConnex Register</title></head>
<body>
  <form action="/handleRegister" method="post">
    ${labelledField('firstname', 'First Name', values.firstname)}
    ${labelledField('lastname', 'Last Name', values.lastname)}
    ${labelledField('email', 'Email', values.email)}
    ${labelledField('password', 'Password', undefined, 'password')}
    ${labelledField('password2', 'Re-Enter Password', undefined, 'password')}
    ${labelledSelect(
      'stakeholdertype',
      'Stakeholder Type',
      values.stakeholdertype,
      [
        { value: '', text: 'Please select an option' },
        { value: 'supplier-food', text: 'Food Supplier' },
        { value: 'buyer-food', text: 'Food Buyer' }
      ]
    )}
    ${labelledSelect('usertype', 'User Type', values.usertype, [
      { value: '', text: 'Please select an option' },
      { value: 'supplier', text: 'Supplier' },
      { value: 'buyer', text: 'Buyer' },
      { value: 'agency', text: 'Agency' }
    ])}
    <input name="redirectUri" type="hidden" value="${redirectUri}" />
    <button type="submit">Log in</button>
  </form>
</body>
</html>
`

/*
  Provider=AFC&varionsfields&redirect_uri=[redirect_uri]
*/
const getRegister = (req, res) => {
  const { Provider: provider, redirect_uri: redirectUri, ...fields } = req.query

  if (provider !== 'AFC' || !redirectUri) {
    res.status(400).json({ error: ERRORS.INVALID_REQUEST })
  } else {
    res.send(makeResponse(redirectUri, fields))
  }
}

module.exports = getRegister
