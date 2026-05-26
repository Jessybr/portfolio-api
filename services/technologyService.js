import prisma from '../lib/prisma.js'
import paramsTechnologyHelper from '../utils/paramsTechnologyHelper.js'
import { HttpError } from '../utils/error/HttpError.js'

async function getTecnologies() {
    const technologies = await prisma.technology.findMany()

    return { technologies }
}

async function getTecnologyById(id) {
    const technology = await prisma.technology.findUniqueOrThrow({
        where: { id }
    })
async function getTechnologyByName(name) {
    const technology = await prisma.technology.findFirst({
        where: { nome: name }
    })

    if(!technology) {
        throw new HttpError(`Tecnologia com o nome: ${name} não encontrada`, 404)
    }

    return { technology }
}

    return { technology }
}

async function deleteTechnology(id) {
    const existingTechnology = await prisma.technology.findUnique({
        where: { id }
    })

    if (!existingTechnology) {
        throw new HttpError("Tecnologia não encontrada", 404)
    }

    const result = await prisma.technology.delete({
        where: { id }
    })

    return { result }
}
