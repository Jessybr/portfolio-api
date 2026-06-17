import express from 'express'
import technologyController from '../controllers/technologyController.js'
import { authMiddleware } from '../middlewares/authMiddlewares.js'

const router = express.Router()

/**
 * @openapi
 * /technology:
 *   get:
 *     tags:
 *       - Technology
 *     summary: Get all technologies
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of technologies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Technology'
 */
router.get('/technology', authMiddleware, technologyController.getTecnologies)

/**
 * @openapi
 * /technology/search:
 *   get:
 *     tags:
 *       - Technology
 *     summary: Search technologies by name
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query for technology name
 *     responses:
 *       200:
 *         description: Matching technologies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Technology'
 */
router.get('/technology/search', authMiddleware, technologyController.getTechnologyByName)

/**
 * @openapi
 * /technology:
 *   post:
 *     tags:
 *       - Technology
 *     summary: Create a new technology
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewTechnology'
 *     responses:
 *       201:
 *         description: Technology created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Technology'
 */
router.post('/technology', authMiddleware, technologyController.createTechnology)

/**
 * @openapi
 * /technology/{id}:
 *   get:
 *     tags:
 *       - Technology
 *     summary: Get a technology by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Technology object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Technology'
 *       404:
 *         description: Technology not found
 */
router.get('/technology/:id', authMiddleware, technologyController.getTecnologyById)

/**
 * @openapi
 * /technology/{id}:
 *   delete:
 *     tags:
 *       - Technology
 *     summary: Delete a technology by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Technology deleted successfully
 *       404:
 *         description: Technology not found
 */
router.delete('/technology/:id', authMiddleware, technologyController.deleteTechnology)

export default router