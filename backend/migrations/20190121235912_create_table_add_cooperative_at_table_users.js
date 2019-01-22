
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', table => {
        table.integer('coop_id').references('id')
            .inTable('cooperatives').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('users', table => {
        table.dropColumn('coop_id')
    })
};
