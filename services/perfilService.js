import prisma from '../lib/prisma.js'

async function getPerfil() {
    const perfil = await prisma.perfil.findUnique({
        where: { id: 1 }
    })

    if(!perfil) {
        throw new Error('Perfil não encontrado')
    }

    return { perfil }
}

export default { getPerfil }