const mongoose = require('mongoose'),
    UserModel = mongoose.model('User');

const jwt = require('jsonwebtoken');

const permissions = require('@root/configs/roles.json');
const secret = 'secret';

function UserControl() {

    /**
     * Get user's data by token
     * @param token: String
     */
    this.getData = function (token) {
        let userData = decodeToken(token);

        if (!userData)
            return null;

        userData.permissions = permissions[userData.role] || [];

        return userData;
    };

    /**
     * Get token of data by username
     * @param username
     * @param role
     */
    this.getToken = async function (username, role) {
        let user = await UserModel.findOne({ username }).exec();

        if (!user)
            throw { message: 'User not found' };

        let data = {
            username,
            role,
            id: user._id.toString()
        };

        return jwt.sign(data, secret, { expiresIn: "24h" });
    }
}

function decodeToken(token) {
    const secret = 'secret';

    try {
        return jwt.verify(token, secret);
    } catch (e) {
        console.log(e);
        return null;
    }
}

module.exports = new UserControl;