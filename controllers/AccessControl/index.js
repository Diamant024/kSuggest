let rules = require('./rules');

module.exports = {

    getRules: function (permissions, action) {

        const defaultRule = {
            available: false,
            beforeExec: new Function,
            afterExec: new Function
        };

        let actionRules = permissions.reduce((accum, item) => {
            if (!rules[item])
                return accum;

            // Overwriting rules
            return Object.assign(accum, rules[item])
        }, {});

        let result = Object.assign(defaultRule, actionRules[action]);

        return result;
    }
};