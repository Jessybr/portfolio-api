import prisma from "../lib/prisma.js"

async function createProject(data) {
    const newProject = await prisma.project.create({
        data
    })

    return { newProject }
}

export default { createProject }