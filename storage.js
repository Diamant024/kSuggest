const mongoose = require('mongoose');

const Config = require('@root/config').data['mongo_config'];

function StorageConnector(config) {
    let mongoConfig = {
        autoReconnect: true,
        //numberOfRetries: 1,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    };

    if (Config['login'] && Config['password']) {
        mongoConfig.user = Config['login'];
        mongoConfig.pass = Config['password'];
        mongoConfig.auth = {
            authdb: Config['db']
        }
    }

    mongoose.Promise = Promise;

    let connect = mongoose.connect(Config['address'], mongoConfig);
    mongoose.connection.on('error', catchError);

    return connect;
}

function catchError(err) {
    throw err;
}

let connect = new StorageConnector(Config);

require('@models/Suggestion');
require('@models/SuggestionStatus');
require('@models/UserRole');
require('@models/User');

module.exports = connect;