const FullAccess = {
    available: true,
    beforeExec: () => true,
    afterExec: () => true
};

module.exports = {
    'readOwnOnly': {
        'getList': {
            beforeExec: (options, query) => {
                query.find({ creator: options.userId })

                return true;
            }
        }
    },
    'setOwnDeclinedToChecking': {
        'edit': {
            beforeExec: (options, query) => {
                if (options.status === 'checking') {
                    query._conditions = { _id: options.id, status: 'declined', creator: options.userId };
                    query._update = { status: options.status };

                    return true;
                }
            }
        }
    },

    'readAny': {
        'getList': FullAccess
    },
    'updateAny': {
        'edit': FullAccess
    },
    'createAny': {
        'create': FullAccess
    }
};