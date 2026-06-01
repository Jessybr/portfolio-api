import prisma from "../lib/prisma.js"
import checkersParams from "../utils/paramsProjectHelper.js"
import { HttpError } from "../utils/error/HttpError.js"
import technologyService from "./technologyService.js"
import categoryService from "./categoryService.js"

async function createProject(data) {
    const {
        tecnologias = [],
        categorias = [],
        ...projectData
    } = data

    checkersParams.checkParamsNeeded(projectData)
    checkersParams.checkParamsInexist(projectData)

    await technologyService.ensureTechnologiesExist(tecnologias)
    await categoryService.ensureCategoriesExist(categorias)

    const newProject = await prisma.project.create({
        data: {
            ...projectData,

            tecnologias: {
                create: tecnologias.map((tecnologiaId) => ({
                    tecnologia: {
                        connect: { id: tecnologiaId }
                    }
                }))
            },

            categorias: {
                create: categorias.map((categoriaId) => ({
                    categoria: {
                        connect: { id: categoriaId }
                    }
                }))
            }
        },
        include: {
            tecnologias: {
                include: {
                    tecnologia: true
                }
            },
            categorias: {
                include: {
                    categoria: true
                }
            }
        }
    })

    return { newProject }
}

async function updateProjectById(id, data) {
    checkersParams.checkParamsInexist(data)

    await checkProjectExistsById(id)

    const updatedProject = await prisma.project.update({
        where: { id },
        data
    })

    return { updatedProject }
}

async function getProjectById(id) {
    const project = await prisma.project.findUnique({
        where: { id },
        include: {
            tecnologias: {
                include: {
                    tecnologia: true
                }
            },
            categorias: {
                include: {
                    categoria: true
                }
            }
        }
    })

    if(!project) {
        throw new HttpError(`Projeto com o id: ${id} não encontrado`, 404)
    }

    return { project }
}

async function getProjects(id) {
    const projects = await prisma.project.findMany({
        include: {
            tecnologias: {
                include: {
                    tecnologia: true
                }
            },
            categorias: {
                include: {
                    categoria: true
                }
            }
        }
    })

    if(!projects) {
        throw new HttpError(`Não há projetos no banco de dados`, 404)
    }

    return { projects }
}

async function deleteProjectById(id) {
    await checkProjectExistsById(id)

    const result = await prisma.project.delete({
        where: { id }
    })

    return { result }
}

async function toggleActiveProject(id) {
    await checkProjectExistsById(id)

    const result = await prisma.project.update({
        where: { id },
        data: {
            ativo: !projectExist.ativo
        }
    })

    return { result }
}

async function getActiveProjects() {
    const projects = await prisma.project.findMany({
        where: {
            ativo: true
        }
    })

    return { projects }
}

async function checkProjectExistsById(id) {
    const project = await prisma.project.findUnique({
        where: { id }
    })

    if(!project) {
        throw new HttpError(`Projeto com o id: ${id} não encontrado`, 404)
    }
}

async function addTechnologyToProject(projectId, tecnologiaId) {
    await checkProjectExistsById(projectId)
    await technologyService.ensureTechnologiesExist([tecnologiaId])

    const technologyExistsInProject = await checkTechnologyExistsInProject(projectId, tecnologiaId)

    if (technologyExistsInProject) {
        throw new HttpError("Tecnologia já existe no projeto", 400)
    }

    const result = await prisma.project.update({
        where: { id: projectId },
        data: {
            tecnologias: {
                create: {
                    tecnologia: {
                        connect: { id: tecnologiaId }
                    }
                }
            }
        },
        include: {
            tecnologias: {
                include: {
                    tecnologia: true
                }
            },
            categorias: {
                include: {
                    categoria: true
                }
            }
        }
    })

    return { result }
}

async function removeTechnologyFromProject(projectId, tecnologiaId) {
    await checkProjectExistsById(projectId)
    await checkTechnologyExistsInProject(projectId, tecnologiaId)

    const result = await prisma.project.update({
        where: { id: projectId },
        data: {
            tecnologias: {
                delete: {
                    tecnologia_id_projeto_id: {
                        tecnologia_id: tecnologiaId,
                        projeto_id: projectId
                    }
                }
            }
        },
        include: {
            tecnologias: {
                include: {
                    tecnologia: true
                }
            },
            categorias: {
                include: {
                    categoria: true
                }
            }
        }
    })

    return { result }
}

async function addCategoryToProject(projectId, categoriaId) {
    await checkProjectExistsById(projectId)
    await categoryService.ensureCategoriesExist([categoriaId])

    const categoryExistsInProject = await checkCategoryExistsInProject(projectId, categoriaId)

    if (categoryExistsInProject) {
        throw new HttpError("Categoria já existe no projeto", 400)
    }

    const result = await prisma.project.update({
        where: { id: projectId },
        data: {
            categorias: {
                create: {
                    categoria: {
                        connect: { id: categoriaId }
                    }
                }
            }
        },
        include: {
            tecnologias: {
                include: {
                    tecnologia: true
                }
            },
            categorias: {
                include: {
                    categoria: true
                }
            }
        }
    })

    return { result }
}
