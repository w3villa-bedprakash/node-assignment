const responses = require('../config/responses');
const successMessages = require('../config/successMessages.json');
const mongoose = require('mongoose');
const Users = mongoose.model('users');

/**
 * @description Get all users of the system.
 * @param {}
 * @returns {object} list of all user.
 */
module.exports.getUsers = async function (req, res) {
    try {
        const users = await Users.find({}).lean();
        return responses.actionCompleteResponse(res, req, successMessages.userListFoundSuccessfully, users);
    } catch (err) {
        console.log("err: ", err)
        return responses.sendError(res, req, err);
    }
}
