const express = require('express');
const db = require('./utils/db-connect')
const expenseRouter = require('./routers/expenseRouter')
const cors = require('cors');
const { countReset } = require('console');
const app=express();
app.use(express.json());
app.use(cors());
app.use('/expense',expenseRouter);


db.sync({force:false}).then(()=>{
app.listen(3000,()=>{
console.log('expense tracker running on 3000');
})
}).catch((err)=>{
    console.log(err);
})

