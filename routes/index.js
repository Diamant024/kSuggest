const express = require('express'),
    router = express.Router(),
    permissions = require('@root/configs/roles.json');

const jwt = require('jsonwebtoken');

router.use(async (req, res, next) => {

    let token = req.cookies['session'],
        userData = decodeToken(token);

    if (!userData) {
        res.clearCookie("session");
        return res.status(401).send({ message: 'You are not authenticated' })
    }

    userData.permissions = permissions[userData.role] || [];

    req.userData = userData;

    next();
});


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

function decodeToken(token) {
    const secret = 'secret';

    try {
        return jwt.verify(token, secret);
    } catch (e) {
        console.log(e)
        return null;
    }
}

//function

module.exports = router;
