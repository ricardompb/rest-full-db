// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

// const fs = require('node:fs')
// const path = require('node:path')
// const filename = path.join(__dirname, 'ca-certificate.crt')

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: '',
      database: '',
      user:     '',
      password: '',
      port: 25061,
      ssl: {
        rejectUnauthorized: false,
        // ca: fs.readFileSync(filename)
      },
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
