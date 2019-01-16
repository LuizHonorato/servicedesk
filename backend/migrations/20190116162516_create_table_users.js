
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('first_name').notNull()
        table.string('last_name').notNull()
        table.string('department').notNull()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.enu('user_type', ['USUÁRIO', 'ATENDENTE', 'ADMINISTRADOR']).defaultTo('USUÁRIO')
        table.date('deleted_at')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};
