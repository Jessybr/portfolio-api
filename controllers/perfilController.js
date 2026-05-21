import perfilService from '../services/perfilService.js'

async function getPerfil(req, res) {
    try {
        const result = await perfilService.getPerfil()

        return res.json(result)
    } catch {
        return res.status(401).json({error: error.message})
    }
}

export default { getPerfil }