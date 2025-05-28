const expenseModel = require('../models/expenses');

const addExpense = async (req, res) => {
    try {
        const addedExpense = await expenseModel.create({
            ...req.body
        });
        res.status(201).json(addedExpense);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

const getAllExpenses = async (req, res) => {
    try {
        const allExpenses = await expenseModel.findAll();
        console.log(allExpenses);
        res.status(200).send(allExpenses);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            'error': err
        });
    }
}

const deleteExpense = async (req, res) => {
    try {
        const deletedExpense = await expenseModel.destroy({
            where: {
                id: req.params.id
            }
        })
        if (deleteExpense === 0) {
            res.status(404).send('not found');
            return;
        }
        res.status(200).json(deleteExpense);
    } catch (error) {
        console.log(err);
        res.status(500).json({
            'error': err
        });
    }
}

const editExpense = async (req, res) => {
    try {
        const {
            amount,
            description,
            category
        } = req.body;
        const [editExp] = await expenseModel.update({
            amount: amount,
            description: description,
            category: category
        }, {
            where: {
                id: req.params.id
            }
        })
        if (editExp===0) {
           return res.status(404).send('not found');
        }
        console.log(editExp);
        const updatedExp = await expenseModel.findByPk(req.params.id);
        res.status(200).send(updatedExp);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

module.exports = {
    addExpense,
    getAllExpenses,
    deleteExpense,
    editExpense
};