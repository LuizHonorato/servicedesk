module.exports = app => {
    const {existsOrError, notExistsOrError} = app.api.validator

    const save = async (req, res) => {
        const status = {...req.body}
        if(req.params.id) status.id = req.params.id

        try {
            existsOrError(status.name, 'Nome do status não informado.')

            const statusFromDB = await app.db('status')
                .where({name: status.name}).first()
                if(!status.id) {
                    notExistsOrError(statusFromDB, 'Status já cadastrado.')
                }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(status.id) {
            app.db('status')
                .update(status)
                .where({id: status.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('status')
                .insert(status)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('status')
            .select('id', 'name')
            .then(status => res.json(status))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('status')
            .select('id', 'name')
            .where({id: req.params.id})
            .first()
            .then(status => res.json(status))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'ID do status não foi informado.')

            const tickets = await app.db('tickets')
                .where({status_id: req.params.id})
            notExistsOrError(tickets, 'Existem chamados vinculados à esse status.')

            const rowsDeleted = await app.db('status')
                .where({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Status não encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send()
        }
    }

    return {save, get, getById, remove}
}