
exports.up = function(knex, Promise) {
    return knex.schema.createTable('problems', table => {
        table.increments('id').primary()
        table.string('name').notNull().unique()
        table.integer('type_id').references('id')
            .inTable('types').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('problems')
};
