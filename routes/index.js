const express = require('express'),
    router = express.Router(),
    UserControl = require('@controllers/UserControl');

router.use(async (req, res, next) => {

    let token = req.cookies['session'],
        userData = UserControl.getData(token);

    if (!userData) {
        res.clearCookie("session");
        return res.status(401).send({ message: 'You are not authenticated' })
    }

    req.userData = userData;

    next();
});

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
