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
    const category = await prisma.category.findUnique({
        where: { id }
    })

    if(!category) {
        throw new HttpError(`Categoria com o id: ${id} não encontrada`, 404)
    }

    await prisma.category.delete({
        where: { id }
    })
}

export default { getCategories, getCategoryById, createCategory, deleteCategory }