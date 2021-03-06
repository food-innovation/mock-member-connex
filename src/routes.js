/* eslint-disable camelcase */
const {
  getPing,
  getVersions,
  v1_postLogin,
  v1_postLogout,
  v1_getLogin,
  v1_postHandleLogin,
  v1_getOAuthLogin,
  v1_getRegister,
  v1_postHandleRegister,
  v2_companies_getCompanies,
  v2_companies_getCompany,
  v2_companies_putCompany,
  v2_people_getPeople,
  v2_people_getPerson,
  v2_people_putPerson,
  v2_events_getEvents,
  v2_events_getEvent,
  v2_events_getImages
} = require('./api')

module.exports = {
  get: {
    '/': getVersions,
    '/ping': getPing,
    '/Login': v1_getLogin,
    '/OAuthLogin': v1_getOAuthLogin,
    '/Register': v1_getRegister,
    '/API/2.0/Company': v2_companies_getCompanies,
    '/API/2.0/Company/:id': v2_companies_getCompany,
    '/API/2.0/Person': v2_people_getPeople,
    '/API/2.0/Person/:id': v2_people_getPerson,
    '/API/2.0/Event': v2_events_getEvents,
    '/API/2.0/Event/:id': v2_events_getEvent,
    '/API/2.0/Event/:id/Image': v2_events_getImages
  },
  post: {
    '/Login': v1_postLogin,
    '/Logout': v1_postLogout,
    '/handleLogin': v1_postHandleLogin,
    '/handleRegister': v1_postHandleRegister
  },
  put: {
    '/API/2.0/Company/:id': v2_companies_putCompany,
    '/API/2.0/Person/:id': v2_people_putPerson
  }
}
