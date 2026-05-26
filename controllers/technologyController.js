import technologyService from '../services/technologyService.js';
import responseHttp from '../utils/response/httpResponse.js'

async function getTecnologies(req, res) {
    try {
        const technologies = await technologyService.getTecnologies()

        return responseHttp.ok(res, null, technologies)
    } catch(error) {
        return responseHttp.externalError(res, error.message, error.statusCode)
    }
}

async function getTecnologyById(req, res) {
    try {
        const id = req.params.id
        const technology = await technologyService.getTecnologyById(parseInt(id))

        return responseHttp.ok(res, null, technology)
    } catch(error) {
        return responseHttp.externalError(res, error.message, error.statusCode)
    }
}

async function getTechnologyByName(req, res) {
    try {
        const name = req.query.name
        const technology = await technologyService.getTechnologyByName(name)
        return responseHttp.ok(res, null, technology)
    } catch(error) {
        return responseHttp.externalError(res, error.message, error.statusCode)
    }
}

async function createTechnology(req, res) {
    try {
        const data = req.body
        const technology = await technologyService.createTechnology(data)

        return responseHttp.created(res, null, technology)
    } catch(error) {
        return responseHttp.externalError(res, error.message, error.statusCode)
    }
}

async function deleteTechnology(req, res) {
    try {
        const id = req.params.id
        const result = await technologyService.deleteTechnology(parseInt(id))

        return responseHttp.noContent(res, "Tecnologia deletada com sucesso")
    } catch(error) {
        return responseHttp.externalError(res, error.message, error.statusCode)
    }
}

export default { getTecnologies, getTecnologyById, getTechnologyByName, createTechnology, deleteTechnology }