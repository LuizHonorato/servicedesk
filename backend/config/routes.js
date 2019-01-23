const admin = require('./admin')

module.exports = app => {

    //ROTAS QUE NÃO NECESSITAM DE AUTENTICAÇÃO
    app.post('/signin', app.api.auth.signin)
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