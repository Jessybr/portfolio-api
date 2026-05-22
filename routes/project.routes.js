import express from 'express'
import projectController from '../controllers/projectController.js'
import { authMiddleware } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.post('/project', authMiddleware, projectController.createProject)
router.patch('/project/:id', authMiddleware, projectController.updateProjectById)

export default router