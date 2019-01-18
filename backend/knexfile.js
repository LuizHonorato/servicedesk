// Update with your config settings.

module.exports = {
    client: 'postgresql',
    connection: {
      database: 'servicedesk',
      user:     'postgres',
      password: 'bl@ck2018'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }

};
