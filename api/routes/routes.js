const express = require('express');
const router = express.Router();
const rewardsController = require('../controllers/rewards.controller');
const usersController = require('../controllers/users.controller');
const transactionsController = require('../controllers/transactions.controller');

router
    .route('/calculate-rewards')
    .post(rewardsController.calculateRewards);

router
    .route('/users-list')
    .get(usersController.getUsers);

router
    .route('/transaction')
    .get(transactionsController.getTransactions);

router
    .route('/transaction')
    .post(transactionsController.createTransaction);

module.exports = router;