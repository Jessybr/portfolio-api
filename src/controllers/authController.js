import authService from '../services/authService.js'
import responseHTTP from '../utils/response/httpResponse.js'

async function login(req, res) {
    try{
        const { username, password } = req.body
        const result = await authService.login(username, password)

        return responseHTTP.ok(res, null, result)
    } catch (error) {
        return responseHTTP.internalError(res, error.message, error.statusCode)
    }
}

export default { login }

