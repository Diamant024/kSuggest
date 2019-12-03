const express = require('express'),
    router = express.Router();

const mongoose = require('mongoose'),
    UserModel = mongoose.model('User');

const jwt = require('jsonwebtoken');

const secret = 'secret';


router.get('/', async function(req, res, next) {

    let user = await UserModel.findOne({ username: req.query.username }).exec();

    if (!user)
        return res.status(400).send({ message: 'User not found' });

    let data = {
        username: req.query.username || 'admin',
        role: req.query.role,
        id: user._id.toString()
    };

    const token = jwt.sign(data, secret, { expiresIn: "24h" });

    res.cookie('session', token);

    res.send({ message: 'Cookie setted', data });
});

module.exports = router;
