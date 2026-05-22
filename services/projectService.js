import prisma from "../lib/prisma.js"

async function createProject(data) {
    const newProject = await prisma.project.create({
        data
    })

    return { newProject }
}

async function updateProjectById(id, data) {
    const project = await prisma.project.findUnique({
        where: { id }
    })

    if(!project) {
        throw new Error(`Projeto com o id: ${id} não encontrado`)
    }

    const updatedProject = await prisma.project.update({
        where: { id },
        data
    })

    return { updatedProject }
}

export default { createProject, updateProjectById }