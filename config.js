const fs = require('fs');

let p = null;
let ENV_CURRENT = process.env.NODE_ENV;
let BASE_PATH = './configs/{env}.json';

let Config = {
    data: null,
    rev: 'n/a',
    init() {
        this.data = this._loadEnv(ENV_CURRENT);

        return this.data;
    },
    _loadEnv(env) {
        let configPath = process.env.CONFIG || BASE_PATH.replace('{env}', env);

        let file = fs.readFileSync(configPath, 'utf8');

        return JSON.parse(file);
    }
};
module.exports = Config;