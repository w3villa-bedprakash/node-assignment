const appConstants = require('./appConstants.json');
exports.actionCompleteResponse = (res, req, msg, data, status = appConstants.DEFAULT_SUCCESS_STATUS) => {
    const response = {
        message: msg || appConstants.SUCCESS,
        success: appConstants.ACTION_COMPLETE,
        data: data || {},
    };
    console.log(`status: ${status}, method: ${req.method}, url: ${req.url}\n${JSON.stringify(response)}\n\n`);
    res.status(status).json(response);
};

exports.sendError = (res, req, err = appConstants.ERROR_IN_EXECUTION, data, status = appConstants.INTERNAL_SERVER_ERROR_STATUS_CODE) => {
    let errMsg = err.toString();
    errMsg = errMsg.replace(appConstants.ERROR, '');
    errMsg = errMsg.split('Error:').join('');
    errMsg = errMsg.trim();
    const response = {
        message: errMsg,
        success: appConstants.ERROR_IN_EXECUTION,
        data: data || {},
    };
    console.log(`status: ${status}, method: ${req.method}, url: ${req.url}\n${JSON.stringify(response)}\n\n`);
    res.status(status).json(response);
};