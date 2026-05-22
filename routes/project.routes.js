import express from 'express'
import projectController from '../controllers/projectController.js'
import { authMiddleware } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.post('/project', authMiddleware, projectController.createProject)
router.patch('/project/:id', authMiddleware, projectController.updateProjectById)
router.get('/project/:id', authMiddleware, projectController.getProjectById)
router.get('/project', authMiddleware, projectController.getProjects)
router.delete('/project/:id', authMiddleware, projectController.deleteProjectById)
router.patch('/project/active/:id', authMiddleware, projectController.toggleActiveProject)

export default router