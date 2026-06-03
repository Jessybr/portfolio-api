import prisma from '../lib/prisma.js'
import { HttpError } from '../utils/error/httpError.js'

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

async function createCategory(data) {
    const { nome } = data

    const categoryAlreadyExists = await prisma.category.findFirst({
        where: { nome }
    })

    if(categoryAlreadyExists) {
        throw new HttpError(`Categoria com o nome: ${nome} já existe`, 409)
    }

    const newCategory = await prisma.category.create({
        data: {
            nome
        }
    })

    return { newCategory }
}

async function deleteCategory(id) {
    await checkCategoryExistsById(id)

    await prisma.category.delete({
        where: { id }
    })
}

async function ensureCategoriesExist(ids) {
    const categories = await prisma.category.findMany({
        where: {
            id: {
                in: ids
            }
        }
    })

    if (categories.length !== ids.length) {
        throw new HttpError("Uma ou mais categorias não existem", 422)
    }

    return categories
}

async function checkCategoryExistsById(id) {
    const category = await prisma.category.findUnique({
        where: { id }
    })

    if (!category) {
        throw new HttpError(`Categoria com o id: ${id} não encontrada`, 404)
    }
}

export default { getCategories, getCategoryById, createCategory, deleteCategory, ensureCategoriesExist }