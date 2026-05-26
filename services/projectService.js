import prisma from "../lib/prisma.js"
import checkersParams from "../utils/paramsProjectHelper.js"
import { HttpError } from "../utils/error/HttpError.js"

async function createProject(data) {
    checkersParams.checkParamsNeeded(data)
    checkersParams.checkParamsInexist(data)

    const newProject = await prisma.project.create({
        data
    })

    return { newProject }
}

async function updateProjectById(id, data) {
    checkersParams.checkParamsInexist(data)

    const project = await prisma.project.findUnique({
        where: { id }
    })

    if(!project) {
        throw new HttpError(`Projeto com o id: ${id} não encontrado`, 404)
    }

    const updatedProject = await prisma.project.update({
        where: { id },
        data
    })

    return { updatedProject }
}

async function getProjectById(id) {
    const project = await prisma.project.findUnique({
        where: { id }
    })

    if(!project) {
        throw new HttpError(`Projeto com o id: ${id} não encontrado`, 404)
    }

    return { project }
}

async function getProjects(id) {
    const projects = await prisma.project.findMany()

    if(!projects) {
        throw new HttpError(`Não há projetos no banco de dados`, 404)
    }

    return { projects }
}

async function deleteProjectById(id) {
    const projectExist = await prisma.project.findUnique({
        where: { id }
    })

    if(!projectExist) {
        throw new HttpError(`Projeto com o id: ${id} não encontrado`, 404)
    }

    const result = await prisma.project.delete({
        where: { id }
    })

    return { result }
}

async function toggleActiveProject(id) {
    const projectExist = await prisma.project.findUnique({
        where: { id }
    })

    if(!projectExist) {
        throw new HttpError(`Projeto com o id: ${id} não encontrado`, 404)
    }

    const result = await prisma.project.update({
        where: { id },
        data: {
            ativo: !projectExist.ativo
        }
    })

    return { result }
}

export default { createProject, updateProjectById, getProjectById, getProjects, deleteProjectById, toggleActiveProject }