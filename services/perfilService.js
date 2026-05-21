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

async function updatePerfil(data) {
    const perfil = await prisma.perfil.findUnique({
        where: { id: 1 }
    })

    if(!perfil) {
        throw new Error('Perfil não encontrado')
    }

    const perfilUpdated = await prisma.perfil.update({
        where: { id: 1 },
        data
    })

    return { perfil }
}

export default { getPerfil, updatePerfil }