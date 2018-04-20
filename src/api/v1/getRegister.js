const { ERRORS } = require('../../utils/constants')
const sigMaker = require('../../utils/sigMaker')

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
  <h1>Sign up</h1>
  <p>Please enter your name and email address.</p>
  <form action="/handleRegister" method="post">
    ${labelledField('firstname', 'First Name', values.firstname)}
    ${labelledField('lastname', 'Last Name', values.lastname)}
    ${labelledField('email', 'Email', values.email)}
    ${labelledField('companyname', 'Company Name', values.companyname)}
    ${labelledField(
      'companyregisteredname',
      'Regsitered Company Name',
      values.companyregisteredname
    )}
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
    <button type="submit">Register</button>
  </form>
</body>
</html>
`

/*
  Provider=AFC&[various]=[fields]&Redir=[redirect_uri]&sig=[md5hash]
*/
const getRegister = (req, res) => {
  const { sig, ...allFields } = req.query
  const { Provider: provider, Redir: redirectUri, ...fields } = allFields

  if (provider !== 'AFC' || !redirectUri || sig !== sigMaker(allFields)) {
    res.status(400).json({ error: ERRORS.INVALID_REQUEST })
  } else {
    res.send(makeResponse(redirectUri, fields))
  }
}

module.exports = getRegister
