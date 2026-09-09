import projectService from '../services/projectService.js'
import responseHTTP from '../utils/response/httpResponse.js'
import { HttpError } from '../utils/error/httpError.js'

function parseJsonArrayField(value, fieldName) {
    if (value === undefined) {
        return undefined
    }

    if (Array.isArray(value)) {
        return value
    }

    if (typeof value !== 'string') {
        return value
    }

    try {
        const parsed = JSON.parse(value)

        if (!Array.isArray(parsed)) {
            throw new Error()
        }

        return parsed
    } catch {
        throw new HttpError(`O campo ${fieldName} precisa ser um JSON válido`, 422)
    }
}

function getProjectDataFromRequest(req) {
    const data = { ...req.body }

    data.tecnologias = parseJsonArrayField(data.tecnologias, 'tecnologias')
    data.categorias = parseJsonArrayField(data.categorias, 'categorias')

    if (req.files?.imagem?.[0]) {
        data.imagem = req.files.imagem[0]
    }

    if (req.files?.video?.[0]) {
        data.video = req.files.video[0]
    }

    return data
}

async function createProject(req, res) {
    try {
        const data = req.body
        const result = await projectService.createProject(data)

        return responseHTTP.created(res, "Projeto criado com sucesso!", result)
    } catch (error) {
        return responseHTTP.internalError(res, error.message, error.statusCode)
    }
}

async function updateProjectById(req, res) {
    try {
        const id = req.params.id
        const data = req.body
        const result = await projectService.updateProjectById(parseInt(id), data)

        return responseHTTP.ok(res, "Projeto atualizado com sucesso!", result)
    } catch (error) {
        return responseHTTP.internalError(res, error.message, error.statusCode)
    }
}

async function getProjectById(req, res) {
    try {
        const id = req.params.id
        const result = await projectService.getProjectById(parseInt(id))

        return responseHTTP.ok(res, null, result)
    } catch (error) {
        return responseHTTP.internalError(res, error.message, error.statusCode)
    }
}

async function getProjects(req, res) {
    try {
        const result = await projectService.getProjects()

        return responseHTTP.ok(res, null, result)
    } catch (error) {
        return responseHTTP.internalError(res, error.message, error.statusCode)
    }
}

async function deleteProjectById(req, res) {
    try {
        const id = req.params.id
        const result = await projectService.deleteProjectById(parseInt(id))

        return responseHTTP.noContent(res, "Projeto excluído com sucesso!")
    } catch (error) {
        return responseHTTP.internalError(res, error.message, error.statusCode)
    }
}

async function toggleActiveProject(req, res) {
    try {
        const id = req.params.id
        const result = await projectService.toggleActiveProject(parseInt(id))

        return responseHTTP.ok(res, null, result)
    } catch (error) {
        return responseHTTP.internalError(res, error.message, error.statusCode)
    }
}

async function getActiveProjects(req, res) {
    try {
        const result = await projectService.getActiveProjects()

        return responseHTTP.ok(res, null, result)
    } catch (error) {
        return responseHTTP.internalError(res, error.message, error.statusCode)
    }
}

async function addTechnologyToProject(req, res) {
    try {
        const id = req.params.id
        const technologyId = req.body.tecnologia_id
        const result = await projectService.addTechnologyToProject(parseInt(id), parseInt(technologyId))

        return responseHTTP.ok(res, "Tecnologia adicionada ao projeto com sucesso!", result)
    } catch (error) {
        return responseHTTP.internalError(res, error.message, error.statusCode)
    }
}

async function removeTechnologyFromProject(req, res) {
    try {
        const id = req.params.id
        const technologyId = req.body.tecnologia_id
        const result = await projectService.removeTechnologyFromProject(parseInt(id), parseInt(technologyId))

        return responseHTTP.ok(res, "Tecnologia removida do projeto com sucesso!", result)
    } catch (error) {
        return responseHTTP.internalError(res, error.message, error.statusCode)
    }
}

async function addCategoryToProject(req, res) {
    try {
        const id = req.params.id
        const categoryId = req.body.categoria_id
        const result = await projectService.addCategoryToProject(parseInt(id), parseInt(categoryId))

        return responseHTTP.ok(res, "Categoria adicionada ao projeto com sucesso!", result)
    } catch (error) {
        return responseHTTP.internalError(res, error.message, error.statusCode)
    }
}

async function removeCategoryFromProject(req, res) {
    try {
        const id = req.params.id
        const categoryId = req.body.categoria_id
        const result = await projectService.removeCategoryFromProject(parseInt(id), parseInt(categoryId))

        return responseHTTP.ok(res, "Categoria removida do projeto com sucesso!", result)
    } catch (error) {
        return responseHTTP.internalError(res, error.message, error.statusCode)
    }
}

export default { createProject, updateProjectById, getProjectById, getProjects, deleteProjectById, toggleActiveProject, getActiveProjects, addTechnologyToProject, removeTechnologyFromProject, addCategoryToProject, removeCategoryFromProject }