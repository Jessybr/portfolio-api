import perfilService from '../services/perfilService.js'

async function getPerfil(req, res) {
    try {
        const result = await perfilService.getPerfil()

        return res.json(result)
    } catch {
        return res.status(401).json({error: error.message})
    }
}

async function updatePerfil(req, res) {
    try {
        const data = req.body
        const result = await perfilService.updatePerfil(data)

        return res.json(result)
    } catch {
        return res.status(401).json({error: error.message})
    }
}

export default { getPerfil, updatePerfil }