import { HttpError } from './error/httpError.js'

function checkBodyNeededToCreateTechnology(body) {
    const paramsNeeded = ['nome', 'iconeSrc']

    for (const param of paramsNeeded) {
        if (!body[param]) {
            throw new HttpError("O nome e o ícone são obrigatórios", 422)
        }
    }
}

function checkBodyInexistent(body) {
    const paramsAll = ['nome', 'iconeSrc']

    for (const param in body) {
        if (!paramsAll.includes(param)) {
            throw new HttpError(`O parâmetro ${param} não é permitido`, 422)
        }
    }
}

export default { checkBodyNeededToCreateTechnology, checkBodyInexistent }