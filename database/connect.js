const Sequelize = require('sequelize');

const connect = new Sequelize('e-voting', 'root', 'ifeoluwa', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connect