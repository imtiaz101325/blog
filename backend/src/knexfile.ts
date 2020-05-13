const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), "../.env") });

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_CONNECTION_STRING,
    debug: !!process.env.ENABLE_KNEX_QUERY_DEBUGGING,
    migrations: {
      tableName: "knex_migrations",
    },
  },
  staging: {
    client: "pg",
    connection: process.env.DATABASE_CONNECTION_STRING,
    debug: !!process.env.ENABLE_KNEX_QUERY_DEBUGGING,
    migrations: {
      tableName: "knex_migrations",
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_CONNECTION_STRING,
    debug: !!process.env.ENABLE_KNEX_QUERY_DEBUGGING,
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
