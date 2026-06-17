import prisma from '../lib/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { HttpError } from '../utils/error/httpError.js'

async function login(username, password) {
    const user = await prisma.user.findUnique({
        where: { username }
    })

    if(!user) {
        throw new HttpError('Credenciais inválidas', 401)
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if(!passwordMatch) {
        throw new HttpError('Credenciais inválidas', 401)
    }
    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )

    return { token }
}

export default { login }
