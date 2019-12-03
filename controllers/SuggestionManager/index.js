const AccessControl = require('@controllers/AccessControl');

let actions = require('./actions');

function SuggestionManager(userData) {

    const self = this;

    for (let [key, value] of Object.entries(actions)) {
        /*if (self[key]) {
            console.warn(`Property ${key} already exist`);
            continue;
        }*/

        this[key] = function () {
            let rules = AccessControl.getRules(userData.permissions, key);

            if (!rules.available)
                return Promise.reject({ message: 'Action not available' });

            console.log(arguments[0])

            return value.apply(rules, arguments);
        }
    }
}

function init(userData) {
    return new SuggestionManager(userData);
}

module.exports = init;