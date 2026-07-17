import express from 'express'
import upload from '../middlewares/uploadMiddleware.js'
import uploadController from '../controllers/uploadController.js'
import { authMiddleware } from '../middlewares/authMiddlewares.js'

const router = express.Router()

/**
 * @openapi
 * /upload:
 *   post:
 *     summary: Upload a file
 *     tags:
 *       - Upload
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *       400:
 *         description: Bad request (validation error)
 *       401:
 *         description: Unauthorized (invalid credentials)
 *       422:
 *         description: Unprocessable Entity (no file sent)
 *       500:
 *         description: Internal server error
 */
router.post('/upload', authMiddleware, upload.single('file'), uploadController.uploadFile)

export default router