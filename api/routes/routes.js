const express = require('express');
const router = express.Router();
const rewardsController = require('../controllers/rewards.controller');

router
    .route('/calculate-rewards')
    .post(rewardsController.calculateRewards);
module.exports = router;