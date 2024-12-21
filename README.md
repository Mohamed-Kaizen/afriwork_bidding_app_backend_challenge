> ## 🛠 Status: In Development
>
> Afriwork Bidding is currently in development. So we encourage you to use it and give us your feedback, but there are things that haven't been finalized yet and you can expect some changes.
>
> See the list of Known Issues and TODOs, below, for updates.

## Overview

A bidding app backend challenge for Afriwork.

## Preqrequisites

- [Node.js (v2.0.0 or higher)]
- [Pnpm (v9.15 or higher)]

## Getting Started

### Installation

1. Clone the repo

    ```sh
    git clone https://github.com/Mohamed-Kaizen/afriwork_bidding_app_backend_challenge.git
    ```

2. Install the requirements
    ```sh
    pnpm install
    ```

### Setup Environment Variables

Just run `env.ts` file to create a `.env` file with the default environment variables.

```sh
pnpm tsx env.ts
```

Now you can edit the `.env` file to set your own environment variables.

### Setup Database

#### SQLite

The default database is SQLite. So you don't need to do edit anything. Just run the following command to create the database file.

```sh
pnpm migrate
```

#### PostgreSQL

To use Postgres, first go to [Neon] and create a new database (Or you can use your own postgres database). Then edit the `.env` file and set the `DATABASE_URL` environment variable to your Postgres database URL. Plus go to `prisma/schema.prisma` and set the `provider` to `postgresql`

````sh
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
````

Now you can run the following command to create the database tables:

```sh
pnpm migrate
```

#### Seed Database

The first time you run the command `migrate`, you will notice that it will prompt you to create migration name:

