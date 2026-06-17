import express from 'express'
import categoryController from '../controllers/categoryController.js'
import { authMiddleware } from '../middlewares/authMiddlewares.js'

const router = express.Router()

/**
 * @openapi
 * /category:
 *   get:
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     summary: Get all categories
 *     responses:
 *       '200':
 *         description: OK
 *       '401':
 *         description: Unauthorized
 *   post:
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
router.get('/category', authMiddleware, categoryController.getCategories)
router.post('/category', authMiddleware, categoryController.createCategory)

/**
 * @openapi
 * /category/{id}:
 *   get:
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     summary: Get a category by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Category not found
 *   delete:
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a category by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Deleted
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Category not found
 */
router.get('/category/:id', authMiddleware, categoryController.getCategoryById)
router.delete('/category/:id', authMiddleware, categoryController.deleteCategory)

export default router