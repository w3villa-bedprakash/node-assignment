const responses = require('../config/responses');
const successMessages = require('../config/successMessages.json');
const errorMessages = require('../config/errorMessages.json');
const requestParamsHandler = require('../handlers/requestParams');
const requestParams = require('../config/requestParams.json');
const appConstants = require('../config/appConstants.json');
const mongoose = require('mongoose');
const Users = mongoose.model('users');
const Transactions = mongoose.model('transactions');
const moment = require('moment');
const _ = require('lodash')

/**
 * @description Months wise total spend and rewards point of user.
 * @param {}
 * @returns {object} Total spent and rewards points of each months.
 */
module.exports.getTransactions = async function (req, res) {
    try {
        Users.aggregate([{
            $lookup: {
                from: "transactions",
                localField: "_id",
                foreignField: "user_id",
                as: "transactions"
            }
        }]).exec(function (err, data) {

            let tnxData = [];
            for (let i = 0; i < data.length; i++) {
                if (!tnxData[i]) {
                    tnxData[i] = {}
                }
                tnxData[i]['name'] = data[i].firstName || '-';
                tnxData[i]['email'] = data[i].email;

                for (let j = 0; j < data[i].transactions.length; j++) {
                    point = appConstants.SLAB.reduce((acc, curr) => { acc.rewardsPoint += ((acc.amount - curr) > 0 ? acc.amount - curr : 0); return acc; }, { amount: data[i].transactions[j].amount, rewardsPoint: 0 }).rewardsPoint;

                    let code = moment(data[i].transactions[j].createdAt).format('MMM') + '-' + moment(data[i].transactions[j].createdAt).format('YYYY');
                    if (tnxData[i][code]) {
                        tnxData[i][code]['totalAmount'] += data[i].transactions[j].amount;
                        tnxData[i][code]['rewardsPoint'] += point;
                    } else {
                        tnxData[i][code] = {}
                        tnxData[i][code]['totalAmount'] = data[i].transactions[j].amount;
                        tnxData[i][code]['rewardsPoint'] = point;
                    }
                }
            }
            return responses.actionCompleteResponse(res, req, successMessages.transactionFoundSuccessfully, tnxData);
        });

    } catch (err) {
        console.log("err: ", err)
        return responses.sendError(res, req, err);
    }
}

/**
 * @description All transaction of the system
 * @param {}
 * @returns {object} All transaction of the system
 */
module.exports.getAllTransactions = async function (req, res) {
    try {
        Users.aggregate([{
            $lookup: {
                from: "transactions",
                localField: "_id",
                foreignField: "user_id",
                as: "transactions"
            }
        }]).exec(function (err, data) {
            let tnxData = []
            let name = '';
            for (let i = 0; i < data.length; i++) {
                name = (data[i].firstName || '') + ((data[i].firstName && data[i].lastName) ? (' ' + data[i].lastName) : '');
                for (let j = 0; j < data[i].transactions.length; j++) {
                    tnxData.push({
                        Name: name,
                        Amount: data[i].transactions[j].amount,
                        date: data[i].transactions[j].createdAt

                    })

                }
            }
            return responses.actionCompleteResponse(res, req, successMessages.transactionFoundSuccessfully, tnxData);
        });

    } catch (err) {
        console.log("err: ", err)
        return responses.sendError(res, req, err);
    }
}

/**
 * @description Create new transaction
 * @param {number} amount
 * @param {id} user_id
 * @returns {object} execution status.
 */
module.exports.createTransaction = async function (req, res) {
    try {
        const paramKeys = Object.keys(req.body);
        await requestParamsHandler.validate(paramKeys, requestParams.createTransaction);
        const user = await Users.findOne({ _id: req.body.user_id }).lean();
        if (user) {
            const tnx = await Transactions.create(_.pick(req.body, ['amount', 'user_id']));
            if (tnx) {
                return responses.actionCompleteResponse(res, req, successMessages.transactionSuccessfullyCreated, tnx);
            } else {
                return responses.sendError(res, req, errorMessages.unableToCreateTransaction);
            }
        } else {
            return responses.sendError(res, req, errorMessages.userNotFound);
        }
    } catch (err) {
        console.log("err: ", err)
        return responses.sendError(res, req, err);
    }
}

