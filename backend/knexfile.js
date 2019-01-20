const {db} = require('./.env')

module.exports = {
    client: 'postgresql',
    connection: db,
    pool: {
      min: 2,
      max: 50
    },
    migrations: {
      tableName: 'knex_migrations'
    }

};
