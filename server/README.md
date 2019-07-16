# Emaily Server

This is the Server part of Emaily App.

## Installation

First: Create an .env file inside server directory with the following environment variables

- PORT
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- DB_URL
- COOKIE_KEY
- STRIPE_PUBLISHABLE_KEY
- STRIPE_SECRET_KEY
- SENDGRID_API_KEY
- REDIRECT_URL

Example:

```
PORT=5000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
DB_URL=mongodb://localhost:27017/emaily-dev
COOKIE_KEY=asjkdhasdnasiudbhasijdniasbhdiashdhs
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
SENDGRID_API_KEY=
REDIRECT_URL=http://localhost:3000
```

Second: Install required packages and run

```
$ cd server
$ yarn
$ yarn dev
```
