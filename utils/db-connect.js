const {Sequelize}=require('sequelize');

const sequelize = new Sequelize('expensetracker','root','7355',{
    host:'localhost',
    dialect:'mysql'
});

( async()=>{
 try{
 await sequelize.authenticate();
 console.log('db is connected');}
 catch(err){
    console.log(err.message);
 }
})();
module.exports=sequelize;