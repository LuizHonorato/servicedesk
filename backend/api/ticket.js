module.exports = app => {
    const {existsOrError, notExistsOrError} = app.api.validator

    const save = async (req, res) => {
        const ticket = {...req.body}
        if(req.params.id) ticket.id = req.params.id

        try {
            existsOrError(ticket.number, 'Número do chamado não informado.')
            existsOrError(ticket.status_id, 'Status do chamado não informado.')
            existsOrError(ticket.type_id, 'Tipo do chamado não informado.')
            existsOrError(ticket.problem_id, 'Problema do chamado informado.')
            existsOrError(ticket.description, 'Descrição do chamado não informada.')
            existsOrError(ticket.subject_id, 'Assunto do chamado não informado.')
            existsOrError(ticket.class_id, 'Classe do chamado não informada.')
            existsOrError(ticket.item_id, 'Item do chamado não informado.')
            existsOrError(ticket.opening_date, 'Data do chamado não informada.')
            existsOrError(ticket.requester_user_id, 'Solicitante não informado.')

            const ticketFromDB = await app.db('tickets')
                .where({number: ticket.number})
            if(!ticket.id) {
                notExistsOrError(ticketFromDB, 'Ticket já cadastrado.')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(ticket.id) {
            app.db('tickets')
                .update(ticket)
                .where({id: ticket.id})
                .then(_ => res.status(204).send())
                .catcj(err => res.status(500).send(err))
        } else {
            app.db('tickets')
                .insert(ticket)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('tickets')
            .select('id', 'number', 'title', 'opening_date', 'status_id')
            .then(tickets => res.json(tickets))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('tickets')
            .select('id', 'number', 'title', 'opening_date', 'status_id')
            .where({id: req.params.id})
            .first()
            .then(tickets => res.json(tickets))
            .catch(err => res.status(500).send(err)) 
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'ID do chamado não informado.')

            const rowsDeleted = await app.db('tickets')
                .where({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Chamado não encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return {save, get, getById, remove}
}