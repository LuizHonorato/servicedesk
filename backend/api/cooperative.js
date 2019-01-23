module.exports = app => {
    const {existsOrError, notExistsOrError} = app.api.validator

    const save = async (req, res) => {
        const cooperative = {...req.body}
        if(req.params.id) cooperative.id = req.params.id
        
        try {
            existsOrError(cooperative.coop_number, 'Número da cooperativa não informado.')
            existsOrError(cooperative.name, 'Nome da cooperativa não informado.')

            const cooperativeFromDB = await app.db('cooperatives')
                .where({coop_number: cooperative.coop_number}).first()
                if(!cooperative.id) {
                    notExistsOrError(cooperativeFromDB, 'Cooperativa já cadastrada.')
                }
        } catch(msg) {
            return res.status(400).send(msg)
        }
        
        if(cooperative.id) {
            app.db('cooperatives')
                .update(cooperative)
                .where({id: cooperative.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('cooperatives')
                .insert(cooperative)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } 
    }

    const get = (req, res) => {
        app.db('cooperatives')
            .select('id', 'coop_number', 'name')
            .then(cooperatives => res.json(cooperatives))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('cooperatives')
            .select('id', 'coop_number', 'name')
            .where({id: req.params.id})
            .first()
            .then(cooperative => res.json(cooperative))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'ID da cooperativa não informado.')

            const users = await app.db('users')
                .where({coop_id: req.params.id})
            notExistsOrError(users, 'Existem usuários vinculados à cooperativa.')

            const rowsDeleted =  await app.db('cooperatives')
                .where({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Cooperativa não encontrada.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return {save, get, getById, remove}
}