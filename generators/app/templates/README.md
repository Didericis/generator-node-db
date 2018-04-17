Database migrations are managed through [db-migrate](https://db-migrate.readthedocs.io/en/latest/Getting%20Started/usage/), and the connection is set up using [knex](http://knexjs.org/).

At least one migration should be added before creating the database using `npm run db:migrate -- create ...`

```sh
npm run db:create             # creates the database
npm run db:create:test        # creates the database for integration tests
npm run db:down               # migrates the database down a migration
npm run db:reset              # recreates the database
npm run db:reset:test         # recreates the database for integration tests
npm run db:migrate            # run arbitrary commands with db-migrate
npm run db:up                 # migrates the database up to the most recent migration
npm run db:up:env             # migrates the database up and pays attention to env variables
npm run db:up:test            # migrates the database up and points to the test database
```
