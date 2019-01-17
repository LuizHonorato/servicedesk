module.exports = middleware => {
    return (req, res, next) => {
        if(req.user.user_type == 'ADMINISTRADOR') {
            middleware(req, res, next)
        } else {
            res.status(401).send('Usuário não é administrador.')
        }
    }
}