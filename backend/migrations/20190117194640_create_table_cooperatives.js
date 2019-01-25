
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cooperatives', table => {
        table.increments('id').primary()
        table.string('coop_number').notNull().unique()
        table.string('name').notNull()
    }).then(function () {
        return knex('cooperatives').insert([
            {
                coop_number: '1006',
                name: 'Sicoob São Paulo'
            }
        ])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cooperatives')
};
