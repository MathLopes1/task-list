const moment = require('moment')
const TabelaProject = require('./tabelaProject')

class Project {
    constructor({ id, title, description, task, createdAt, updatedAt }) {
        this.id = id
        this.title = title
        this.description = description
        this.task = task
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    async criar() {
        this.validar()
        const resultado = await TabelaProject.inserir({
            title: this.title,
            description: this.description,
            task: this.task
        })

        this.id = resultado.id
        this.createdAt = resultado.createdAt
        this.updatedAt = resultado.updatedAt
    }

    async carregar() {
        const encontrado = await TabelaProject.pegarPorId(this.id)
        this.title = encontrado.title
        this.description = encontrado.description
        this.task = encontrado.task
        this.createdAt = encontrado.createdAt
        this.updatedAt = encontrado.updatedAt
    }

    async atualizar() {
        await TabelaProject.pegarPorId(this.id)
        const campos = ['title', 'description', 'task']
        const dadosParaAtualizar = {}

        campos.forEach((campo) => {
            const valor = this[campo]
            if (typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            }
        })

        if (Object.keys(dadosParaAtualizar).length === 0) {
            throw new Error('Não foram fornecidos dados para atualizar')
        }
        await TabelaProject.atualizar(this.id, dadosParaAtualizar)
    }
    remover() {
        return TabelaProject.remover(this.id)
    }
    validar() {     
        const campos = ['title', 'description', 'task']

        campos.forEach(campo => {
            const valor = this[campo]

            if (typeof valor !== 'string' || valor.length === 0) {
                throw new Error(`O campo '${campo}' está inválido`)
            }
        })
    }
}


module.exports = Project        