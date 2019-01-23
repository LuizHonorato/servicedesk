
exports.up = function(knex, Promise) {
    return knex.schema.createTable('items', table => {
        table.increments('id').primary()
        table.string('name').notNull().unique()
        table.integer('classe_id').references('id')
            .inTable('classes').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('items')
};
