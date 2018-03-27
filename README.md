# mock-member-connex

A mock server that mimics functions from [CyberGlue](http://cyberglue.com)'s [MemberConnex](https://www.memberconnex.com) oAuth2 system.

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

Use of this mock server assumes that you have a copy of `Introduction to OAuth2 with MemberConnex.pdf` which is available from CyberGlue.

### Environment Variables

You may set the following environment variables.

* `PORT` — defaults to `9000`
* `CLIENT_ID` — defaults to `'testing'`
* `CLIENT_SECRET` — defaults to `'testing'`

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
        version: 1,
        path: '/api/v1'
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

Implements the Token Exchange and Member Info data retreival depending on the supplied `Action` param.

When `Action = 'Token'` Returns

    200 Okay

    {
      access_token: 'some access token'
    }

When `Action = 'OAuthUserInfo'` Returns

    200 Okay

    {
      ... a bunch of data
    }

Error Response

    400 Unauthorised

    {
      error: 'Invalid Request'
    }

## Development

### Prerequisites

* [NodeJS](htps://nodejs.org), version 9.9.0 or better (I use [`nvm`](https://github.com/creationix/nvm) to manage Node versions — `brew install nvm`.)
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
