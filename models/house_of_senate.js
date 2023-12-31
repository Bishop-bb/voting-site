const sequelize = require('../database/connect')
const Sequelize = require('sequelize')

const house_of_senate = sequelize.define('house_of_senate', {
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
    state:{
        type: Sequelize.STRING(80),
        allowNull: true,
    },
    zone:{
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


module.exports = house_of_senate