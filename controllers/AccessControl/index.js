let rules = require('./rules');

const isNotAvailableError = { message: 'Action is not available' };

function AccessControl(permissions, action) {

    let actionRules = permissions.reduce((accum, item) => {
        let rule = rules[item] && rules[item][action];

        rule && accum.push(rule);

        return accum
    }, []);

    let actionAvailable = !actionRules.some(item => item.available === false);

    return {
        available: actionAvailable,
        availableNext: false,

        beforeExec() {
            for (let rule of actionRules) {
                this.callHook(rule.beforeExec, arguments);
            }

            if (!this.availableNext)
                throw isNotAvailableError
        },
        afterExec() {
            for (let rule of actionRules) {
                this.callHook(rule.afterExec, arguments);
            }
            if (!this.availableNext)
                throw isNotAvailableError
        },

        callHook(hook, args) {
            if (typeof hook === 'function')
                this.availableNext = this.availableNext || !!hook.apply(null, args);
        }
    };
}
module.exports = AccessControl;