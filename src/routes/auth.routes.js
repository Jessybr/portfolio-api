import express from 'express'
import authController from '../controllers/authController.js'

const router = express.Router()

/**
 * @openapi
 * /login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful login, returns auth token and user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     token: 
 *                       type: string
 *       400:
 *         description: Bad request (validation error)
 *       401:
 *         description: Unauthorized (invalid credentials)
 */
router.post('/login', authController.login)

export default router