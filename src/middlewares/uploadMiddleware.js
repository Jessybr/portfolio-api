import multer from 'multer'

const storage = multer.memoryStorage()

const upload = multer({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/gif',
            'video/mp4',
            'video/webm',
            'video/quicktime',
            'application/pdf'
        ]

        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(new Error('Tipo de arquivo não permitido'))
        }

        cb(null, true)
    }
})

export default upload