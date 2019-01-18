
exports.up = function(knex, Promise) {
    return knex.schema.createTable('departments', table => {
        table.increments('id').primary()
        table.string('name').notNull().unique()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('departments')
};
