const errorMessages = require('../config/errorMessages.json');
const requestParamsHandler = {};
const _ = require("lodash");

requestParamsHandler.validate = (actual, target) => new Promise(((resolve, reject) => {
    if (!target) {
        return reject("No params required");
    }
    if (target.every((element) => actual.includes(element))) {
        return resolve();
    }
    console.log('validateNew: Missing params: ', _.difference(target, actual));
    return reject(errorMessages.missingParams);
}));

module.exports = requestParamsHandler;