import prisma from '../lib/prisma.js'
import paramsTechnologyHelper from '../utils/paramsTechnologyHelper.js'
import { HttpError } from '../utils/error/httpError.js'

async function getTecnologies() {
    const technologies = await prisma.technology.findMany()

    return { technologies }
}

async function getTecnologyById(id) {
    const technology = await prisma.technology.findUnique({
        where: { id }
    })

    if (!technology) {
        throw new HttpError("Tecnologia não encontrada", 404)
    }

    return { technology }
}

async function getTechnologyByName(name) {
    const technology = await prisma.technology.findFirst({
        where: { nome: name }
    })

    if(!technology) {
        throw new HttpError(`Tecnologia com o nome: ${name} não encontrada`, 404)
    }

    return { technology }
}

async function createTechnology(data) {
    paramsTechnologyHelper.checkBodyNeededToCreateTechnology(data)
    paramsTechnologyHelper.checkBodyInexistent(data)

    const technology = await prisma.technology.create({
        data
    })

    return { technology }
}

async function deleteTechnology(id) {
    await checkTechnologyExistsById(id)

    const result = await prisma.technology.delete({
        where: { id }
    })

    return { result }
}

async function ensureTechnologiesExist(ids) {
    const technologies = await prisma.technology.findMany({
        where: {
            id: {
                in: ids
            }
        }
    })

    if (technologies.length !== ids.length) {
        throw new HttpError("Uma ou mais tecnologias não existem", 422)
    }

    return technologies
}

async function checkTechnologyExistsById(id) {
    const technology = await prisma.technology.findUnique({
         where: { id }
    })

    if(!technology) {
        throw new HttpError("Tecnologia não encontrada", 404)
    }
}

export default { getTecnologies, getTecnologyById, getTechnologyByName, createTechnology, deleteTechnology, ensureTechnologiesExist }