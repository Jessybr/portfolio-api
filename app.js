import express from 'express'
import authRoutes from './routes/auth.routes.js'
import perfilRoutes from './routes/perfil.routes.js'
import projectRoutes from './routes/project.routes.js'

const app = express()
app.use(express.json())
app.use(authRoutes)
app.use(perfilRoutes)
app.use(projectRoutes)

export default app