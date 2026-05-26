function created(res, message = null, data = null) {
    return res.status(201).json({
        status: 201,
        success: true,
        message,
        data
    })
}

function noContent(res, message = null) {
    return res.status(204).json({
        status: 204,
        success: true,
        message
    })
}

function ok(res, message = null, data = null) {
    return res.status(200).json({
        status: 200,
        success: true,
        message,
        data
    })
}

function externalError(res, message = null, statusCode = 500) {
    return res.status(statusCode).json({
        status: statusCode,
        success: false,
        message
    })
}

export default { created, noContent, ok, externalError }