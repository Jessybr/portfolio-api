import uploadService from '../services/uploadService.js'
import responseHTTP from '../utils/response/httpResponse.js'

async function uploadFile(req, res) {
    try {
        if (!req.file) {
            return responseHTTP.internalError(res, 'Nenhum arquivo enviado', 422)
        }

        const result = await uploadService.uploadFile(req.file)

        return responseHTTP.created(res, 'Arquivo enviado com sucesso!', result)
    } catch (error) {
        return responseHTTP.internalError(res, error.message, error.statusCode)
    }
}

export default { uploadFile }