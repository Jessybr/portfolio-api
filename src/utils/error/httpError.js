export class HttpError extends Error {
    constructor(message = "Erro interno no servidor", statusCode = 500) {
        super(message)
        this.statusCode = statusCode
    }
}