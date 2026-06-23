import express from 'express'
import softSkillController from '../controllers/softSkillController.js'
import { authMiddleware } from '../middlewares/authMiddlewares.js'

const router = express.Router()

/**
 * @openapi
 * /softSkill:
 *   post:
 *     summary: Create a new soft skill
 *     description: Create a new soft skill entry (requires authentication)
 *     tags:
 *       - Soft Skills
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Soft skill created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/softSkill', authMiddleware, softSkillController.createSoftSkill)

/**
 * @openapi
 * /softSkills:
 *   get:
 *     summary: Get all soft skills
 *     description: Retrieve all soft skills (requires authentication)
 *     tags:
 *       - Soft Skills
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of soft skills retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 */
router.get('/softSkills', softSkillController.getSoftSkills)

/**
 * @openapi
 * /softSkill/{id}:
 *   get:
 *     summary: Get soft skill by ID
 *     description: Retrieve a specific soft skill by its ID (requires authentication)
 *     tags:
 *       - Soft Skills
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The soft skill ID
 *     responses:
 *       200:
 *         description: Soft skill retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Soft skill not found
 *   delete:
 *     summary: Delete a soft skill
 *     description: Delete a specific soft skill by its ID (requires authentication)
 *     tags:
 *       - Soft Skills
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The soft skill ID
 *     responses:
 *       200:
 *         description: Soft skill deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Soft skill not found
 */
router.get('/softSkill/:id', softSkillController.getSoftSkillById)
router.delete('/softSkill/:id', authMiddleware, softSkillController.deleteSoftSkill)

export default router