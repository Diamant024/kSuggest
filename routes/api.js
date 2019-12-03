const express = require('express'),
    router = express.Router();

const SuggestionManager = require('@controllers/SuggestionManager');

router.get('/list', function(req, res, next) {

    let definition = {
        userId: req.userData.id
    };

    SuggestionManager(req.userData).getList(definition).then(list => {
        res.send(list);
    }).catch((err) => {
        res.status(400).send({ error: err.message });
    })
});

router.get('/create', function(req, res, next) {

    let definition = {
        name: 'Test',
        description: 'test',
        creatorId: req.userData.id
    };

    SuggestionManager(req.userData).create(definition).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(400).send({ error: err.message });
    })
});

router.get('/edit', function(req, res, next) {

    let definition = {
        id: req.query.id,
        name: req.query.name || 'Default'
    };

    SuggestionManager(req.userData).edit(definition).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(400).send({ error: err.message });
    })
});

module.exports = router;
