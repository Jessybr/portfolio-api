import express from 'express'
import softSkillController from '../controllers/softSkillController.js'
import { authMiddleware } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.post('/softSkill', authMiddleware, softSkillController.createSoftSkill)
router.get('/softSkills', authMiddleware, softSkillController.getSoftSkills)
router.get('/softSkill/:id', authMiddleware, softSkillController.getSoftSkillById)

export default router