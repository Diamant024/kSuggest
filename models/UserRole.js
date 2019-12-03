const mongoose = require('mongoose');

const UserRoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

mongoose.model('UserRole', UserRoleSchema);