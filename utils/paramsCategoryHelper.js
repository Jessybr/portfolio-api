import { HttpError } from './error/httpError.js'

function checkBodyNeededToCreateCategory(body) {
    const paramsNeeded = ['nome']

    for (const param of paramsNeeded) {
        if (!body[param]) {
            throw new HttpError("O nome é obrigatório", 422)
        }
    }
}

function checkBodyInexistent(body) {
    const paramsAll = ['nome']

    for (const param in body) {
        if (!paramsAll.includes(param)) {
            throw new HttpError(`O parâmetro ${param} não é permitido`, 422)
        }
    }
}

export default { checkBodyNeededToCreateCategory, checkBodyInexistent }