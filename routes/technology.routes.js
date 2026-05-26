import express from 'express'
import technologyController from '../controllers/technologyController.js'
import { authMiddleware } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.get('/technology', authMiddleware, technologyController.getTecnologies)
router.get('/technology/:id', authMiddleware, technologyController.getTecnologyById)
router.post('/technology', authMiddleware, technologyController.createTechnology)

export default router