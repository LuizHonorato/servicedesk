module.exports = app => {
    const {existsOrError, notExistsOrError} = app.api.validator

    const save = async (req, res) => {
        const problem = {...req.body}
        if(req.params.id) problem.id = req.params.id

        try {
            existsOrError(problem.name, 'Descrição do problema não informada.')
            existsOrError(problem.type_id, 'Tipo do problema não informado.')

            const problemFromDB = await app.db('problems')
                .where({name: problem.name}).first()
                if(!problem.id) {
                    notExistsOrError(problemFromDB, 'Problema já cadastrado.')
                }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(problem.id) {
            app.db('problems')
                .update(problem)
                .where({id: problem.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('problems')
                .insert(problem)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('problems')
            .select('id', 'name', 'type_id')
            .then(problems => res.json(problems))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('problems')
            .select('id', 'name', 'type_id')
            .where({id: req.params.id})
            .first()
            .then(problem => res.json(problem))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'ID do problema não informado.')

            const rowsDeleted = await app.db('problems')
                .where({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Problema não encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return {save, get, getById, remove}

}