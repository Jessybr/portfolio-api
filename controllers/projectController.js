import projectService from '../services/projectService.js'
import responseHTTP from '../utils/response/httpResponse.js'

async function createProject(req, res) {
    try {
        const data = req.body
        const result = await projectService.createProject(data)

        return responseHTTP.created(res, "Projeto criado com sucesso!", result)
    } catch (error) {
        return responseHTTP.externalError(res, error.message)
    }
}

async function updateProjectById(req, res) {
    try {
        const id = req.params.id
        const data = req.body
        const result = await projectService.updateProjectById(parseInt(id), data)

        return responseHTTP.ok(res, "Projeto atualizado com sucesso!", result)
    } catch (error) {
        return responseHTTP.externalError(res, error.message)
    }
}

async function getProjectById(req, res) {
    try {
        const id = req.params.id
        const result = await projectService.getProjectById(parseInt(id))

        return responseHTTP.ok(res, null, result)
    } catch (error) {
        return responseHTTP.externalError(res, error.message)
    }
}

async function getProjects(req, res) {
    try {
        const result = await projectService.getProjects()

        return responseHTTP.ok(res, null, result)
    } catch (error) {
        return responseHTTP.externalError(res, error.message)
    }
}

async function deleteProjectById(req, res) {
    try {
        const id = req.params.id
        const result = await projectService.deleteProjectById(parseInt(id))

        return responseHTTP.noContent(res, "Projeto excluído com sucesso!")
    } catch (error) {
        return responseHTTP.externalError(res, error.message)
    }
}

async function toggleActiveProject(req, res) {
    try {
        const id = req.params.id
        const result = await projectService.toggleActiveProject(parseInt(id))

        return responseHTTP.ok(res, null, result)
    } catch (error) {
        return responseHTTP.externalError(res, error.message)
    }
}

export default { createProject, updateProjectById, getProjectById, getProjects, deleteProjectById, toggleActiveProject }