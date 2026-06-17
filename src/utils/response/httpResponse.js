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

function internalError(res, message = null, statusCode = 500) {
    const safeMessage = statusCode >= 500 ? "Erro interno no servidor" : message

    return res.status(statusCode).json({
        status: statusCode,
        success: false,
        message: safeMessage
    })
}

export default { created, noContent, ok, internalError }