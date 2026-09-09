import prisma from '../lib/prisma.js'
import uploadService from './uploadService.js'

async function getPerfil() {
    const perfil = await prisma.perfil.findUnique({
        where: { id: 1 }
    })

    if(!perfil) {
        throw new Error('Perfil não encontrado')
    }

    return { perfil }
}

async function updatePerfil(data) {
    const { imagem, pdf: pdfFile, ...perfilData } = data

    const perfil = await prisma.perfil.findUnique({
        where: { id: 1 }
    })

    if(!perfil) {
        throw new Error('Perfil não encontrado')
    }

    let image, pdf
    if(imagem) {
        image = await uploadService.uploadFile(imagem)
        if(perfil.fotoPublicId) {
            await uploadService.deleteFile(perfil.fotoPublicId, 'image')
        }
    }
    if(pdfFile) {
        pdf = await uploadService.uploadFile(pdfFile)
        if(perfil.curriculoPublicId) {
            await uploadService.deleteFile(perfil.curriculoPublicId, 'raw')
        }
    }

    const perfilUpdated = await prisma.perfil.update({
        where: { id: 1 },
        data: {
            ...perfilData,
            fotoSrc: image ? image.url : perfil.fotoSrc,
            fotoPublicId: image ? image.publicId : perfil.fotoPublicId,
            curriculoSrc: pdf ? pdf.url : perfil.curriculoSrc,
            curriculoPublicId: pdf ? pdf.publicId : perfil.curriculoPublicId
        }
    })

    return { perfil: perfilUpdated }
}

export default { getPerfil, updatePerfil }