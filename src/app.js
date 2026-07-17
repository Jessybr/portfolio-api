import express from 'express'
import authRoutes from './routes/auth.routes.js'
import perfilRoutes from './routes/perfil.routes.js'
import projectRoutes from './routes/project.routes.js'
import technologyRoutes from './routes/technology.routes.js'
import categoryRoutes from './routes/category.routes.js'
import softSkillRoutes from './routes/softSkill.routes.js'
import uploadRoutes from './routes/upload.routes.js'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from '../docs/swagger.js'
import cors from "cors";


const app = express()
app.use(cors());
app.use(express.json())
app.use(authRoutes)
app.use(perfilRoutes)
app.use(projectRoutes)
app.use(technologyRoutes)
app.use(categoryRoutes)
app.use(softSkillRoutes)
app.use(uploadRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default app