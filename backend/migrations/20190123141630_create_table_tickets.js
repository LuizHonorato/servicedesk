
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tickets', table => {
        table.increments('id').primary()
        table.increments('number').notNull()
        table.integer('status_id').references('id').inTable('status').notNull()
        table.integer('type_id').references('id').inTable('types').notNull()
        table.integer('problem_id').references('id').inTable('problems').notNull()
        table.string('description').notNull()
        table.integer('subject_id').references('id').inTable('subjects').notNull()
        table.integer('class_id').references('id').inTable('classes').notNull()
        table.integer('item_id').references('id').inTable('items').notNull()
        table.timestamp('opening_date').notNull()
        table.integer('requester_user_id').references('id').inTable('users').notNull()
        table.integer('operator_user_id').references('id').inTable('users')
        table.string('evidence')
        table.integer('solution_id').references('id').inTable('solutions')
    })
};

exports.down = function(knex, Promise) {
  
};
