const sequelize = require('../utils/db-connect');
const {DataTypes}= require('sequelize');

const expenseModel = sequelize.define('Expense',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    amount:{
          type:DataTypes.INTEGER,
          allowNull:false
    },
    description:{
        type:DataTypes.STRING
    },
    category:{
        type:DataTypes.STRING
    }
})

module.exports = expenseModel