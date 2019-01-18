const {authSecret} = require('../.env')
//const jwt = require('jwt-simple')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send('Informe usuário e senha!')
        }

        const user = await app.db('users')
            .where({email: req.body.email})
            .first()

        if (!user) return res.status(400).send('Usuário não encontrado!')

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if (!isMatch) return res.status(401).send('E-mail/Senha inválidos!')

        //const now = Math.floor(Date.now() / 1000)

        const token = jwt.sign(user, authSecret, {
            expiresIn: "1 day"
        })

        const payload = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            department: user.department,
            email: user.email,
            user_type: user.user_type
        }

        res.json({
            ...payload,
            token
        })
    }

    const validateToken = (req, res, next) => {
        const token = req.body.token || ''
        
        jwt.verify(token, authSecret, function (err, decoded) {
            return res.status(200).send({valid: !err})
        })
        
    }

    return {signin, validateToken}
}