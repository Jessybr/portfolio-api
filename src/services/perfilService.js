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
    const perfil = await prisma.perfil.findUnique({
        where: { id: 1 }
    })

    if(!perfil) {
        throw new Error('Perfil não encontrado')
    }

    if(data.imagem) {
        const image = await uploadService.uploadFile(data.imagem)
        await uploadService.deleteFile(perfil.imagemPublicId, 'image')
    }
    if(data.pdf) {
        const pdf = await uploadService.uploadFile(data.pdf)
        await uploadService.deleteFile(perfil.pdfPublicId, 'raw')
    }

    const perfilUpdated = await prisma.perfil.update({
        where: { id: 1 },
        data: {
            ...data,
            fotoSrc: data.imagem ? image.url : perfil.fotoSrc,
            imagemPublicId: data.imagem ? image.publicId : perfil.imagemPublicId,
            curriculoSrc: data.pdf ? pdf.url : perfil.curriculoSrc,
            curriculoPublicId: data.pdf ? pdf.publicId : perfil.curriculoPublicId
        }
    })

    return { perfil }
}

export default { getPerfil, updatePerfil }