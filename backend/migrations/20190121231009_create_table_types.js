
exports.up = function(knex, Promise) {
    return knex.schema.createTable('types', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.time('sla').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('types')
};
