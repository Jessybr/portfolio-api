import categoryService from '../services/categoryService.js'
import responseHTTP from '../utils/response/httpResponse.js'

async function getCategories(req, res) {
    try{
        const categories = await categoryService.getCategories()

        return responseHTTP.ok(res, null, categories)
    } catch (error) {
        return responseHTTP.externalError(res, error.message, error.statusCode)
    }
}

