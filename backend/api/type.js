module.exports = app => {
    const {existsOrError, notExistsOrError} = app.api.validator

    const save = async (req, res) => {
        const type = {...req.body}
        if(req.params.id) type.id = req.params.id

        try {
            existsOrError(type.name, 'Descrição do tipo de chamado não informada.')
            existsOrError(type.sla, 'SLA do tipo de chamado não informado.')

            const typeFromDB = await app.db('types')
                .where({name: type.name}).first()
                if(!type.id) {
                    notExistsOrError(typeFromDB, 'Tipo de chamado já cadastrado.')
                }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(type.id) {
            app.db('types')
                .update(type)
                .where({id: type.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('types')
                .insert(type)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('types')
            .select('id', 'name', 'sla')
            .then(types => res.json(types))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('types')
            .select('id', 'name', 'sla')
            .where({id: req.params.id})
            .first()
            .then(type => res.json(type))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'ID do tipo de chamado não informado.')

            const problems = await app.db('problems')
                .where({type_id: req.params.id})
            notExistsOrError(problems, 'Existem problemas cadastrados vinculados à esse tipo de chamado.')

            const rowsDeleted = await app.db('types')
                .where({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Tipo de chamado não encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }
 
    return {save, get, getById, remove}
}