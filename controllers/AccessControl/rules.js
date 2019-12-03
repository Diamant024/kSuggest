const rules = {
    'readOnlyOwn': {
        'getList': {
            available: true,
            beforeExec: (query, options) => {
                query.find({ creator: options.userId })
            }
        }
    },
    'openDeclined': {
        'edit': {
            available: true,
            beforeExec: (query, options) => {
                console.log(query)
            }
        }
    },

    'readAll': {
        'getList': {
            available: true
        }
    },
    'updateAll': {
        'edit': {
            available: true
        }
    },
    'createSuggestion': {
        'create': {
            available: true
        }
    }
};

module.exports = rules;