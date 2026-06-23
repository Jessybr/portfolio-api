import express from 'express'
import perfilController from '../controllers/perfilController.js'
import { authMiddleware } from '../middlewares/authMiddlewares.js'

const router = express.Router()

/**
 * @openapi
 * /perfil:
 *   get:
 *     summary: Retrieve the authenticated user profile
 *     tags:
 *       - Perfil
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *   patch:
 *     summary: Update the authenticated user profile
 *     tags:
 *       - Perfil
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *             example:
 *               nombre: Juan Perez
 *               email: juan.perez2example.com
 *     responses:
 *       200:
 *         description: Perfil updated successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/perfil', perfilController.getPerfil)
router.patch('/perfil', authMiddleware, perfilController.updatePerfil)

export default router