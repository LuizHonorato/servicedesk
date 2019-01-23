module.exports = app => {
    const {existsOrError, notExistsOrError} = app.api.validator

    const save = async (req, res) => {
        const subject = {...req.body}
        if(req.params.id) subject.id = req.params.id

        try {
            existsOrError(subject.name, 'Nome do assunto não informado.')

            const subjectFromDB = await app.db('subjects')
                .where({name: problema.name}).first()
                if(!subject.id) {
                    notExistsOrError(subjectFromDB, 'Assunto já cadastrado.')
                }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(subject.id) {
            app.db('subjects')
                .update(subject)
                .where({id: subject.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('subjects')
                .insert(subject)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send())
        }
    }

    const get = (req, res) => {
        app.db('subjects')
            .select('id', 'name')
            .then(subjects => res.json(subjects))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('subjects')
            .select('id', 'name')
            .where({id: req.params.id})
            .first()
            .then(subject => res.json(subject))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'ID do assunto não foi informado.')

            const classes = await app.db('classes')
                .where({subject_id: req.params.id})
            notExistsOrError(classes, 'Existem Classes cadastradas vinculadas à esse Assunto.')

            const rowsDeleted = await app.db('subjects')
                .where({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Assunto não encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send()
        }
    }

    return {save, get, getById, remove}
}