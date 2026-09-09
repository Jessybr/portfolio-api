import prisma from "../lib/prisma.js"
import checkersParams from "../utils/paramsProjectHelper.js"
import { HttpError } from "../utils/error/httpError.js"
import technologyService from "./technologyService.js"
import categoryService from "./categoryService.js"
import uploadService from "./uploadService.js"

function parseRelationIds(value) {
    if (!value) {
        return []
    }

    let parsedValue = value

    if (typeof value === 'string') {
        try {
            parsedValue = JSON.parse(value)
        } catch {
            parsedValue = [value]
        }
    }

    if (!Array.isArray(parsedValue)) {
        parsedValue = [parsedValue]
    }

    const ids = parsedValue.map(Number)

    if (ids.some((id) => Number.isNaN(id))) {
        throw new HttpError("As relações do projeto precisam conter apenas IDs numéricos", 422)
    }

    return ids
}

function normalizeProjectData(data) {
    const normalizedData = { ...data }

    if (normalizedData.ativo !== undefined) {
        normalizedData.ativo = normalizedData.ativo === true || normalizedData.ativo === 'true'
    }

    return normalizedData
}

async function createProject(data) {
    const {
        tecnologias = [],
        categorias = [],
        imagem,
        video,
        ...projectData
    } = data

    checkersParams.checkParamsNeeded(projectData)
    checkersParams.checkParamsInexist(projectData)

    const technologyIds = parseRelationIds(tecnologias)
    const categoryIds = parseRelationIds(categorias)
    const normalizedProjectData = normalizeProjectData(projectData)

    await technologyService.ensureTechnologiesExist(technologyIds)
    await categoryService.ensureCategoriesExist(categoryIds)

    let uploadedImage, uploadedVideo
    if(imagem) {
        uploadedImage = await uploadService.uploadFile(imagem)
    }
    if(video) {
        uploadedVideo = await uploadService.uploadFile(video)
    }

    const projectExist = await prisma.project.findFirst({
        where: {
            nome: normalizedProjectData.nome
        }
    })

    if(projectExist) {
        throw new HttpError(`Projeto com o nome: ${normalizedProjectData.nome} já existe`, 400)
    }

    const newProject = await prisma.project.create({
        data: {
            ...normalizedProjectData,
            imagemSrc: uploadedImage?.url || normalizedProjectData.imagemSrc || null,
            imagemPublicId: uploadedImage?.publicId || normalizedProjectData.imagemPublicId,
            videoSrc: uploadedVideo?.url || normalizedProjectData.videoSrc || null,
            videoPublicId: uploadedVideo?.publicId || normalizedProjectData.videoPublicId,

            tecnologias: {
                create: technologyIds.map((tecnologiaId) => ({
                    tecnologia: {
                        connect: { id: tecnologiaId }
                    }
                }))
            },

            categorias: {
                create: categoryIds.map((categoriaId) => ({
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

    const currentProject = await checkProjectExistsById(id)

    const {
        tecnologias,
        categorias,
        imagem,
        video,
        ...projectData
    } = data

    const technologyIds = tecnologias !== undefined ? parseRelationIds(tecnologias) : undefined
    const categoryIds = categorias !== undefined ? parseRelationIds(categorias) : undefined
    const normalizedProjectData = normalizeProjectData(projectData)

    if (technologyIds !== undefined) {
        await technologyService.ensureTechnologiesExist(technologyIds)
    }

    if (categoryIds !== undefined) {
        await categoryService.ensureCategoriesExist(categoryIds)
    }

    let uploadedImage, uploadedVideo
    if(imagem) {
        uploadedImage = await uploadService.uploadFile(imagem)
        await uploadService.deleteFile(currentProject.imagemPublicId, 'image')
    }
    if(video) {
        uploadedVideo = await uploadService.uploadFile(video)
        await uploadService.deleteFile(currentProject.videoPublicId, 'video')
    }

    const updatedProject = await prisma.project.update({
        where: { id },
        data: {
            ...normalizedProjectData,
            imagemSrc: uploadedImage?.url || normalizedProjectData.imagemSrc,
            imagemPublicId: uploadedImage?.publicId || normalizedProjectData.imagemPublicId,
            videoSrc: uploadedVideo?.url || normalizedProjectData.videoSrc,
            videoPublicId: uploadedVideo?.publicId || normalizedProjectData.videoPublicId,
            ...(technologyIds !== undefined && {
                tecnologias: {
                    deleteMany: {},
                    create: technologyIds.map((tecnologiaId) => ({
                        tecnologia: {
                            connect: { id: tecnologiaId }
                        }
                    }))
                }
            }),
            ...(categoryIds !== undefined && {
                categorias: {
                    deleteMany: {},
                    create: categoryIds.map((categoriaId) => ({
                        categoria: {
                            connect: { id: categoriaId }
                        }
                    }))
                }
            })
        }
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

    return projects
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

    const technologyExistsInProject = await technologyExistsInProjectById(projectId, tecnologiaId)

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

    const technologyExistsInProject = await technologyExistsInProjectById(projectId, tecnologiaId)

    if (!technologyExistsInProject) {
        throw new HttpError("Tecnologia não encontrada no projeto", 404)
    }

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

async function removeCategoryFromProject(projectId, categoriaId) {
    await checkProjectExistsById(projectId)
    const categoryExistsInProject = await checkCategoryExistsInProject(projectId, categoriaId)

    if (!categoryExistsInProject) {
        throw new HttpError("Categoria não encontrada no projeto", 404)
    }

    const result = await prisma.project.update({
        where: { id: projectId },
        data: {
            categorias: {
                delete: {
                    categoria_id_projeto_id: {
                        categoria_id: categoriaId,
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

async function technologyExistsInProjectById(projectId, tecnologiaId) {
    const projectTechnology = await prisma.technology_Project.findUnique({
        where: {
            tecnologia_id_projeto_id: {
                tecnologia_id: tecnologiaId,
                projeto_id: projectId
            }
        }
    })

    return Boolean(projectTechnology)
}

async function checkCategoryExistsInProject(projectId, categoriaId) {
    const projectCategory = await prisma.category_Project.findUnique({
        where: {
            categoria_id_projeto_id: {
                categoria_id: categoriaId,
                projeto_id: projectId
            }
        }
    })

    return Boolean(projectCategory)
}

export default { createProject, updateProjectById, getProjectById, getProjects, deleteProjectById, toggleActiveProject, getActiveProjects, addTechnologyToProject, removeTechnologyFromProject, addCategoryToProject, removeCategoryFromProject }
