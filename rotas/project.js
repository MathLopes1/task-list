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
        const resultado = await TabelaProject.inserir({
            title: this.title,
            description: this.description,
            task: this.task
        })

        this.id = resultado.id
        this.createdAt = resultado.createdAt
        this.updatedAt = resultado.updatedAt
    }

}

module.exports = Project        