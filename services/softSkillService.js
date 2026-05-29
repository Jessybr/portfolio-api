import prisma from "../lib/prisma.js"
import checkersParams from "../utils/paramsSoftSkillHelper.js"
import { HttpError } from "../utils/error/HttpError.js"

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

export default { createSoftSkill, getSoftSkills }