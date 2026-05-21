import projectService from '../services/projectService.js'

async function createProject(req, res) {
    try {
        const data = req.body
        const result = await projectService.createProject(data)

        return res.json(result)
    } catch (error) {
        return res.status(401).json({error: error.message})
    }
}

export default { createProject }