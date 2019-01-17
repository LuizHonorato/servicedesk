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

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if(userData) {
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Date()){
                    return res.status(200).send(true)
                }
            }
        } catch(e) {
            //tratar token vencido
        }
        
        res.send(false)
    }

    return {signin, validateToken}
}