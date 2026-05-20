import prisma from '../lib/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

async function login(username, password) {
    const user = await prisma.user.findUnique({
        where: { username }
    })

    if(!user) {
        throw new Error('Credenciais inválidas')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if(!passwordMatch) {
        throw new Error('Credenciais inválidas')
    }
    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )

    return { token }
}

export default { login }
