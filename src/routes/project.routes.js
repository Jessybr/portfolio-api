import express from 'express'
import projectController from '../controllers/projectController.js'
import { authMiddleware } from '../middlewares/authMiddlewares.js'

const router = express.Router()

/**
 * @openapi
 * /project:
 *   get:
 *     summary: Get all projects
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects returned successfully
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               link_github:
 *                 type: string
 *               link_demo:
 *                 type: string
 *               tecnologias:
 *                 type: array
 *                 items:
 *                   type: integer
 *               categorias:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Project created successfully
 *       422:
 *         description: Validation error
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 */
router.get('/project', projectController.getProjects)
router.post('/project', authMiddleware, projectController.createProject)

/**
 * @openapi
 * /project/active:
 *   get:
 *     summary: Get all active projects
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of active projects returned successfully
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 */
router.get('/project/active', projectController.getActiveProjects)

/**
 * @openapi
 * /project/active/{id}:
 *   patch:
 *     summary: Update the active status of a project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project active status updated successfully
 *       404:
 *         description: Project not found
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 */
router.patch('/project/active/:id', authMiddleware, projectController.toggleActiveProject)

/**
 * @openapi
 * /project/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project returned successfully
 *       404:
 *         description: Project not found
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update a project by ID
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               link_github:
 *                 type: string
 *               link_demo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       404:
 *         description: Project not found
 *       422:
 *         description: Validation error
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a project by ID
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 */
router.get('/project/:id', projectController.getProjectById)
router.patch('/project/:id', authMiddleware, projectController.updateProjectById)
router.delete('/project/:id', authMiddleware, projectController.deleteProjectById)

/**
 * @openapi
 * /project/{id}/technology:
 *   patch:
 *     summary: Add a technology to a project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tecnologia_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Technology added successfully
 *       404:
 *         description: Project or technology not found
 *       422:
 *         description: Validation error
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Remove a technology from a project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tecnologia_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Technology removed successfully
 *       404:
 *         description: Project or technology not found
 *       422:
 *         description: Validation error
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 */
router.patch('/project/:id/technology', authMiddleware, projectController.addTechnologyToProject)
router.delete('/project/:id/technology', authMiddleware, projectController.removeTechnologyFromProject)

/**
 * @openapi
 * /project/{id}/category:
 *   patch:
 *     summary: Add a category to a project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoria_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Category added successfully
 *       404:
 *         description: Project or category not found
 *       422:
 *         description: Validation error
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Remove a category from a project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoria_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Category removed successfully
 *       404:
 *         description: Project or category not found
 *       422:
 *         description: Validation error
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 */
router.patch('/project/:id/category', authMiddleware, projectController.addCategoryToProject)
router.delete('/project/:id/category', authMiddleware, projectController.removeCategoryFromProject)

export default router
