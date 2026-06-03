import { HttpError } from './error/httpError.js'

function checkParamsNeeded(body) {
    const paramsNeeded = ['nome', 'descricao']

    for (const param of paramsNeeded) {
        if (!body[param]) {
            throw new HttpError("O nome e a descrição são obrigatórios", 422)
        }
    }
}

function checkParamsInexist(body) {
    const paramsAll = ['nome', 'descricao', 'videoSrc', 'imagemSrc', 'deployUrl', 'githubUrl']

    for(const param in body) {
        if(!paramsAll.includes(param)) {
            throw new HttpError(`O parâmetro ${param} não é permitido`, 422)
        }
    }
}

export default { checkParamsNeeded, checkParamsInexist }