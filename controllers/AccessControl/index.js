let rules = require('./rules');

function AccessControl(permissions, action) {

    let actionRules = permissions.reduce((accum, item) => {
        let rule = rules[item] && rules[item][action];

        rule && accum.push(rule);

        return accum
    }, []);

    let actionAvailable = !actionRules.some(item => item.available === false);

    return {
        available: actionAvailable,

        beforeExec: () => {
            for (let rule of actionRules) {
                if (typeof rule.beforeExec === 'function')
                    rule.beforeExec();
            }
        },

        afterExec: () => {
            for (let rule of actionRules) {
                if (typeof rule.afterExec === 'function')
                    rule.afterExec();
            }
        }
    };
}

module.exports = AccessControl;