![2024-12-21_07-31](https://github.com/user-attachments/assets/9f31c7d9-afea-4110-8583-f301c4c4d814)


Now you can add seed data to the database by running the following command:

```sh
pnpm seed
````

You can check everything is working fine by running the following command:

```sh
pnpm studio
```


### Run the server

```sh
pnpm dev
```

enjoy 🎉


## Architecture

### Project Structure

```
.
├── other
│   ├── hoppscotch.json
│   ├── requirements.pdf
│   └── uml.dbml
├── prisma
│   └── schema.prisma
├── src
│   ├── controllers
│   │   ├── auth.ts
│   │   ├── bid.ts
│   │   ├── listing.ts
│   │   └── notification.ts
│   ├── routes
│   │   ├── auth.ts
│   │   ├── bid.ts
│   │   ├── listing.ts
│   │   └── notification.ts
│   ├── services
│   │   ├── auth.ts
│   │   ├── bid.ts
│   │   ├── listing.ts
│   │   └── notification.ts
│   ├── utils
│   |   ├── auth.ts
│   |   ├── db.ts
│   |   ├── hash.ts
│   |   ├── jwt.ts
│   |   ├── types.ts
│   |   └── validators.ts
│   ├── server.ts
|   └── socket.ts
├── package.json
├── pnpm-lock.yaml
├── README.md
├── seed.ts
├── env.ts
├── nodemon.json
└── tsconfig.json
``` 

### Database Schema

[Check the online Docs for the database schema]

### Environment Variables

- `PORT`: The port the server should run on. Default is `8000`.
- `HOST`: The host the server should run on. Default is `localhost`.
- `SECRET_KEY`: The secret key for JWT.
- `DATABASE_URL`: The database URL. Default is `sqlite:./dev.db`.
- `JWT_EXPIRES_IN`: The expiration time for JWT. Default is `10d` (10 days).


### Tools and Libraries Used

- Node Packages:

    * [Hapi] - Our server framework.
    * [hapi-auth-jwt2] - JWT authentication plugin for hapi.
    * [hapi-swagger] - Swagger documentation plugin for hapi.
    * [@hapi/inert] - Static file and directory handlers for hapi.
    * [@hapi/vision] - Templates rendering support for hapi.
    * [Prisma](https://prisma.io) - Database ORM.
    * [@prisma/client] - Prisma client for database queries.
    * [dotenv] - Environment variables loader.
    * [jsonwebtoken] - JWT library.
    * [socket.io] - Real-time updates library.
    * [arktype] - A Validation library.
    * [@node-rs/argon2] - Argon2 hashing library.
    * [nodemon] - Development server.
    * [prettier] - Code formatter.
    * [tsx] - TypeScript compiler.

- [Hoppscotch] - API testing tool.
- [dbdiagram] - Database diagram tool.


# License: MIT

# TODOs

## Setup and Configuration

- [x] Initialize backend project
- [x] Set up Database
    - [x] Design Database Schema
    - [x] Create Database Models
    - [x] Create The Seeder script
- [ ] Set up Docker and Reverse Proxy

## Authentication and Authorization

- [x] Implement JWT Authentication
- [x] Implement User Registration and Login

## API Development

### Listing bids

- [x] Create endpoints for:
    - [x] Listing all bids (filter by status).
        - [x] Listing bids by user(owner).
        - [x] show total bids on the listing page
    - [x] Viewing a single bid.
    - [x] Creating a new bid.
    - [x] Updating a bid (by owner).
    - [x] Closing a bid (by owner).

### Bidding

- [x] Create endpoints for:
    - [x] Placing a bid on a listing.
    - [x] Updating a bid (by bidder).
- [x] Implement logic to:
    - [x] It should check if the amount is greater than the current bid and starting amount, if not return an error message.
    - [x] It should check if the bid is closed, if it is return an error message.
    - [x] It should check if the bid is owned by the bidder, if it is return an error message.

### Notifications

- [ ] Implement notifications for:
    - [ ] New bids on a listing, to the owner and bidders except the bidder who placed the bid.
    - [ ] Bid updates, to the owner and bidders except the bidder who placed the bid.
    - [ ] Bid closing, to the bidder who placed the bid.

### Real-time Updates

- [ ] Figure out how to connect it to hapi and how to connect it to tools like hoppscotch
- [ ] Implement real-time updates for:
    - [ ] New bids on a listing.
    - [ ] Bid updates.
    - [ ] Bid closing.

## Testing

- [ ] Write unit tests for:
    - [ ] write unit tests for the most simple function like "hello()" upto the biggest one
    - [ ] write test that check every use case of the business logic and edge cases

## Security

- [x] Test on common security vulnerabilities
- [x] Test any business logic security vulnerabilities

## Documentation

- [x] API endpoints (try using Swagger or any other API documentation tool).
- [x] Database Schema.
- [x] Project Structure.
- [x] Environment Variables.
- [x] Usage.
- [ ] Deployment Process.
- [x] Tools and Libraries Used.

[Pnpm (v9.15 or higher)]: https://pnpm.io/installation
[Node.js (v2.0.0 or higher)]: https://nodejs.org/en/download/package-manager
[Neon]: https://neon.tech
[Check the online Docs for the database schema]: https://dbdocs.io/Mohamed-Kaizen/Bidding-for-Afriwork
[Hapi]: https://hapi.dev
[hapi-auth-jwt2]: https://www.npmjs.com/package/hapi-auth-jwt2
[hapi-swagger]: https://www.npmjs.com/package/hapi-swagger
[@hapi/inert]: https://www.npmjs.com/package/@hapi/inert
[@hapi/vision]: https://www.npmjs.com/package/@hapi/vision
[Prisma]: https://prisma.io
[@prisma/client]: https://www.npmjs.com/package/@prisma/client
[dotenv]: https://www.npmjs.com/package/dotenv
[jsonwebtoken]: https://www.npmjs.com/package/jsonwebtoken
[socket.io]: https://socket.io
[arktype]: https://arktype.io/
[@node-rs/argon2]: https://www.npmjs.com/package/@node-rs/argon2
[nodemon]: https://www.npmjs.com/package/nodemon
[prettier]: https://www.npmjs.com/package/prettier
[tsx]: https://www.npmjs.com/package/tsx
[Hoppscotch]: https://hoppscotch.io/
[dbdiagram]: https://dbdiagram.io/home