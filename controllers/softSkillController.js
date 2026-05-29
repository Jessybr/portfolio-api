import softSkillService from '../services/softSkillService.js'
import responseHTTP from '../utils/response/httpResponse.js'

async function createSoftSkill(req, res) {
    try {
        const data = req.body
        const result = await softSkillService.createSoftSkill(data)

        return responseHTTP.created(res, "Soft skill criada com sucesso!", result)
    } catch (error) {
        console.error(error) //retirar depois
        return responseHTTP.externalError(res, error.message, error.statusCode)
    }
}

export default { createSoftSkill }