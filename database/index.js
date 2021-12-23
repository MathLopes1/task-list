const Sequelize = require('sequelize')
const config = require('config')

const instancia = new Sequelize(
    config.get('mysql.bando-de-dados'),
    config.get('mysql.usuario'),
    config.get('mysql.senha'),
    {
        host: config.get('mysql.host'),
        dialect: 'mysql'
    }

)