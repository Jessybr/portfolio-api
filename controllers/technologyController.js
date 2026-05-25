import technologyService from '../services/technologyService.js';

async function getTecnologies(req, res) {
    try {
        const technologies = await technologyService.getTecnologies()

        return res.json(technologies)
    } catch(error) {
        return res.status(401).json({error: error.message})
    }
}

async function getTecnologyById(req, res) {
    try {
        const id = req.params.id
        const technology = await technologyService.getTecnologyById(parseInt(id))

        return res.json(technology)
    } catch(error) {
        return res.status(401).json({error: error.message})
    }
}

export default { getTecnologies, getTecnologyById }