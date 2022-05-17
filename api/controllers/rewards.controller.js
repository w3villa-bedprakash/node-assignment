const responses = require('../config/responses');
const successMessages = require('../config/successMessages.json');
const errorMessages = require('../config/errorMessages.json');
const requestParamsHandler = require('../handlers/requestParams');
const requestParams = require('../config/requestParams.json');
const appConstants = require('../config/appConstants.json');
module.exports.calculateRewards = async function (req, res) {
    const paramKeys = Object.keys(req.body);
    try {
        await requestParamsHandler.validate(paramKeys, requestParams.calculateRewards);
        if (req.body.amount <= 0) {
            throw new Error(errorMessages.invalidAmount);
        }
        const data = appConstants.SLAB.reduce((acc, curr) => { acc.rewardsPoint += ((acc.amount - curr) > 0 ? acc.amount - curr : 0); return acc; }, { amount: req.body.amount, rewardsPoint: 0 })
        return responses.actionCompleteResponse(res, req, successMessages.rewardsCalculatedSuccessfully, data);
    } catch (err) {
        console.log("err: ", err)
        return responses.sendError(res, req, err);
    }
}
