import jwt from 'jsonwebtoken'

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization

    if(!authHeader) {
        return res.status(401).json({error: 'Token não informado'})
    }

    const [, token] = authHeader.split(' ')

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decode.id

        return next()
    } catch {
        return res.status(401).json({error: 'Token inválido'})
    }
}