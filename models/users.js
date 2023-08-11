const sequelize = require('../database/connect')
const Sequelize = require('sequelize')

const users = sequelize.define('users', {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING(80),
        allowNull: false,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    phone_number: {
        type: Sequelize.STRING(80),
        allowNull: false,
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    status:{
        type: Sequelize.STRING,
        dafaultValue: 'pending',
    },
    role:{
        type: Sequelize.STRING(50),
        allowNull: false,
    }

})

module.exports = users
