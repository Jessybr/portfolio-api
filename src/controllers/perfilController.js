import { response } from 'express'
import perfilService from '../services/perfilService.js'
import responseHTTP from '../utils/response/httpResponse.js'

async function getPerfil(req, res) {
    try {
        const result = await perfilService.getPerfil()

        return responseHTTP.ok(res, null, result)
    } catch (error) {
        return responseHTTP.error(res, error.message, error.statusCode)
    }
}

async function updatePerfil(req, res) {
    try {
        const data = req.body
        const result = await perfilService.updatePerfil(data)

        return responseHTTP.ok(res, "Perfil atualizado com sucesso!", result)
    } catch (error) {
        return responseHTTP.error(res, error.message, error.statusCode)
    }
}

export default { getPerfil, updatePerfil }