const bcrypt = require('bcrypt-nodejs')
const {adminPassword} = require('../.env')

const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('first_name').notNull()
        table.string('last_name').notNull()
        table.integer('department_id').references('id')
            .inTable('departments').notNull()
        table.integer('coop_id').references('id')
            .inTable('cooperatives').notNull()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.enu('user_type', ['CONSUMIDOR', 'OPERADOR', 'ADMINISTRADOR']).defaultTo('CONSUMIDOR')
        table.date('deleted_at')
    }).then(function () {
        return knex('users').insert([
            {
                first_name: 'Admin',
                last_name: 'Service Desk',
                department_id: 1,
                coop_id: 1,
                email: 'servicedesk@sicoobsp.coop.br',
                password: encryptPassword(adminPassword),
                user_type: 'ADMINISTRADOR'
            }
        ])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};
