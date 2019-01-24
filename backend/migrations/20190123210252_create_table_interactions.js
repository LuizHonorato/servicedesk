
exports.up = function(knex, Promise) {
    return knex.schema.createTable('interactions', table => {
        table.increments('id').primary()
        table.string('description').notNull()
        table.timestamp('date').notNull()
        table.integer('ticket_id').references('id')
            .inTable('tickets').notNull()
        table.integer('operator_user_id').references('id')
            .inTable('users').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('interactions')
};