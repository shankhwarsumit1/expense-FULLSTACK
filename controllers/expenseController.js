const expenseModel = require('../models/expenses');

const addExpense = async(req,res)=>{
    try{
        const addedExpense = await expenseModel.create({...req.body});
        res.status(201).json(addedExpense);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
}

const getAllExpenses = async(req,res)=>{
    try{
        const allExpenses = await expenseModel.findAll();
        console.log(allExpenses);
        res.status(200).send(allExpenses);
    }
    catch(err){
        console.log(err);
        res.status(500).json({'error':err});
    }
}

const deleteExpense= async(req,res)=>{
   try{
        const deletedExpense = await expenseModel.destroy({
            where:{id:req.params.id}
        })
        if(!deleteExpense){
            res.status(404).send('not found');
            return;
        }
        res.status(200).json(deleteExpense);
   }
   catch(error){
     console.log(err);
     res.status(500).json({'error':err});
   }
}

module.exports={addExpense,getAllExpenses,deleteExpense};