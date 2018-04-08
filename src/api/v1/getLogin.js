const { CLIENT_ID, CLIENT_SECRET } = require('../../utils/config')
const { ERRORS } = require('../../utils/constants')

/*
  https://[MCX Portal URL]/Login?Action=OAuthUserInfo&
    access_token=[some-token]
*/

const getLogin = (req, res) => {
  const { Action: action, access_token: token } = req.query

  if (action !== 'OAuthUserInfo') {
    res.status(400).json({ error: ERRORS.INVALID_REQUEST })
  } else {
    // return scoped user data
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
  }
}

module.exports = getLogin
