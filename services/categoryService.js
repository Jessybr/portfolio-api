import prisma from '../lib/prisma.js'
import { HttpError } from '../utils/error/HttpError.js'

async function getCategories() {
    const categories = await prisma.category.findMany()

    return { categories }
}

async function getCategoryById(id) {
    const category = await prisma.category.findUnique({
        where: { id }
    })

    if(!category) {
        throw new HttpError(`Categoria com o id: ${id} não encontrada`, 404)
    }

    return { category }
}

