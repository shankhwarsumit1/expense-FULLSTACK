const express = require('express');
const expenseController = require('../controllers/expenseController')
const router = express.Router();

router.post('/',expenseController.addExpense);
router.get('/',expenseController.getAllExpenses);
router.delete('/:id',expenseController.deleteExpense);
router.put('/:id',expenseController.editExpense);

module.exports= router;