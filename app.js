import express from 'express'
import authRoutes from './routes/auth.routes.js'
import perfilRoutes from './routes/perfil.routes.js'

const app = express()
app.use(express.json())
app.use(authRoutes)
app.use(perfilRoutes)

export default app