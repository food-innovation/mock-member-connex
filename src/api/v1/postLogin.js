const { CLIENT_ID, CLIENT_SECRET } = require('../../utils/config')
const { ERRORS } = require('../../utils/constants')

/*
  https://[MCX Portal URL]/Login?Action=Token&
    code=[authorisation_code]&
    redirect_uri=[redirect_uri]&
    client_id=[client_id]&
    client_secret=[client_secret]
*/

const postLogin = (req, res) => {
  const {
    Action: action,
    // code,
    // redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret
  } = req.query

  if (CLIENT_ID !== clientId || CLIENT_SECRET !== clientSecret) {
    res.status(400).json({ error: ERRORS.INVALID_REQUEST })
  } else if (action === 'Token') {
    res.json({
      access_token: 'some-awesome-jwt'
    })
  } else if (action === 'OAuthUserInfo') {
    // check for bearer token in Authorization header
    // return scoped user data
    // todo: add other scopes and check format
    res.json({
      firstname: 'Testy',
      lastname: 'McTestface',
      middlenames: '',
      fullname: 'Testy McTestface',
      membershipcode1: '',
      membershipcode2: '',
      membershipcode3: '',
      gender: 'NotSpecified',
      mail: 'testy.mctestface@test.tes',
      about: '',
      externalid: '',
      postnominal: '',
      preferredname: '',
      domembership: '1901-01-01',
      title: 'Ms',
      qualifications: '',
      skype: '',
      idaddressdel: 12,
      telfax: '09 292 9427',
      telddi: '09 466 3689',
      id: 9,
      mailbounces: 0,
      doacquistion: '2015-06-08',
      jobtitle: 'BA',
      initials: '',
      idaddress: 11,
      idaccountpriv: 12,
      telbus: '09 659 8414',
      telhome: '09 166 3180',
      dob: '2002-01-01',
      telmobile: '0274 814 2324',
      mailsecondary: '',
      mailoptin: true
    })
  } else {
    res.status(400).json({ error: ERRORS.INVALID_REQUEST })
  }
}

module.exports = postLogin
