import express from 'express'
import categoryController from '../controllers/categoryController.js'
import { authMiddleware } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.get('/category', authMiddleware, categoryController.getCategories)
router.get('/category/:id', authMiddleware, categoryController.getCategoryById)
router.post('/category', authMiddleware, categoryController.createCategory)

export default router