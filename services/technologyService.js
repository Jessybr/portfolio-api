import prisma from '../lib/prisma.js'

async function getTecnologies() {
    const technologies = await prisma.technology.findMany()

    return { technologies }
}

async function getTecnologyById(id) {
    const technology = await prisma.technology.findUniqueOrThrow({
        where: { id }
    })

    return { technology }
}

export default { getTecnologies, getTecnologyById }