module.exports = app => {
    const {existsOrError, notExistsOrError} = app.api.validator

    const save = async (req, res) => {
        const interaction = {...req.body}
        if(req.params.id) interaction.id = req.params.id
        
        try {
            existsOrError(interaction.description, 'Descrição não informada.')
            existsOrError(interaction.date, 'Data não informada.')
            existsOrError(interaction.ticket_id, 'Ticket não informado.')
            existsOrError(interaction.operator_user_id, 'Atendente não informado.')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        app.db('interactions')
            .insert(interaction)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const getByTicket = async (req, res) => {
        
    }

    return {save}
}