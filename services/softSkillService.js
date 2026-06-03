import prisma from "../lib/prisma.js"
import checkersParams from "../utils/paramsSoftSkillHelper.js"
import { HttpError } from "../utils/error/httpError.js"

async function createSoftSkill(data) {
    checkersParams.checkBodyNeededToCreateSoftSkill(data)
    checkersParams.checkBodyInexistent(data)

    const { nome, iconeSrc } = data

    const softSkillAlreadyExists = await prisma.softSkill.findFirst({
        where: {
            nome: nome
        }
    })

    if(softSkillAlreadyExists) {
        throw new HttpError("Soft skill already exists", 409)
    }

    const softSkill = await prisma.softSkill.create({
        data
    })

    return { softSkill }
}

async function getSoftSkills() {
    const softSkills = await prisma.softSkill.findMany()

    return { softSkills }
}

async function getSoftSkillById(id) {
    const softSkill = await prisma.softSkill.findUnique({
        where: {
            id: id
        }
    })

    if(!softSkill) {
        throw new HttpError(`Soft skill com o id: ${id} não encontrada`, 404)
    }

    return { softSkill }
}

async function deleteSoftSkill(id) {
    await checkSoftSkillExistsById(id)

    await prisma.softSkill.delete({
        where: {
            id: id
        }
    })
}

async function checkSoftSkillExistsById(id) {
    const softSkill = await prisma.softSkill.findUnique({
         where: {
             id: id
         }
    })

    if(!softSkill) {
        throw new HttpError(`Soft skill com o id: ${id} não encontrada`, 404)
    }
}

export default { createSoftSkill, getSoftSkills, getSoftSkillById, deleteSoftSkill }