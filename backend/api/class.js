module.exports = app => {
    const {existsOrError, notExistsOrError} = app.api.validator
    
    const save = async (req, res) => {
        const classe = {...req.body}
        if(req.params.id) classe.id = req.params.id

        try {
            existsOrError(classe.name, 'Nome da classe não informado.')
            existsOrError(classe.subject_id, 'Assunto não informado.')

            const classeFromDB = await app.db('classes')
                .where({name: classe.name}).first()
                if(!classe.id) {
                    notExistsOrError(classeFromDB, 'Classe já cadastrada.')
                }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(classe.id) {
            app.db('classes')
                .update(classe)
                .where({id: classe.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('classes')
                .insert(classe)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('classes')
            .select('id', 'name', 'subject_id')
            .then(classes => res.json(classes))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('classes')
            .select('id', 'name', 'subject_id')
            .where({id: req.params.id})
            .first()
            .then(classe => res.json(classe))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'ID da classe não informado.')

            const items = await app.db('items')
                .where({classe_id: req.params.id})
            notExistsOrError(items, 'Existem itens cadastrados vinculados à essa classe.')

            const rowsDeleted = await app.db('classes')
                .where({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Classe não encontrada.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return {save, get, getById, remove}
}