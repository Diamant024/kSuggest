const express = require('express'),
    router = express.Router();

const UserControl = require('@controllers/UserControl');

router.get('/', function(req, res, next) {

    let username = req.query.username || 'diamant',
        role = req.query.role || 'initiator';

    UserControl.getToken(username, role).then((token) => {

        res.cookie('session', token);
        res.send({ message: 'Cookie setted' });

    }).catch((err) => {
        return res.status(400).send({ message: err.message });
    });
});

module.exports = router;
