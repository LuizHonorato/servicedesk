
exports.up = function(knex, Promise) {
    return knex.schema.createTable('solutions', table => {
        table.increments('id').primary()
        table.string('description', 1000).notNull()
        table.boolean('is_util')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('solutions')
};
