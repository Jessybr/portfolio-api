import categoryService from '../services/categoryService.js'
import responseHTTP from '../utils/response/httpResponse.js'

async function getCategories(req, res) {
    try{
        const categories = await categoryService.getCategories()

        return responseHTTP.ok(res, null, categories)
    } catch (error) {
        return responseHTTP.internalError(res, error.message, error.statusCode)
    }
}

async function getCategoryById(req, res) {
    try {
        const id = req.params.id
        const category = await categoryService.getCategoryById(parseInt(id))

        return responseHTTP.ok(res, null, category)
    } catch (error) {
        return responseHTTP.internalError(res, error.message, error.statusCode)
    }
}

async function createCategory(req, res) {
    try {
        const data = req.body
        const newCategory = await categoryService.createCategory(data)

        return responseHTTP.created(res, "Categoria criada com sucesso!", newCategory)
    } catch (error) {
        return responseHTTP.internalError(res, error.message, error.statusCode)
    }
}

async function deleteCategory(req, res) {
    try {
        const id = req.params.id
        await categoryService.deleteCategory(parseInt(id))

        return responseHTTP.noContent(res, "Categoria deletada com sucesso!")
    } catch (error) {
        return responseHTTP.internalError(res, error.message, error.statusCode)
    }
}

export default { getCategories, getCategoryById, createCategory, deleteCategory }