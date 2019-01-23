module.exports = app => {
    const {existsOrError, notExistsOrError} = app.api.validator

    const save = async (req, res) => {
        const department = {...req.body}
        if(req.params.id) department.id = req.params.id

        try {
            existsOrError(department.name, 'Nome do departamento não informado.')

            const departmentFromDB = await app.db('departments')
                .where({name: department.name}).first()
                if(!department.id) {
                    notExistsOrError(departmentFromDB, 'Departamento já cadastrado.')
                }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(department.id) {
            app.db('departments')
                .update(department)
                .where({id: department.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('departments')
                .insert(department)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('departments')
            .select('id', 'name')
            .then(departments => res.json(departments))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('departments')
            .select('id', 'name')
            .where({id: req.params.id})
            .first()
            .then(department => res.json(department))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'ID do departamento não informado.')

            const users = await app.db('users')
                .where({department_id: req.params.id})
            notExistsOrError(users, 'Existem usuários vinculados à esse departamento.')

            const rowsDeleted = await app.db('departments')
                .where({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Departamento não encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return {save, get, getById, remove}

}