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

async function updateProjectById(req, res) {
    try {
        const id = req.params.id
        const data = req.body
        const result = await projectService.updateProjectById(parseInt(id), data)

        return res.json(result)
    } catch (error) {
        return res.status(401).json({error: error.message})
    }
}

async function getProjectById(req, res) {
    try {
        const id = req.params.id
        const result = await projectService.getProjectById(parseInt(id))

        return res.json(result)
    } catch (error) {
        return res.status(401).json({error: error.message})
    }
}

async function getProjects(req, res) {
    try {
        const result = await projectService.getProjects()

        return res.json(result)
    } catch (error) {
        return res.status(401).json({error: error.message})
    }
}

async function deleteProjectById(req, res) {
    try {
        const id = req.params.id
        const result = await projectService.deleteProjectById(parseInt(id))

        return res.json(result)
    } catch (error) {
        return res.status(401).json({error: error.message})
    }
}

export default { createProject, updateProjectById, getProjectById, getProjects, deleteProjectById }