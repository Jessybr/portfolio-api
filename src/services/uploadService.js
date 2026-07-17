import cloudinary from '../lib/cloudinary.js'

function getResourceType(mimetype) {
    if (mimetype === 'application/pdf') {
        return 'raw'
    }

    if (mimetype.startsWith('video/')) {
        return 'video'
    }

    return 'image'
}

async function uploadFile(file) {
    const resourceType = getResourceType(file.mimetype)

    const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: resourceType,
                folder: 'portfolio'
            },
            (error, result) => {
                if (error) {
                    return reject(error)
                }

                resolve(result)
            }
        )

        stream.end(file.buffer)
    })

    return {
        url: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type,
        format: result.format,
        bytes: result.bytes
    }
}

async function deleteFile(publicId, resourceType = 'image') {
    if (!publicId) {
        return null
    }

    return cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType
    })
}

export default { uploadFile, deleteFile }