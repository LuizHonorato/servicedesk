module.exports = app => {
    const {existsOrError, notExistsOrError} = app.api.validator

    const save = async (req, res) => {
        const item = {...req.body}
        if(req.params.id) problem.id = req.params.id

        try {
            existsOrError(item.name, 'Nome do item não informado.')
            existsOrError(item.classe_id, 'Classe não informada.')

            const itemFromDB = await app.db('items')
                .where({name: item.name}).first()
                if(!item.id) {
                    notExistsOrError(itemFromDB, 'Item já cadastrado.')
                }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(item.id) {
            app.db('items')
                .update(item)
                .where({id: item.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('items')
                .insert(item)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('items')
            .select('id', 'name', 'classe_id')
            .then(items => res.json(items))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('items')
            .select('id', 'name', 'classe_id')
            .where({id: req.params.id})
            .first()
            .then(item => res.json(item))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'ID do item não informado.')

            const rowsDeleted = await app.db('items')
                .where({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Item não encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return {save, get, getById, remove}
}