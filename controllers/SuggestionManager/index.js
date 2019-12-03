const AccessControl = require('@controllers/AccessControl');

let actions = require('./actions');

/**
 * Interface for Suggestion management
 * @param userData: { permissions: Array }
 * @constructor
 */
function SuggestionManager(userData) {

    for (let [key, value] of Object.entries(actions)) {
        this[key] = function () {
            let ac = AccessControl(userData.permissions, key);

            if (!ac.available)
                return Promise.reject({ message: 'Action is not available' });

            return value.apply(ac, arguments);
        }
    }
}

function init(userData) {
    return new SuggestionManager(userData);
}

module.exports = init;