const sequelize = require('../database/connect')
const Sequelize = require('sequelize')

const house_of_rep = sequelize.define('house_of_rep', {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
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
    state:{
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
   

})


module.exports = house_of_rep