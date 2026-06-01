import express from 'express'
import projectController from '../controllers/projectController.js'
import { authMiddleware } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.get('/project', authMiddleware, projectController.getProjects)
router.get('/project/active', authMiddleware, projectController.getActiveProjects)
router.post('/project', authMiddleware, projectController.createProject)
router.get('/project/:id', authMiddleware, projectController.getProjectById)
router.patch('/project/:id', authMiddleware, projectController.updateProjectById)
router.patch('/project/active/:id', authMiddleware, projectController.toggleActiveProject)
router.delete('/project/:id', authMiddleware, projectController.deleteProjectById)
router.patch('/project/:id/technology', authMiddleware, projectController.addTechnologyToProject)
router.delete('/project/:id/technology', authMiddleware, projectController.removeTechnologyFromProject)
router.patch('/project/:id/category', authMiddleware, projectController.addCategoryToProject)
router.delete('/project/:id/category', authMiddleware, projectController.removeCategoryFromProject)

export default router