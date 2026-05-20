import authService from '../services/authService.js'

async function login(req, res) {
    try{
        const { username, password } = req.body
        const result = await authService.login(username, password)

        return res.json(result)
    } catch (error) {
        return res.status(401).json({error: error.message})
    }
}

export default { login }

