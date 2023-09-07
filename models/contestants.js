const sequelize = require('../database/connect')
const Sequelize = require('sequelize')

const contestants = sequelize.define('contestants', {
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
    image:{
        type: Sequelize.STRING,
        allowNull: true
    },
    party: {
        type: Sequelize.STRING(80),
        allowNull: true,
    },
    stateofOrigin:{
        type: Sequelize.STRING(80),
        allowNull: true,
    },
    lga:{
        type: Sequelize.STRING(80),
        allowNull: true,
    },
    
    logo:{
        type: Sequelize.STRING,
        allowNull:true,
    },
    votes:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: true,
    },
    achievement:{
        type: Sequelize.TEXT,
        allowNull: true,
    }

})

module.exports = contestants