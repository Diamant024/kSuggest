module.exports = {
    'readOwnOnly': {
        'getList': {
            available: true,
            beforeExec: (options, query) => {
                query.find({ creator: options.userId })
            }
        }
    },
    'setOwnDeclinedToChecking': {
        'edit': {
            available: true,
            beforeExec: (options, query) => {
                console.log(query)
            }
        }
    },

    'read': {
        'getList': {
            available: true
        }
    },
    'update': {
        'edit': {
            available: true
        }
    },
    'create': {
        'create': {
            available: true
        }
    }
};