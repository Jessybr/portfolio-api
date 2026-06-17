import { expect, jest } from '@jest/globals'
import { HttpError } from '../src/utils/error/httpError.js'
import { response } from 'express'

const prismaMock = {
    project: {
        create: jest.fn(),
        update: jest.fn(),
        findUnique: jest.fn(),
        delete: jest.fn(),
        findMany: jest.fn()
    },
    technology: {
        findMany: jest.fn()
    },
    category: {
        findMany: jest.fn()
    },
    technology_Project: {
        findUnique: jest.fn()
    },
    category_Project: {
        findUnique: jest.fn()
    }
}

jest.unstable_mockModule('@prisma/client', () => ({
    PrismaClient: jest.fn(() => prismaMock)
}))

jest.unstable_mockModule('@prisma/adapter-better-sqlite3', () => ({
    PrismaBetterSqlite3: jest.fn()
}))

const projectService = (await import('../src/services/projectService.js')).default

describe('Project Service', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('Should create a new project', async () => {
        const projectData = {
            nome: 'Test Project',
            descricao: 'This is a test project',
            videoSrc: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            imagemSrc: 'https://example.com/image.png',
            deployUrl: 'https://example.com',
            githubUrl: 'https://github.com/example/project',
            tecnologias: [2, 3],
            categorias: [1]
        }

        const createdProject = {
            id: 1,
            nome: projectData.nome,
            descricao: projectData.descricao,
            videoSrc: projectData.videoSrc,
            imagemSrc: projectData.imagemSrc,
            deployUrl: projectData.deployUrl,
            githubUrl: projectData.githubUrl,
            tecnologias: [
                { tecnologia: { id: 1 } },
                { tecnologia: { id: 2 } }
            ],
            categorias: [
                { categoria: { id: 1 } },
                { categoria: { id: 2 } }
            ]
        }

        prismaMock.technology.findMany.mockResolvedValue([{ id: 2 }, { id: 3 }])
        prismaMock.category.findMany.mockResolvedValue([{ id: 1 }])
        prismaMock.project.create.mockResolvedValue(createdProject)

        const result = await projectService.createProject(projectData)

        expect(prismaMock.project.create).toHaveBeenCalled()
        expect(prismaMock.technology.findMany).toHaveBeenCalled()
        expect(prismaMock.category.findMany).toHaveBeenCalled()
        expect(result).toEqual({ newProject: createdProject })
    })

    it('Should return error when create a project with no needed params', async () => {
        const projectData = {
            videoSrc: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            imagemSrc: 'https://example.com/image.png',
            deployUrl: 'https://example.com',
            githubUrl: 'https://github.com/example/project',
            tecnologias: [1, 2],
            categorias: [1, 2]
        }

        await expect(projectService.createProject(projectData))
            .rejects
            .toThrow("O nome e a descrição são obrigatórios")

        expect(prismaMock.project.create).not.toHaveBeenCalled()

    })

    it('Should return error when create a projet with invalid technology id', async () => {
        const projectData = {
            nome: 'Test Project',
            descricao: 'This is a test project',
            videoSrc: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            imagemSrc: 'https://example.com/image.png',
            deployUrl: 'https://example.com',
            githubUrl: 'https://github.com/example/project',
            tecnologias: [2, 99],
            categorias: [1]
        } 

        prismaMock.technology.findMany.mockResolvedValue([{ id: 2 }])

        await expect(projectService.createProject(projectData))
            .rejects
            .toThrow("Uma ou mais tecnologias não existem")

        expect(prismaMock.technology.findMany).toHaveBeenCalled()
        expect(prismaMock.category.findMany).not.toHaveBeenCalled()
        expect(prismaMock.project.create).not.toHaveBeenCalled()
    })

    it('Should return error when create a project with invalid category id', async () => {
        const projectData = {
            nome: 'Test Project',
            descricao: 'This is a test project',
            videoSrc: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            imagemSrc: 'https://example.com/image.png',
            deployUrl: 'https://example.com',
            githubUrl: 'https://github.com/example/project',
            tecnologias: [2, 3],
            categorias: [1, 99]
        }

        prismaMock.technology.findMany.mockResolvedValue([{ id: 2 }, { id: 3 }])
        prismaMock.category.findMany.mockResolvedValue([{ id: 1}])

        await expect(projectService.createProject(projectData))
            .rejects
            .toThrow("Uma ou mais categorias não existem")

        expect(prismaMock.technology.findMany).toHaveBeenCalled()
        expect(prismaMock.category.findMany).toHaveBeenCalled()
        expect(prismaMock.project.create).not.toHaveBeenCalled()
    })

    it('Should return error when create a project with invalid parameters', async () => {
        const projectData = {
            nome: 'Test Project',
            descricao: 'This is a test project',
            codigofonte: 'deve dar erro',
            videoSrc: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            imagemSrc: 'https://example.com/image.png',
            deployUrl: 'https://example.com',
            githubUrl: 'https://github.com/example/project',
            tecnologias: [2, 99],
            categorias: [1]
        } 

        await expect(projectService.createProject(projectData))
            .rejects
            .toThrow("O parâmetro codigofonte não é permitido")

        expect(prismaMock.technology.findMany).not.toHaveBeenCalled()
        expect(prismaMock.category.findMany).not.toHaveBeenCalled()
        expect(prismaMock.project.create).not.toHaveBeenCalled()
    })

    it('Should update a project', async () => {
        const projectId = 1
        const projectData = {
            nome: 'Test Project',
            descricao: 'description',
            codigofonte: 'deve dar erro',
            videoSrc: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            imagemSrc: 'https://example.com/image.png',
            deployUrl: 'https://example.com',
            githubUrl: 'https://github.com/example/project'
        }
        const projectDataUpdated = {
            nome: 'Test Project',
            descricao: 'This is an updated description',
            codigofonte: 'deve dar erro',
            videoSrc: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            imagemSrc: 'https://example.com/image.png',
            deployUrl: 'https://example.com',
            githubUrl: 'https://github.com/example/project'
        }
        const descricaoUpdated = { descricao: 'This is an updated description' }

        prismaMock.project.findUnique.mockResolvedValue(projectData)
        prismaMock.project.update.mockResolvedValue(projectDataUpdated)

        const result = await projectService.updateProjectById(projectId, descricaoUpdated)

        expect(result.updatedProject.descricao).toBe('This is an updated description')
        expect(prismaMock.project.create).not.toHaveBeenCalled()
    })

    it('Should return error when update a project with invalid id', async () => {
        const projectId = 99
        const descricaoUpdated = { descricao: 'This is an updated description' }

        prismaMock.project.findUnique.mockResolvedValue()

        await expect(projectService.updateProjectById(projectId, descricaoUpdated))
            .rejects
            .toThrow(`Projeto com o id: ${projectId} não encontrado`)

        expect(prismaMock.project.findUnique).toHaveBeenCalled
        expect(prismaMock.project.update).not.toHaveBeenCalled
    })

    it('Should return error when update a project with invalid parameters', async () => {
        const projectId = 1
        const invalidParam = { param: 'This is an invalid parameter' }

        await expect(projectService.updateProjectById(projectId, invalidParam))
            .rejects
            .toThrow(`O parâmetro ${Object.keys(invalidParam)} não é permitido`)

        expect(prismaMock.project.findUnique).not.toHaveBeenCalled
        expect(prismaMock.project.update).not.toHaveBeenCalled
    })

    it('Should add a new technology to a project', async () => {
        const projectId = 1
        const technologyId = 3
        const projectData = {
            id: projectId,
            nome: 'Test Project',
            descricao: 'This is a test project',
            videoSrc: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            imagemSrc: 'https://example.com/image.png',
            deployUrl: 'https://example.com',
            githubUrl: 'https://github.com/example/project',
            tecnologias: [1],
            categorias: [1]
        }
        const projectDataUpdated = {
            id: projectId,
            nome: 'Test Project',
            descricao: 'This is a test project',
            videoSrc: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            imagemSrc: 'https://example.com/image.png',
            deployUrl: 'https://example.com',
            githubUrl: 'https://github.com/example/project',
            tecnologias: [1, technologyId],
            categorias: [1]
        }

        prismaMock.project.findUnique.mockResolvedValue(projectData)
        prismaMock.technology.findMany.mockResolvedValue([{ id: technologyId }])
        prismaMock.technology_Project.findUnique.mockResolvedValue(null)
        prismaMock.project.update.mockResolvedValue(projectDataUpdated)

        const result = await projectService.addTechnologyToProject(projectId, technologyId)

        expect(prismaMock.project.findUnique).toHaveBeenCalled()
        expect(prismaMock.technology.findMany).toHaveBeenCalled()
        expect(prismaMock.technology_Project.findUnique).toHaveBeenCalled()
        expect(prismaMock.project.update).toHaveBeenCalled()
        expect(result).toEqual({ result: projectDataUpdated })
    })

    it('Should return error when technology already exists in project', async () => {
        const projectId = 1
        const technologyId = 3

        prismaMock.project.findUnique.mockResolvedValue({ id: projectId })
        prismaMock.technology.findMany.mockResolvedValue([{ id: technologyId }])
        prismaMock.technology_Project.findUnique.mockResolvedValue({
            tecnologia_id: technologyId,
            projeto_id: projectId
        })

        await expect(projectService.addTechnologyToProject(projectId, technologyId))
            .rejects
            .toThrow('Tecnologia já existe no projeto')

        expect(prismaMock.project.update).not.toHaveBeenCalled()
    })

    it('Should delete a technology from a project', async () => {
        const projectId = 1
        const technologyId = 2
        const projectData = {
            id: projectId,
            nome: 'Test Project',
            descricao: 'This is a test project',
            videoSrc: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            imagemSrc: 'https://example.com/image.png',
            deployUrl: 'https://example.com',
            githubUrl: 'https://github.com/example/project'
        }

        prismaMock.project.findUnique.mockResolvedValue(projectData)
        prismaMock.technology_Project.findUnique.mockResolvedValue({
            tecnologia_id: technologyId,
            projeto_id: projectId
        })
        prismaMock.project.update.mockResolvedValue(projectData)

        const result = await projectService.removeTechnologyFromProject(projectId, technologyId)

        expect(prismaMock.project.findUnique).toHaveBeenCalled()
        expect(prismaMock.technology_Project.findUnique).toHaveBeenCalled()
        expect(prismaMock.project.update).toHaveBeenCalled()
        expect(result).toEqual({ result: projectData })
    })

    it('Should add a new category to a project', async () => {
        const projectId = 1
        const categoryId = 3
        const projectData = {
            id: projectId,
            nome: 'Test Project',
            descricao: 'This is a test project',
            videoSrc: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            imagemSrc: 'https://example.com/image.png',
            deployUrl: 'https://example.com',
            githubUrl: 'https://github.com/example/project',
            tecnologias: [1],
            categorias: [1]
        }
        const projectDataUpdated = {
            id: projectId,
            nome: 'Test Project',
            descricao: 'This is a test project',
            videoSrc: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            imagemSrc: 'https://example.com/image.png',
            deployUrl: 'https://example.com',
            githubUrl: 'https://github.com/example/project',
            tecnologias: [1],
            categorias: [1, 3]
        }

        prismaMock.project.findUnique.mockResolvedValue(projectData)
        prismaMock.category.findMany.mockResolvedValue([{ id: categoryId }])
        prismaMock.category_Project.findUnique.mockResolvedValue(null)
        prismaMock.project.update.mockResolvedValue(projectDataUpdated)

        const result = await projectService.addCategoryToProject(projectId, categoryId)

        expect(prismaMock.project.findUnique).toHaveBeenCalled()
        expect(prismaMock.category.findMany).toHaveBeenCalled()
        expect(prismaMock.category_Project.findUnique).toHaveBeenCalled()
        expect(prismaMock.project.update).toHaveBeenCalled()
        expect(result).toEqual({ result: projectDataUpdated })
    })

    it('Should return error when category already exists in project', async () => {
        const projectId = 1
        const categoryId = 3

        prismaMock.project.findUnique.mockResolvedValue({ id: projectId })
        prismaMock.category.findMany.mockResolvedValue([{ id: categoryId }])
        prismaMock.category_Project.findUnique.mockResolvedValue({
            categoria_id: categoryId,
            projeto_id: projectId
        })

        await expect(projectService.addCategoryToProject(projectId, categoryId))
            .rejects
            .toThrow('Categoria já existe no projeto')

        expect(prismaMock.project.update).not.toHaveBeenCalled()
    })  
    
    it('Should delete a category from a project', async () => {
        const projectId = 1
        const categoryId = 2
        const projectData = {
            id: projectId,
            nome: 'Test Project',
            descricao: 'This is a test project',
            videoSrc: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            imagemSrc: 'https://example.com/image.png',
            deployUrl: 'https://example.com',
            githubUrl: 'https://github.com/example/project'
        }

        prismaMock.project.findUnique.mockResolvedValue(projectData)
        prismaMock.category_Project.findUnique.mockResolvedValue({
            categoria_id: categoryId,
            projeto_id: projectId
        })
        prismaMock.project.update.mockResolvedValue(projectData)

        const result = await projectService.removeCategoryFromProject(projectId, categoryId)

        expect(prismaMock.project.findUnique).toHaveBeenCalled()
        expect(prismaMock.category_Project.findUnique).toHaveBeenCalled()
        expect(prismaMock.project.update).toHaveBeenCalled()
        expect(result).toEqual({ result: projectData })
    })

    it('Should delete a project', async () => {
        const projectId = 1
        const projectData = {
            id: projectId,
            nome: 'Test Project',
            descricao: 'This is a test project',
            videoSrc: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            imagemSrc: 'https://example.com/image.png',
            deployUrl: 'https://example.com',
            githubUrl: 'https://github.com/example/project'
        }

        prismaMock.project.findUnique.mockResolvedValue(projectData)
        prismaMock.project.delete.mockResolvedValue(null)

        const result = await projectService.deleteProjectById(projectId)

        expect(prismaMock.project.findUnique).toHaveBeenCalled()
        expect(prismaMock.project.delete).toHaveBeenCalled()
    })

    it('Should return all projects', async () => {
        const projects = {
                projects: [
                    {
                        id: 1,
                        nome: 'Test Project 1',
                        descricao: 'This is a test project 1',
                        ativo: false,
                        videoSrc: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        imagemSrc: 'https://example.com/image.png',
                        deployUrl: 'https://example.com',
                        githubUrl: 'https://github.com/example/project'
                    },
                    {
                        id: 2,
                        nome: 'Test Project 2',
                        descricao: 'This is a test project 2',
                        ativo: false,
                        videoSrc: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        imagemSrc: 'https://example.com/image.png',
                        deployUrl: 'https://example.com',
                        githubUrl: 'https://github.com/example/project'
                    }
                ]
        }

        prismaMock.project.findMany.mockResolvedValue(projects)

        const result = await projectService.getProjects()

        expect(prismaMock.project.findMany).toHaveBeenCalled()
        expect(result).toEqual(projects)
    })
})
