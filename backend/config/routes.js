const admin = require('./admin')

module.exports = app => {

    //ROTAS QUE NÃO NECESSITAM DE AUTENTICAÇÃO
    app.post('/signin', app.api.auth.signin)
    app.post('/signup', app.api.user.save)
    app.post('/validateToken', app.api.auth.validateToken)

    /* A PARTIR DAQUI TODAS AS ROTAS NECESSITAM DE AUTENTICAÇÃO, 
    E AS ROTAS QUE UTILIZAM O MIDDLEWARE ADMIN SÃO ACESSÍVEIS APENAS POR ADMINISTRADORES. */
    
    app.route('/cooperatives')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.cooperative.save))
        .get(app.api.cooperative.get)

    app.route('/cooperatives/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.cooperative.save))
        .get(app.api.cooperative.getById)
        .delete(admin(app.api.cooperative.remove))

    app.route('/departments')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.department.save))
        .get(app.api.department.get)

    app.route('/departments/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.department.save))
        .get(app.api.department.getById)
        .delete(admin(app.api.department.remove))

    app.route('/types')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.type.save))
        .get(app.api.type.get)

    app.route('/types/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.type.save))
        .get(app.api.type.getById)
        .delete(admin(app.api.type.remove))

    app.route('/problems')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.problem.save))
        .get(app.api.problem.get)

    app.route('/problems/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.problem.save))
        .get(app.api.problem.getById)
        .delete(admin(app.api.problem.remove))

    app.route('/status')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.status.save))
        .get(app.api.status.get)

    app.route('/status/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.status.save))
        .get(app.api.status.getById)
        .delete(admin(app.api.status.remove))

    app.route('/subjects')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.subject.save))
        .get(app.api.subject.get)

    app.route('/subjects/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.subject.save))
        .get(app.api.subject.getById)
        .delete(admin(app.api.subject.remove))

    app.route('/classes')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.class.save))
        .get(app.api.class.get)

    app.route('/classes/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.class.save))
        .get(app.api.class.getById)
        .delete(admin(app.api.class.remove))

    app.route('/items')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.item.save))
        .get(app.api.item.get)

    app.route('/items/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.item.save))
        .get(app.api.item.getById)
        .delete(admin(app.api.item.remove))

    app.route('/tickets')
        .all(app.config.passport.authenticate())
        .post(app.api.ticket.save)
        .get(app.api.ticket.get)

    app.route('/tickets/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.ticket.save)
        .get(app.api.ticket.getById)
        .delete(app.api.ticket.remove)

    app.route('/interactions')
        .all(app.config.passport.authenticate())
        .post(app.api.interaction.save)
    
    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(app.api.user.get)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(app.api.user.getById)
        .delete(admin(app.api.user.remove))

}