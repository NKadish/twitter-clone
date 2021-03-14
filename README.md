## Setup

    npm install

## Create db

    > sudo service postgresql start
    > psql
    > CREATE DATABASE <DB_NAME>

## Created .env

    > touch .env

Paste & fill this:

    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=<...>
    DB_USER=<...>
    DB_PASS=<...>

    JWT_SECRET = "..."
    SALT_ROUNDS = 10

## Migrations & Seeds / Rollback

    > npm run db:reset

## Launch server

    > npm start

# Routes

Use Postman to send JSON to the routes

## `/users`

- `/register` POST {"username": "x", "password": "x"}
- `/loging` POST {"username": "x", "password": "x"}
- `/:username` GET

## `/tweets`

- GET 
- POST {"content": "x"}
- `/:tweetId` GET
- `/:tweetId` POST {"content": "x"} 
- `/:tweetId` DELETE


## `/chat`

- `/:username` GET
- `/:username` POST {"content": "x"}

# Testing

## Jest

Jest is used to test the endpoints  

    > npm test
