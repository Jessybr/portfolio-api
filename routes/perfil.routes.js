import express from 'express'
import perfilController from '../controllers/perfilController.js'
import { authMiddleware } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.get('/perfil', authMiddleware, perfilController.getPerfil)
router.patch('/perfil', authMiddleware, perfilController.updatePerfil)

export default router