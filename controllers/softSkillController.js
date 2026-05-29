import softSkillService from '../services/softSkillService.js'
import responseHTTP from '../utils/response/httpResponse.js'

async function createSoftSkill(req, res) {
    try {
        const data = req.body
        const result = await softSkillService.createSoftSkill(data)

        return responseHTTP.created(res, "Soft skill criada com sucesso!", result)
    } catch (error) {
        console.error(error) //retirar depois
        return responseHTTP.internalError(res, error.message, error.statusCode)
    }
}

async function getSoftSkills(req, res) {
    try {
        const result = await softSkillService.getSoftSkills()

        return responseHTTP.ok(res, null, result)
    } catch (error) {
        console.error(error) //retirar depois
        return responseHTTP.internalError(res, error.message, error.statusCode)
    }
}

async function getSoftSkillById(req, res) {
    try {
        const { id } = req.params
        const result = await softSkillService.getSoftSkillById(parseInt(id))

        return responseHTTP.ok(res, null, result)
    } catch (error) {
        console.error(error) //retirar depois
        return responseHTTP.internalError(res, error.message, error.statusCode)
    }
}

async function deleteSoftSkill(req, res) {
    try {
        const { id } = req.params
        await softSkillService.deleteSoftSkill(parseInt(id))

        return responseHTTP.noContent(res, "Soft skill deletada com sucesso!")
    } catch (error) {
        console.error(error) //retirar depois
        return responseHTTP.internalError(res, error.message, error.statusCode)
    }
}

export default { createSoftSkill, getSoftSkills, getSoftSkillById, deleteSoftSkill }