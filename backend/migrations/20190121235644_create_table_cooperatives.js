
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cooperatives', table => {
        table.increments('id').primary()
        table.string('coop_number').notNull().unique()
        table.string('name').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cooperatives')
};
