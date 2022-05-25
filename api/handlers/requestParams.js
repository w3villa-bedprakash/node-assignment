const errorMessages = require('../config/errorMessages.json');
const requestParamsHandler = {};
const _ = require("lodash");
/**
 * 
 * @param {Array} actual list incoming params
 * @param {Array} target list of required params
 * @returns {Promise} status may be reject of resolve
 */
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