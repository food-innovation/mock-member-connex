# mock-member-connex

[![Greenkeeper badge](https://badges.greenkeeper.io/food-innovation/mock-member-connex.svg)](https://greenkeeper.io/)

A mock server that mimics functions from [CyberGlue](http://cyberglue.com)'s [MemberConnex](https://www.memberconnex.com) system, as needed by Fial.

Use this for local development when you don't have, or want, access to the real MemberConnex system.

* `develop` — [![CircleCI](https://circleci.com/gh/food-innovation/mock-member-connex/tree/develop.svg?style=svg)](https://circleci.com/gh/food-innovation/mock-member-connex/tree/develop) [![codecov](https://codecov.io/gh/food-innovation/mock-member-connex/branch/develop/graph/badge.svg)](https://codecov.io/gh/food-innovation/mock-member-connex)
* `master` — [![CircleCI](https://circleci.com/gh/food-innovation/mock-member-connex/tree/master.svg?style=svg)](https://circleci.com/gh/food-innovation/mock-member-connex/tree/master) [![codecov](https://codecov.io/gh/food-innovation/mock-member-connex/branch/master/graph/badge.svg)](https://codecov.io/gh/food-innovation/mock-member-connex)

## Known limitations

The mock server returns the very bare happy-path responses for the MemberConnex system, allowing you to develop your code that relies on MemberConnex without actually having access to it.

1. The mock server does no checking of usernames or passwords.
2. You can only set a single `CLIENT_ID` and `CLIENT_SECRET`.
3. The mock server does not currently care what code you send it, and will always return the same `access_token` value.
4. The `access_token` value returned is not a proper JWT, it's just a string.
5. We don't look for any bearer tokens for the API requests.

## Use

Use of this mock server assumes that you have copes of

* `Introduction to OAuth2 with MemberConnex.pdf`,
* `Intro to MCX API for FIAL - AFC.pdf`

both of which are available from CyberGlue.

### Environment Variables

You may set the following environment variables.

* `PORT` — defaults to `9000`
* `CLIENT_ID` — defaults to `'testing'`
* `CLIENT_SECRET` — defaults to `'testing'`
* `MEMBER_CONNEX_SALT` — defaults to `12345678`

### Start the server

Run `npm start`

### From within `docker-compose.yml`

The `mock-member-connex` has been published as a docker image so you can just add it to your platform's `docker-compose.yml` file and customise the various environment variables there.

I put it up in my personal docker account for now.  It might move.

    version: "3"
    services:
      mmc:
        image: davesag/mock-member-connex
        ports:
          - 9001:9001
        healthcheck:
          test: "exit 0"
        environment:
          PORT: 9001
          CLIENT_ID: 'some custom id'
          CLIENT_SECRET: 'my special secret'
        command: ['npm', 'start']

## API Routes

### `GET /ping` (not implemented by MemberConnex but useful)

Returns a heartbeat response.

    200 Okay

    {
      "response": "okay",
      "uptime": secondsSinceServerLaunch
    }

### `GET /` (not implemented by MemberConnex but useful)

Returns a list of API versions.

    200 Okay

    [
      {
        version: "1.1.2",
        path: '/api/1'
      },
      {
        version: "2",
        path: '/API/2.0'
      }
    ]

### `GET /oAuthLogin`

Returns

    200 Okay and an HTML form with a username and password field which imitates
    the basic function of the MemberConnex login form, minus the 'allow' option.

Error Responses

    400 Unauthorised

    {
      error: 'Invalid Request'
    }

### `POST /Login`

Simulates the Token Exchange.

    200 Okay

    {
      access_token: 'some access token'
    }

Error Response

    400 Unauthorised

    {
      error: 'Invalid Request'
    }

### `GET /Login`

Simulates Member Info data retrieval.

Returns

    200 Okay

    {
      ... a bunch of data
    }

Error Response

    400 Unauthorised

    {
      error: 'Invalid Request'
    }

### `GET /Register?[fields as per below]`

Simulates the display of the registration screen.

Returns

    200 Okay and an HTML form with a username and password field which imitates
    the basic function of the MemberConnex register form.  The data provided is
    neither checked nor used.

Params: You must provide the following

* `Provider=AFC`
* `Redir` (some valid uri to redirect to)
* `sig` An MD5 hash of all of the the supplied fields excluding this sig, as outlined by the nice people at CyberGlue

You can also provide the following field names

* `firstname`
* `lastname`
* `email`
* `usertype`
* `stakeholdertype`
* `companyname`
* `companyregisteredname`

### `POST /handleRegister`

redirects to the provided `Redir` uri.

### `POST /Logout`

Logs the user out

Params as Form URL encoded

    Person_id=The member's id
    hash=an HMAC 256 hash derived from the Person_id and APP Secret

Returns

    {
      "success": <true|false>
    }

Error Response

    400 Unauthorised

    {
      error: 'Invalid Request'
    }

### `GET /API/2.0/Company`

Gets a list of the companies known to MemberConnex.

Headers

    Authorization: Bearer <token>

URL Params

    Action=List
    DataFilter=2

Note these params do not seem to do anything.

Returns

    200 Okay

    [
      {
        "id": 12265,
        "abn": "123456789",
        "abstract": "",
        "doacquistion": "2018-01-31",
        "domembership": "1901-01-01",
        "externalid": "",
        "idaccount": 12345,
        "idcompanyparent": 0,
        "idlocationbilling": 54321,
        "idlocationprimary": 54321,
        "idprofile": 12265,
        "keyperson": 0,
        "mail": "support@testycorp.tes",
        "mailoptin": false,
        "membershipcode1": "",
        "membershipcode2": "",
        "membershipcode3": "",
        "name": "TestyCorp Pty Ltd",
        "namefulllegal": "",
        "nzcompanynumber": "",
        "telfree": "",
        "telhome": "",
        "text": "",
        "website": "https://www.testycorp.tes/"
      },
      ...
    ]

Errors

    401 Unauthorized

    {
      "code": 234199,
      "message": "Invalid Authorization Token."
    }

### `GET /API/2.0/Company/:id`

Gets the data for a MemberConnex company with the given id.

Accepted Company ids are `123`, `12265`

Headers

    Authorization: Bearer <token>

Returns

    200 Okay

    {
      "id": 12265,
      "abn": "123456789",
      "abstract": "",
      "doacquistion": "2018-01-31",
      "domembership": "1901-01-01",
      "externalid": "",
      "idaccount": 12345,
      "idcompanyparent": 0,
      "idlocationbilling": 54321,
      "idlocationprimary": 54321,
      "idprofile": 12265,
      "keyperson": 0,
      "mail": "support@testycorp.tes",
      "mailoptin": false,
      "membershipcode1": "",
      "membershipcode2": "",
      "membershipcode3": "",
      "name": "TestyCorp Pty Ltd",
      "namefulllegal": "",
      "nzcompanynumber": "",
      "telfree": "",
      "telhome": "",
      "text": "",
      "website": "https://www.testycorp.tes/"
    }

Errors

    401 Unauthorized

    {
      "code": 234199,
      "message": "Invalid Authorization Token."
    }

### `PUT /API/2.0/Company/:id`

Updates some of the data for a MemberConnex company with the given id.

Accepted Company ids are `123`, `12265`

Headers

    Authorization: Bearer <token>
    Content-Type: application/json

Body Param

Any of the fields below can be updated.

    {
      "abn": "123456789",
      "abstract": "",
      "mail": "support@testycorp.tes",
      "mailoptin": false,
      "name": "TestyCorp Pty Ltd",
      "namefulllegal": "",
      "telfree": "",
      "telhome": "",
      "text": "",
      "website": "https://www.testycorp.tes/"
    }


Returns the following structure with the updated data.

    200 Okay

    {
      "id": 12265,
      "abn": "123456789",
      "abstract": "",
      "doacquistion": "2018-01-31",
      "domembership": "1901-01-01",
      "externalid": "",
      "idaccount": 12345,
      "idcompanyparent": 0,
      "idlocationbilling": 54321,
      "idlocationprimary": 54321,
      "idprofile": 12265,
      "keyperson": 0,
      "mail": "support@testycorp.tes",
      "mailoptin": false,
      "membershipcode1": "",
      "membershipcode2": "",
      "membershipcode3": "",
      "name": "TestyCorp Pty Ltd",
      "namefulllegal": "",
      "nzcompanynumber": "",
      "telfree": "",
      "telhome": "",
      "text": "",
      "website": "https://www.testycorp.tes/"
    }

Errors

    401 Unauthorized

    {
      "code": 234199,
      "message": "Invalid Authorization Token."
    }


### `GET /API/2.0/Person`

Gets a list of the users known to MemberConnex.

Headers

    Authorization: Bearer <token>

URL Params

    Action=List
    DataFilter=1

Note these params do not seem to do anything.

Returns

    200 Okay

    [
      {
        "id": 13616,
        "firstname": "Testy",
        "lastname": "McTestface",
        "fullname": "Testy McTestface",
        "about": "",
        "doacquistion": "2018-05-14",
        "dob": "1996-02-29",
        "domembership": "1901-01-01",
        "externalid": "",
        "gender": "Male",
        "idaccountpriv": 24687,
        "idaddress": 52324,
        "idaddressdel": 0,
        "initials": "",
        "jobtitle": "",
        "mail": "testy.mctestface@test.tes",
        "mailbounces": 0,
        "mailoptin": true,
        "mailsecondary": "",
        "membershipcode1": "",
        "membershipcode2": "",
        "membershipcode3": "",
        "middlenames": "",
        "postnominal": "",
        "preferredname": "",
        "qualifications": "",
        "skype": "",
        "telbus": "",
        "telddi": "",
        "telfax": "",
        "telhome": "",
        "telmobile": "",
        "title": "",
        "usertype": ""
      },
      ...
    ]

Errors

    401 Unauthorized

    {
      "code": 234199,
      "message": "Invalid Authorization Token."
    }

### `GET /API/2.0/Person/:id`

Gets the data for a MemberConnex user with the given id.

Accepted Person ids are `13616`, `13668`, and `8487645`

Headers

    Authorization: Bearer <token>

Returns

    200 Okay

    {
      "id": 13616,
      "firstname": "Testy",
      "lastname": "McTestface",
      "fullname": "Testy McTestface",
      "about": "",
      "doacquistion": "2018-05-14",
      "dob": "1996-02-29",
      "domembership": "1901-01-01",
      "externalid": "",
      "gender": "Male",
      "idaccountpriv": 24687,
      "idaddress": 52324,
      "idaddressdel": 0,
      "initials": "",
      "jobtitle": "",
      "mail": "testy.mctestface@test.tes",
      "mailbounces": 0,
      "mailoptin": true,
      "mailsecondary": "",
      "membershipcode1": "",
      "membershipcode2": "",
      "membershipcode3": "",
      "middlenames": "",
      "postnominal": "",
      "preferredname": "",
      "qualifications": "",
      "skype": "",
      "telbus": "",
      "telddi": "",
      "telfax": "",
      "telhome": "",
      "telmobile": "",
      "title": "",
      "usertype": ""
    }

Errors

    401 Unauthorized

    {
      "code": 234199,
      "message": "Invalid Authorization Token."
    }

### `PUT /API/2.0/Person/:id`

Updates some of the data for a MemberConnex user with the given id.

Accepted Person ids are `13616`, `13668`, and `8487645`

Headers

    Authorization: Bearer <token>
    Content-Type: application/json

Body Param

Any of the fields below can be updated.

    {
      "firstname": "Testy",
      "lastname": "McTestface",
      "fullname": "Testy McTestface",
      "about": "",
      "dob": "1996-02-29",
      "gender": "Male",
      "initials": "",
      "jobtitle": "",
      "mail": "testy.mctestface@test.tes",
      "mailoptin": true,
      "mailsecondary": "",
      "middlenames": "",
      "postnominal": "",
      "preferredname": "",
      "qualifications": "",
      "skype": "",
      "telbus": "",
      "telddi": "",
      "telfax": "",
      "telhome": "",
      "telmobile": "",
      "title": ""
    }

Returns the updated user data

    200 Okay

    {
      "id": 13616,
      "firstname": "Testy",
      "lastname": "McTestface",
      "fullname": "Testy McTestface",
      "about": "",
      "doacquistion": "2018-05-14",
      "dob": "1996-02-29",
      "domembership": "1901-01-01",
      "externalid": "",
      "gender": "Male",
      "idaccountpriv": 24687,
      "idaddress": 52324,
      "idaddressdel": 0,
      "initials": "",
      "jobtitle": "",
      "mail": "testy.mctestface@test.tes",
      "mailbounces": 0,
      "mailoptin": true,
      "mailsecondary": "",
      "membershipcode1": "",
      "membershipcode2": "",
      "membershipcode3": "",
      "middlenames": "",
      "postnominal": "",
      "preferredname": "",
      "qualifications": "",
      "skype": "",
      "telbus": "",
      "telddi": "",
      "telfax": "",
      "telhome": "",
      "telmobile": "",
      "title": "",
      "usertype": ""
    }

Errors

    401 Unauthorized

    {
      "code": 234199,
      "message": "Invalid Authorization Token."
    }

### `GET /API/2.0/Event`

Gets a list of the events known to MemberConnex.

Headers

    Authorization: Bearer <token>

Returns

    200 Okay

    [
      {
        "id": 85,
        "name": "Amazing Test Event",
        "city": "Sydney",
        "region": "NSW",
        "datestart": "2018-11-15",
        "timestart": "09:00:00",
        "dateend": "2018-11-15",
        "timeend": "17:00:00",
        "abstract": "<p>The Amazing Test Event serves as the meeting place for companies in industries.<\/p> ",
        "location": "TBC",
        "locationtype": "Physical",
        "text": "<h2>About the Event<\/h2> <p>Amazing Test Event serves as the meeting place for companies in industries.<\/p> <p>In collaboration with the Department of Testy McTestface and the Australian Government\u2019s Industry Growth Centres, the Event attracts businesses across Australia\u2019s industry sectors.<\/p>",
        "accessrestrictions": "",
        "availtickets": 0,
        "duration": "",
        "externalid": "",
        "freeevent": true,
        "idsession": 0,
        "maxtickets": 0,
        "previewvideoembedcode": "",
        "type": "",
        "venue": "",
        "videoembedcode": "",
        "videoinstructions": "",
        "webinarurl": ""
      },
      ...
    ]

Errors

    401 Unauthorized

    {
      "code": 234199,
      "message": "Invalid Authorization Token."
    }

### `GET /API/2.0/Event/:id`

Gets the data for a MemberConnex event with the given id.

Headers

    Authorization: Bearer <token>

Returns

    200 Okay

    {
      "id": 85,
      "name": "Amazing Test Event",
      "city": "Sydney",
      "region": "NSW",
      "datestart": "2018-11-15",
      "timestart": "09:00:00",
      "dateend": "2018-11-15",
      "timeend": "17:00:00",
      "abstract": "<p>The Amazing Test Event serves as the meeting place for companies in industries.<\/p> ",
      "location": "TBC",
      "locationtype": "Physical",
      "text": "<h2>About the Event<\/h2> <p>Amazing Test Event serves as the meeting place for companies in industries.<\/p> <p>In collaboration with the Department of Testy McTestface and the Australian Government\u2019s Industry Growth Centres, the Event attracts businesses across Australia\u2019s industry sectors.<\/p>",
      "accessrestrictions": "",
      "availtickets": 0,
      "duration": "",
      "externalid": "",
      "freeevent": true,
      "idsession": 0,
      "maxtickets": 0,
      "previewvideoembedcode": "",
      "type": "",
      "venue": "",
      "videoembedcode": "",
      "videoinstructions": "",
      "webinarurl": ""
      "usertype": ""
    }

Errors

    401 Unauthorized

    {
      "code": 234199,
      "message": "Invalid Authorization Token."
    }

### `GET /API/2.0/Event/:id/Image`

Gets the image data for a MemberConnex event with the given id.

Headers

    Authorization: Bearer <token>

Returns

    200 Okay

    [
      {
        "imagetype": "image/png",
        "size": 2336499,
        "name": "some file name sometimes with spaces in it.png",
        "areaofuse": "<Content|Landscape|Abstract>",
        "externalid": "",
        "caption": "",
        "id": 1460
      },
      ...
    ]

Errors

    401 Unauthorized

    {
      "code": 234253,
      "message": "Invalid Authorization Token."
    }

## Development

### Prerequisites

* [NodeJS](htps://nodejs.org), version 10+ (I use [`nvm`](https://github.com/creationix/nvm) to manage Node versions — `brew install nvm`.)
* [Docker](https://www.docker.com) (Use [Docker for Mac](https://docs.docker.com/docker-for-mac/), not the homebrew version)

### Initialisation

    npm install

### To Start the server

Then run `npm start` to start the api server on port `9000`

### Test it

* `npm test` — runs the unit tests (quick)
* `npm run test:server` — runs the API endpoint tests (not so quick)

### Lint it

    npm run lint

## Contributing

Please see the [contributing notes](CONTRIBUTING.md).
