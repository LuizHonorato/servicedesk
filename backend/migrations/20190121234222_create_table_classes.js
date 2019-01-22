
exports.up = function(knex, Promise) {
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary()
        table.string('name').notNull().unique()
        table.integer('subject_id').references('id')
            .inTable('subjects').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('classes')
};
